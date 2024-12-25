import { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const UserInfoForm = () => {
  const { userId, isAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    weddingDate: "",
    story: "",
    brideBirthday: "",
    groomBirthday: "",
    feedback: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      alert("You must sign in to access this page.");
      navigate("/signin");
    } else {
      checkExistingForm();
    }
  }, [isAuthenticated, navigate]);

  // Check if the user already filled out the form
  // const response = await axios.get('http://localhost:3001/userinfoes');
  const checkExistingForm = async () => {
    try {
      const response = await axios.get('http://localhost:3001/userinfoes');
      const existingData = response.data.find((entry) => entry.userID === userId);
  
      if (existingData) {
        // Format date fields before setting form data
        setFormData({
          ...existingData,
          weddingDate: existingData.weddingDate ? existingData.weddingDate.split("T")[0] : "",
          brideBirthday: existingData.brideBirthday ? existingData.brideBirthday.split("T")[0] : "",
          groomBirthday: existingData.groomBirthday ? existingData.groomBirthday.split("T")[0] : "",
        });
        setIsUpdating(true);
        // alert("Form already exists. Ready to update.");
      }
    } catch (error) {
      console.error("Error checking existing form:", error);
    }
  };
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData, userID: userId };

      if (isUpdating) {
        await axios.put(`http://localhost:3001/userinfoes/${formData._id}`, payload);
        alert("Form updated successfully.");
      } else {
        await axios.post("http://localhost:3001/userinfoes", payload);
        alert("Form created successfully.");
      }
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{isUpdating ? "Update Your Information" : "Create Your Information"}</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Bride Name:</label>
          <input
            type="text"
            name="brideName"
            value={formData.brideName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Groom Name:</label>
          <input
            type="text"
            name="groomName"
            value={formData.groomName}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Wedding Date:</label>
          <input
            type="date"
            name="weddingDate"
            value={formData.weddingDate}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Story:</label>
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            style={styles.textarea}
            rows="3"
          ></textarea>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Bride Birthday:</label>
          <input
            type="date"
            name="brideBirthday"
            value={formData.brideBirthday}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Groom Birthday:</label>
          <input
            type="date"
            name="groomBirthday"
            value={formData.groomBirthday}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            style={styles.textarea}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" style={styles.button}>
          {isUpdating ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "0.7rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  textarea: {
    padding: "0.7rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    resize: "none",
  },
  button: {
    padding: "0.7rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default UserInfoForm;
