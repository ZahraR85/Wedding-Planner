const AdminDelete = () => {
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        alert('User deleted successfully');
      } else {
        const message = await response.text();
        alert(message || 'Failed to delete user');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the user.');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      {/* Example User List */}
      <ul>
        <li>
          User 1 <button onClick={() => handleDeleteUser('user1-id')}>Delete</button>
        </li>
        <li>
          User 2 <button onClick={() => handleDeleteUser('user2-id')}>Delete</button>
        </li>
      </ul>
    </div>
  );
};

export default AdminDelete;
