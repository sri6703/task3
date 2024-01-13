import React , {useState} from 'react';
import axios from 'axios';
const CreateRecord=()=>{
    console.log("CreateRecord component is rendered");
    const [formdata , setformdata] = useState (
        {
    name: '',
    id: '',
    assignee: '',
    project: '',
    startTime: '',
        }
    );

const handlechange=(e)=> {
    setformdata({...formdata,[e.target.name]:e.target.value});
};
const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:3000/api/data",formdata);
        if (res.status === 200) {
            alert('Record created successfully:');
            setformdata({
              name: '',
              id: '',
              assignee: '',
              project: '',
              startTime: '',
            });
          }
    }
    catch(error)
    {
        alert('oops! cannot create record');
        console.error("oops! cannot create record :",error);
    }
};
return (
    <div>
        <h2>Create Record</h2>
        <form onSubmit={handlesubmit}>
            <label>Name:</label>
            <input type="text" name="name" value={formdata.name} onChange={handlechange} required/>
            <label>ID:</label>
            <input type="text" name="id" value={formdata.id} onChange={handlechange} required/>
            <label>Assignee:</label>
            <input type="text" name="assignee" value={formdata.assignee} onChange={handlechange} required/>
            <label>Project:</label>
            <input type="text" name="project" value={formdata.project} onChange={handlechange} required/>
            <label>StartTime:</label>
            <input type="datetime-local" name="startTime" value={formdata.startTime} onChange={handlechange} required/>
            <button type="submit">Create Record</button>
        </form>
    </div>
);
};

export default CreateRecord;