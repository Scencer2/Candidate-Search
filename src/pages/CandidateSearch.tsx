import { useState, useEffect } from 'react';
import './CandidateSearch.css';
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
    <div>
      <h1>Candidate Search</h1>

      <div className="card">
        <img src={currentCandidate.avatar_url} alt="avatar" />
        <div className="card-details">
          <h2>
            {currentCandidate.name || 'No name listed'}
            <br />
            <em>({currentCandidate.login})</em>
          </h2>
          <p><strong>Location:</strong> {currentCandidate.location || 'N/A'}</p>
          <p><strong>Email:</strong> {currentCandidate.email || 'N/A'}</p>
          <p><strong>Company:</strong> {currentCandidate.company || 'N/A'}</p>
          <p>
            <a href={currentCandidate.html_url} target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
          </p>
        </div>
      </div>

      <div className="button-group">
        <button onClick={handleSkip} className="skip">−</button>
        <button onClick={handleSave} className="save">+</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
