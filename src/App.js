import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IssueList from './FrontEnd/Components/IssueList';
import IssueForm from './FrontEnd/Components/IssueForm';
import IssueDetail from './FrontEnd/Components/IssueDetail';
import IssueEdit from './FrontEnd/Components/IssueEdit';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<IssueList />} />
          <Route path="/issue/add" element={<IssueForm />} />
          <Route path="/issue/edit/:id" element={<IssueEdit />} />
          <Route path="/issue/:id" element={<IssueDetail />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
