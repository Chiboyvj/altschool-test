import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import AddRepoForm from "./AddRepo";
// import RepoDetails from "./RepoDetails";

const RepoList = ({ repos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRepos, setFilteredRepos] = useState(repos);
  const [repoToUpdate, setRepoToUpdate] = useState(null); // State for updating repo
  const [showModal, setShowModal] = useState(false); // State for showing/hiding modal

  // Handle search input change
  const onSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setCurrentPage(1); // Reset pagination on search
    filterRepos(term);
    const filtered = filterRepos(term); // Filter repositories
    setFilteredRepos(filtered); // Update state with filtered repositories
  };

  // Filter repositories based on search term and selected language
  const filterRepos = (searchTerm, language) => {
    let filteredRepos = repos;

    if (searchTerm) {
      filteredRepos = filteredRepos.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredRepos;
  };

  // Pagination
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo); // Use filteredRepos here

  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Function to close modal
  const closeModal = () => {
    setRepoToUpdate(null);
    setShowModal(false);
  };

  const handleAddNew = () => {
    setShowModal(true);
  };

  return (
    <div className="repo-list">
      <div className="form-and-new">
        <form className="searchForm">
          <label htmlFor="search">Search Post</label>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={onSearchChange}
          />
        </form>
        <button onClick={handleAddNew}>Add New Repo</button>
        <Modal show={showModal} onClose={closeModal}>
          <AddRepoForm onClose={closeModal} />
        </Modal>
      </div>

      <ul className="list">
        {currentRepos.map((repo) => (
          <li key={repo.id}>
            <Link to={`/repo/${repo.id}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
      {filteredRepos.length > reposPerPage && ( // Conditionally render pagination
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RepoList;
