// src/components/GitHubProfile.js
import React, { useState, useEffect } from 'react';
import { getGitHubProfile, getGitHubRepositories } from '../services/githubService';

const GitHubProfile = () => {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if (username) {
      fetchProfile();
      fetchRepositories();
    }
  }, [username]);

  const fetchProfile = async () => {
    try {
      const data = await getGitHubProfile(username);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
    }
  };

  const fetchRepositories = async () => {
    try {
      const data = await getGitHubRepositories(username);
      setRepositories(data);
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchProfile}>Fetch Profile</button>

      {profile && (
        <div>
          <h2>{profile.login}</h2>
          <img src={profile.avatar_url} alt={`${profile.login}'s avatar`} />
          <p>{profile.bio}</p>
        </div>
      )}

      {repositories.length > 0 && (
        <div>
          <h3>Repositories</h3>
          <ul>
            {repositories.map((repo) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GitHubProfile;
