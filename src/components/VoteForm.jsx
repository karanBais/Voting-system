import React, { useState } from 'react';
import { useVotes } from '../components/VoteContext';

const CandidateOptions = ['Alice', 'Bob', 'Charlie', 'David'];

const VoteForm = () => {
  const { addVote, deleteVote, students } = useVotes();
  const [studentName, setStudentName] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');

  const handleVote = () => {
    if (studentName && selectedCandidate) {
      addVote(studentName, selectedCandidate);
      setStudentName('');
      setSelectedCandidate('');
    }
  };

  const handleDelete = () => {
    if (studentName) {
      deleteVote(studentName);
      setStudentName('');
    }
  };

  return (
    <div className="p-4 bg-red-200 rounded-lg shadow-md">
    
      <h2 className="mb-4 text-xl font-bold">Vote for Class Monitor</h2>
      
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student Name"
        className="w-full p-2 mb-2 rounded"
      />
      <select
        value={selectedCandidate}
        onChange={(e) => setSelectedCandidate(e.target.value)}
        className="w-full p-2 mb-4 rounded"
      >
        <option value="" disabled>Select Monitor</option>
        {CandidateOptions.map((candidate) => (
          <option key={candidate} value={candidate}>
            {candidate}
          </option>
        ))}
      </select>
      <button
        onClick={handleVote}
        className="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Vote
      </button>
    </div>
  );
};

export default VoteForm;
