import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddRepoForm = ({ onClose }) => {
  const token = process.env.REACT_APP_TOKEN;
  const [repoName, setRepoName] = useState("");
  const [description, setDescription] = useState("");

  const [message, setMessage] = useState("");
  const history = useNavigate();

  const handleAddRepo = async (e) => {
    e.preventDefault();
    // Basic validation: Check if repo name and description are not empty
    if (!repoName.trim() || !description.trim()) {
      setMessage("Repository name and description are required.");
      return;
    }

    // Prepare data for creating a new repository
    const newRepoData = {
      name: repoName,
      description: description,
    };

    const URL = "https://api.github.com/user/repos";

    try {
      // Make the API request to create a new repository on GitHub
      const response = await axios.post(URL, newRepoData, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      console.log(response.data);

      // Handle successful response
      console.log("New repository created:", response.data);
      setMessage(`Repository ${repoName} created successfully.`);
      setTimeout(() => {
        history("/");
        window.location.reload();
      }, 3000);
    } catch (error) {
      // Handle API error
      setMessage("Failed to create repository. Please try again."); // Set error message
      console.error("Create repository error:", error.response.data);
    }
  };

  return (
    <div className="add-repo-modal">
      <h5>Add New Repository</h5>

      <input
        type="text"
        placeholder="Repository Name"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleAddRepo}>Create Repository</button>

      <p>{message}</p>
    </div>
  );
};

export default AddRepoForm;
