import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import RepoList from "./RepositoryList";
import RepoDetails from "./RepositoryDetails";
import Load from "./Loader";
import Header from "./header";

function App() {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [originalRepos, setOriginalRepos] = useState([]); // Store the original list of repositories
  const URL = "https://api.github.com/users/Chiboyvj/repos";
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(URL);
        setRepos(response.data);
        setOriginalRepos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error Fetching Repos:", error);
        setIsLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If search term is empty, reset to show all repos
      setRepos(originalRepos);
    } else {
      // Filter repos based on search term
      const filteredRepos = originalRepos.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRepos(filteredRepos);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        {isLoading ? (
          <Load />
        ) : (
          <Routes>
            <Route path="/" element={<RepoList repos={repos} />} />
            <Route
              path="/repo/:repoId"
              element={
                <RepoDetails repos={repos} handleSearch={handleSearch} />
              }
            />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
