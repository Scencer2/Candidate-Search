import { useEffect, useState } from 'react';
import './SavedCandidates.css';
import { GitHubUser } from '../interfaces/Candidate.interface';



const SavedCandidates = () => {
  const [saved, setSaved] = useState<GitHubUser[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSaved(stored);
  }, []);

  const handleRemove = (login: string) => {
    const filtered = saved.filter((candidate) => candidate.login !== login);
    setSaved(filtered);
    localStorage.setItem('savedCandidates', JSON.stringify(filtered));
  };

  return (
    <main>
      <h1>Potential Candidates</h1>
      {saved.length === 0 ? (
        <p>No candidates have been saved.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {saved.map((candidate) => (
              <tr key={candidate.login}>
                <td>
                  <img src={candidate.avatar_url} alt="avatar" width="40" style={{ borderRadius: '50%' }} />
                </td>
                <td>
                  {candidate.name || 'No name'}
                  <br />
                  <em>({candidate.login})</em>
                </td>
                <td>{candidate.location || 'N/A'}</td>
                <td>
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td>
                  <button onClick={() => handleRemove(candidate.login)} className="reject">−</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default SavedCandidates;

