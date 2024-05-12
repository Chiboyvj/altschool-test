import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "./Modal";
import DeleteRepoComponent from "./DeleteRepo";
import UpdateRepoForm from "./EditRepo";

const RepoDetails = ({ repos, onEdit, onDelete }) => {
  const [repoToUpdate, setRepoToUpdate] = useState(null); // State for updating repo
  const [showModal, setShowModal] = useState(false); // State for showing/hiding modal
  const { repoId } = useParams();
  const repo = repos.find((repo) => repo.id.toString() === repoId);

  const handleEdit = (repo) => {
    setRepoToUpdate(repo);
    setShowModal(true);
  };

  const handleDelete = () => {
    // onDelete();
    setShowModal(true);
    // console.log("Deleting repository with ID:", repoId);
  };
  // Function to close modal
  const closeModal = () => {
    setRepoToUpdate(null);
    setShowModal(false);
  };

  if (!repo) {
    return <div className="repo-not-found">Repository Not Found</div>;
  }
  return (
    <div className="repo">
      <Modal show={showModal} onClose={closeModal}>
        {repoToUpdate ? (
          <UpdateRepoForm
            repoName={repo.name}
            repo={repoToUpdate}
            onClose={closeModal}
          />
        ) : (
          <DeleteRepoComponent
            username={repo.owner.login}
            repoName={repo.name}
            onDelete={closeModal}
          />
        )}
      </Modal>

      <Link to="/">
        <button className="back">Back to List</button>
      </Link>

      <div className="repo-details">
        <h5>Repository ID: {repo.id}</h5>
        <h5>Repository Name: {repo.name}</h5>
        <p>Owner: {repo.owner.login}</p>
        <p>Repository Description: {repo.description}</p>
        <p>
          URL: <a href={repo.html_url}>{repo.html_url}</a>
        </p>
        <p>Forks: {repo.forks_count}</p>

        <p>Stars: {repo.stargazers_count}</p>
        <div className="repo-actions">
          <button className="edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepoDetails;
