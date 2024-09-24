// src/components/SearchBar.tsx

import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (title: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [jobTitle, setJobTitle] = useState<string>('');

  const handleSearch = () => {
    if (jobTitle.trim() !== '') {
      onSearch(jobTitle.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter job title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button variant="outline-secondary" onClick={handleSearch}>
        Search
      </Button>
    </InputGroup>
  );
};

export default SearchBar;
