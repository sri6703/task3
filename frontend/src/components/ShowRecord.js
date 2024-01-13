import React , {useEffect, useState} from 'react';
import axios from 'axios';

const ShowRecord = () =>{
    const [record , setrecorddata] = useState([]);
    useEffect(()=> {
        const fetchrecord = async() => {
        try{
            const res = await axios.get("http://localhost:3000/api/data");
            setrecorddata(res.data);
        }
        catch(error)
        {
            console.error("oops!cannot show record",error);
        }
    };
    fetchrecord();
    },[]);
    return (
        <div>
        <h2>Show Records</h2>
        {record.length > 0 ? (
        <ul>
          {record.map(data => (
            <li key={data.id}>
              <strong>Name:</strong> {data.name}, <strong>ID:</strong> {data.id}, <strong>Assignee:</strong> {data.assignee}, <strong>Project:</strong> {data.project}, <strong>StartTime:</strong> {data.startTime}
            </li>
          ))}
        </ul>) : (
        <p>No records found.</p>
      )}
      </div>
    );

};
export default ShowRecord;