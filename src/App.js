import React, { useState, useEffect } from 'react';

const PaginationTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const currentData = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Employee Data Table</h1>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <button style={styles.button} onClick={handlePrevious} >
          Previous
        </button>
        <span style={styles.pageNumber}>{currentPage}</span>
        <button style={styles.button} onClick={handleNext} >
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px auto',
    maxWidth: '80%',
    border: '1px solid #ddd',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    background: '#3cb371', // Green color
    color: '#fff',
    padding: '10px',
    margin: 0,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '0',
  },
  thead: {
    backgroundColor: '#3cb371',
    color: '#fff',
  },
  tbody: {
    textAlign: 'left',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#3cb371',
    padding: '10px',
  },
  button: {
    background: '#3cb371',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  pageNumber: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 10px',
  },
};

export default PaginationTable;
