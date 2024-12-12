import { useState, useEffect } from "react";

const Photography = () => {
  const [formData, setFormData] = useState({
    userId: "",
    photography: { number: 0, price: 300 },
    videography: { number: 0, price: 300 },
    clipConstruction: { number: 0, price: 200 },
    physicalAlbum: { selected: false, price: 500 },
    giftImageSize: { number: 0, price: 10 },
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate the total price dynamically
  useEffect(() => {
    const total =
      formData.photography.number * formData.photography.price +
      formData.videography.number * formData.videography.price +
      formData.clipConstruction.number * formData.clipConstruction.price +
      (formData.physicalAlbum.selected ? formData.physicalAlbum.price : 0) +
      formData.giftImageSize.number * formData.giftImageSize.price;
    setTotalPrice(total);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked, dataset } = e.target;

    if (dataset.category) {
      setFormData((prev) => ({
        ...prev,
        [dataset.category]: {
          ...prev[dataset.category],
          [name]: type === "checkbox" ? checked : parseFloat(value),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/photography?userId=${formData.userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setFormData(data[0]); // Load the existing data
          setIsEditMode(true);
        }
      } else {
        console.error("No existing entry found for this user.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = `http://localhost:3001/photography${isEditMode ? `/${formData._id}` : ""}`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Data ${isEditMode ? "updated" : "added"} successfully!`);
        if (!isEditMode) setFormData({ ...formData, _id: (await response.json()).data._id });
        setIsEditMode(true);
      } else {
        alert("Failed to save data!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-customBg">
      <div className="max-w-5xl w-3/5 p-8 bg-customBg1 shadow-lg rounded-lg space-y-5">
      <h1 className="text-2xl font-bold m-10">Photography Services</h1>
      <label className="flex items-center space-x-2">UserId: 
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          onBlur={fetchData}
          placeholder="User ID"
          className="border mx-2 p-2 rounded w-1/3"
        /></label>
        <label className="flex items-center space-x-2">Photography sessions (per 3 hours): 
        <input
          type="number"
          name="number"
          data-category="photography"
          value={formData.photography.number}
          onChange={handleChange}
          placeholder="Photography sessions (per 3 hours)"
          className="border mx-2 p-2 rounded w-1/3"
        /></label>
        <label className="flex items-center space-x-2">Videography sessions (per 3 hours): 
        <input
          type="number"
          name="number"
          data-category="videography"
          value={formData.videography.number}
          onChange={handleChange}
          placeholder="Videography sessions (per 3 hours)"
          className="border mx-2 p-2 rounded w-1/3"
        /></label>
        <label className="flex items-center space-x-2">Clip Construction (per 3 minute): 
        <input
          type="number"
          name="number"
          data-category="clipConstruction"
          value={formData.clipConstruction.number}
          onChange={handleChange}
          placeholder="Clip Construction (per minute)"
          className="border mx-2 p-2 rounded w-1/3"
        /></label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="selected"
            data-category="physicalAlbum"
            checked={formData.physicalAlbum.selected}
            onChange={handleChange}
          />
          <span> Physical Album with 20 photos</span>
        </label>
        <label className="flex items-center space-x-2">Gift Image for guests (Size 15x18 ):
        <input
          type="number"
          name="number"
          data-category="giftImageSize"
          value={formData.giftImageSize.number}
          onChange={handleChange}
          placeholder="Gift Image Size (15x18 for guests)"
          className="border mx-2 p-2 rounded w-1/3"
        /></label>
        <h2 className="text-lg font-bold">Total Price: ${totalPrice}</h2>
        <button onClick={handleSubmit} className="bg-btnLight text-white hover:bg-btnDark w-full px-4 py-2 rounded">
          {isEditMode ? "Update" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Photography;
