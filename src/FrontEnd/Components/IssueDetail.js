import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const IssueDetail = () => {
  const { id } = useParams(); // Get the issue ID from the route parameters
  const navigate = useNavigate(); // Hook for navigation
  const [issue, setIssue] = useState(null); // State to hold issue data
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/issues/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch issue'); // Handle HTTP errors
        }
        const data = await response.json(); // Get issue data
        setIssue(data); // Set issue data
      } catch (err) {
        console.error('Error fetching issue:', err); // Log error
        setError(`Error fetching issue: ${err.message}`); // Set error message
      }
    };

    fetchIssue(); // Fetch issue when component mounts
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/issues/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete issue');
      }

      navigate('/'); // Navigate back to the list or homepage on success
    } catch (err) {
      console.error('Error deleting issue:', err);
      setError(`Error deleting issue: ${err.message}`);
    }
  };

  if (!issue) {
    return <p>Loading issue...</p>; // Display while loading
  }

  return (
    <div className="issue-detail-container">
      <h2>{issue.title}</h2>
      <p>{issue.description}</p>
      
      <button onClick={() => navigate(`/edit/${issue.issueId}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>

      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
};

export default IssueDetail;
