import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const VoteContext = createContext();
export const useVotes = () => useContext(VoteContext);

const API_URL = "https://crudcrud.com/api/eaa40baa5dae477cb23859a500c2d8dd/votes"; // replace with yours

export const VoteProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);

      // rebuild votes map from students
      const counts = res.data.reduce((acc, s) => {
        acc[s.candidate] = acc[s.candidate] || { count: 0, voters: [] };
        acc[s.candidate].count += 1;
        acc[s.candidate].voters.push(s.name);
        return acc;
      }, {});
      setVotes(counts);
    } catch (err) {
      console.error("Error fetching votes:", err);
    }
  };

  const addVote = async (studentName, candidate) => {
    try {
      await axios.post(API_URL, { name: studentName, candidate });
      fetchData(); // refresh state from API
    } catch (err) {
      console.error("Error adding vote:", err);
    }
  };

  const deleteVote = async (studentName) => {
    try {
      // find the student in API docs
      const target = students.find((s) => s.name === studentName);
      if (!target) return;

      await axios.delete(`${API_URL}/${target._id}`);
      fetchData(); // refresh state from API
    } catch (err) {
      console.error("Error deleting vote:", err);
    }
  };

  return (
    <VoteContext.Provider value={{ votes, addVote, deleteVote, students }}>
      {children}
    </VoteContext.Provider>
  );
};