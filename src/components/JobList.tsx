// src/components/JobList.tsx

import React from 'react';
import JobCard from './JobCard';
import { Job } from '../types/Job';

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return <p>No jobs found. Try a different title.</p>;
  }

  return (
    <>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </>
  );
};

export default JobList;
