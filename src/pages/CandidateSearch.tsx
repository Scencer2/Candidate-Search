import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  location: string | null;
  email: string | null;
  html_url: string;
  company: string | null;
}

interface BasicUser {
  login: string;
}

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<BasicUser[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<GitHubUser | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadCandidates = async () => {
      const users = await searchGithub();
      setCandidates(users);
    };

    loadCandidates();
  }, []);

  useEffect(() => {
    const loadCurrentCandidate = async () => {
      if (candidates.length > 0 && index < candidates.length) {
        const candidate = await searchGithubUser(candidates[index].login);
        setCurrentCandidate(candidate);
      }
    };

    loadCurrentCandidate();
  }, [candidates, index]);

  const handleSkip = () => {
    setIndex((prev) => prev + 1);
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    saved.push(currentCandidate);
    localStorage.setItem('savedCandidates', JSON.stringify(saved));
    setIndex((prev) => prev + 1);
  };

  if (!currentCandidate) {
    return <p>Loading candidate...</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Candidate Search</h1>
      <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        <img src={currentCandidate.avatar_url} alt="avatar" width="100" />
        <h2>{currentCandidate.name || 'No name listed'}</h2>
        <p><strong>Username:</strong> {currentCandidate.login}</p>
        <p><strong>Location:</strong> {currentCandidate.location || 'N/A'}</p>
        <p><strong>Email:</strong> {currentCandidate.email || 'N/A'}</p>
        <p><strong>Company:</strong> {currentCandidate.company || 'N/A'}</p>
        <p><a href={currentCandidate.html_url} target="_blank">GitHub Profile</a></p>
      </div>
      <button onClick={handleSave}>+</button>
      <button onClick={handleSkip}>-</button>
    </div>
  );
};

export default CandidateSearch;
