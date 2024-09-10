import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IssueForm = () => {
  const [id, setId] = useState(''); // State for ID
  const [title, setTitle] = useState(''); // State for title
  const [description, setDescription] = useState(''); // State for description
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate ID
    if (id < 0) {
      setError('ID must be at least 0'); // Set error message for invalid ID
      return;
    }

    const newIssue = { id, title, description };

    try {
      const response = await fetch('http://localhost:5000/api/issues/add', {
        method: 'POST', // POST method for creating new issues
        headers: {
          'Content-Type': 'application/json', // JSON content type
        },
        body: JSON.stringify(newIssue), // Convert issue data to JSON
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get detailed error message
        throw new Error(`Failed to create discussion: ${errorText}`); // Handle errors
      }

      navigate('/'); // Navigate to home page on success
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  return (
    <div className="discussion-form-container">
      <h2>Create New Discussion</h2>

      {error && <p className="error-message">Error: {error}</p>} {/* Display error message */}

      <form onSubmit={handleSubmit}> {/* Form to create a new discussion */}
        <div className="form-group">
          <label htmlFor="id">ID:</label>
          <input
            type="number"
            name="id"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            min="0" // Minimum value for ID
            required // Required field
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required // Required field
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required // Required field
          />
        </div>

        <button type="submit" className="submit-button">Submit</button> {/* Submit button */}
      </form>
    </div>
  );
};

export default IssueForm;
