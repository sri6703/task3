import React, { useState } from 'react';
import axios from 'axios';

const DeleteRecord = () => {
  const [recordId, setRecordId] = useState('');
  const [deleteStatus, setDeleteStatus] = useState('');

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/data/${recordId}`);
        alert('Record deleted successfully.');
    setTimeout(() => {
      setDeleteStatus('');
    }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('No record found with the provided ID.');
      }
      else 
      {
      console.error('Oops! Cannot delete record:', error);
      alert('Error deleting record.');
      }
    }
    finally {
      setRecordId('');
    }
  };

  return (
    <div>
      <h2>Delete Record</h2>
      <label>Enter the ID to delete:</label>
      <input type="text" value={recordId} onChange={(e) => setRecordId(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
      {/* {deleteStatus && <p>{deleteStatus}</p>} */}
    </div>
  );
};

export default DeleteRecord;
