import React from "react";
import { useVotes } from "../components/VoteContext";

const CandidateList = ({ candidates }) => {
  const { votes, deleteVote } = useVotes();

  // calculate total votes
  const totalVotes = Object.values(votes).reduce(
    (sum, candidate) => sum + (candidate.count || 0),
    0
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-4 text-xl font-bold">Live Results</h2>
      <p className="mb-4 font-semibold">Total Votes: {totalVotes}</p>
      <div className="flex flex-wrap justify-center">
        {candidates.map((candidate) => (
          <div
            key={candidate}
            className="w-48 p-4 m-2 bg-yellow-100 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold">{candidate}</h2>
            <p>Votes: {votes[candidate]?.count || 0}</p>
            <ul>
              {(votes[candidate]?.voters || []).map((voter, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between my-2 text-sm"
                >
                  {voter}
                  <button
                    onClick={() => deleteVote(voter)}
                    className="px-2 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateList;
