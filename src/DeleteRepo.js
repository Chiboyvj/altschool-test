import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteRepoComponent = ({ repoName, username }) => {
  const token = process.env.REACT_APP_TOKEN;

  const [message, setMessage] = useState("");
  const history = useNavigate();

  const URL = "https://api.github.com/repos/Chiboyvj";

  const handleDelete = async () => {
    try {
      const deleteUrl = `${URL}/${repoName}`;
      console.log("Delete URL:", deleteUrl); // Log the delete URL
      const response = await axios.delete(deleteUrl, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      setMessage(`Repository ${repoName} successfully deleted.`);
      // Reload the home page after 3 seconds
      setTimeout(() => {
        history("/");
        window.location.reload();
      }, 3000);
    } catch (error) {
      setMessage(`Error: ${error.response.data.message}`);
    }
  };

  return (
    <div className="delete-modal">
      <h5>Delete {repoName} Repo</h5>

      <button onClick={handleDelete}>Delete Repository</button>
      <p>{message}</p>
    </div>
  );
};

export default DeleteRepoComponent;
