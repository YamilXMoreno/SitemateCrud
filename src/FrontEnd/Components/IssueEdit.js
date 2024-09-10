import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const IssueEdit = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIssue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(`http://localhost:5000/api/issues/edit/${id}`, {
        method: 'POST', // Use PUT to update the issue
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(issue),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get detailed error message
        throw new Error(`Failed to update issue: ${errorText}`);
      }

      navigate(`/issue/${id}`); // Navigate back to issue detail on success
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  if (!issue) {
    return <p>Loading issue...</p>; // Display while loading
  }

  return (
    <div className="issue-form-container">
      <h2>Edit Issue</h2>

      {error && <p className="error-message">Error: {error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={issue.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={issue.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default IssueEdit;
