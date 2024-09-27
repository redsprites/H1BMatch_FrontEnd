// src/App.tsx

import React, { useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import JobList from './components/JobList';
import './App.css';
import axios from 'axios';
import { Job } from './types/Job';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn, RedirectToSignIn } from '@clerk/clerk-react';
import MatchingJobs from './components/MatchingJobs';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentSearchTitle, setCurrentSearchTitle] = useState<string>('');

  const fetchJobs = async (title: string, page: number = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<{ jobs: Job[]; total: number }>(`${API_BASE_URL}/jobs/title/${encodeURIComponent(title)}?page=${page}&limit=10`, {
        withCredentials: true, // If your backend requires credentials
      });
      setJobs(response.data.jobs);
      // Handle pagination if implemented
    } catch (error: any) {
      console.error('Error fetching job data:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  const fetchMatchingJobs = async (title: string, page: number = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<{ jobs: Job[]; total: number }>(`${API_BASE_URL}/match/`, {
        withCredentials: true, // If your backend requires credentials
      });
      setJobs(response.data.jobs);
      // Handle pagination if implemented
    } catch (error: any) {
      console.error('Error fetching job data:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Container className="mt-5">
        <h1 className="mb-4 text-center">H1B Job Matcher</h1>
        <SignedIn>
          <SearchBar onSearch={(title :string ) => { setCurrentSearchTitle(title); fetchJobs(title); }} />
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
            {/* Add Pagination Component Here if implemented */}
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </Container>

      {/* Optionally, define additional routes */}
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/match" element={<MatchingJobs />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
