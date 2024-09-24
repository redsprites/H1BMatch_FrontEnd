// src/App.tsx

import React, { useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import './App.css';
import axios from 'axios';
import { Job } from './types/Job';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

  const fetchJobs = async (title: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<Job[]>(`${API_BASE_URL}/jobs/title/${encodeURIComponent(title)}`);
      setJobs(response.data);
    } catch (error: any) {
      console.error('Error fetching job data:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">H1B Job Matcher</h1>
      <SearchBar onSearch={fetchJobs} />
      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status" />
          <span className="ms-2">Loading...</span>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}
      <div className="mt-4">
        <JobList jobs={jobs} />
      </div>
    </Container>
  );
};

export default App;
