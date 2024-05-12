import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateRepoForm = ({ repo, onClose, repoName }) => {
  const token = process.env.REACT_APP_TOKEN;
  const [newName, setNewName] = useState(repo.name || "");
  const [newDescription, setNewDescription] = useState(repo.description || "");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const history = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Basic validation: Check if new name and description are not empty
    if (!newName.trim() || !newDescription.trim()) {
      setMessage("Name and description are required.");
      return;
    }

    // Prepare the updated data
    const updatedData = {
      name: newName,
      description: newDescription,
    };

    const URL = "https://api.github.com/repos/Chiboyvj";

    try {
      // Make the API request to update the repository on GitHub
      const response = await axios.patch(`${URL}/${repoName}`, updatedData, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      // Handle successful response
      console.log("Update successful:", response.data);
      setMessage(`Repository ${repoName} successfully Updated to ${newName}.`);
      setError(null); // Reset error state
      // Reload the home page after 3 seconds
      setTimeout(() => {
        history("/");
        window.location.reload();
      }, 3000);
    } catch (error) {
      // Handle API error
      console.error("Update failed:", error.response.data);
      setMessage("Failed to update repository. Please try again."); // Set error message
    }
  };

  return (
    <div className="edit-modal">
      {error && <div className="error">{error}</div>}
      <h5>Edit {repoName} Repo</h5>

      <input
        type="text"
        placeholder="New Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />

      <input
        type="text"
        placeholder="New Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />

      <button onClick={handleUpdate}>Update</button>
      <p>{message}</p>
    </div>
  );
};

export default UpdateRepoForm;
