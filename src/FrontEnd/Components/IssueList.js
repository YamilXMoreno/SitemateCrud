import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DiscussionList() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:5000/api/issues') 
      .then((response) => response.json())
      .then((data) => setDiscussions(data));
  }, []);

  return (
    <div>
      <h1>Discussion Board</h1>
      <Link to="/add">Start a New Discussion</Link>
      <ul>
        {discussions.map((discussion) => (
          <li key={discussion.issueId}>
            <Link to={`/issue/${discussion.issueId}`}>
              {discussion.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiscussionList;
