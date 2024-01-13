import React , {useEffect, useState} from 'react';
import axios from 'axios';

const SearchByName = () =>{
    const [sinput,setsinput]=useState('');
    const[sres,setsres]=useState(null);
    const handlesearch = async()=> {
            try{
              
                const res = await axios.get(`http://localhost:3000/api/data/names/${sinput}`);
                setsres(res.data);
            }
            catch(error) 
            {
              
                if (error.response && error.response.status === 404) {
                  alert('No record found with the provided Name.');
                }
                else 
                {
                  console.error("oops! cannot search record :",error);
                  setsres([]);
                }
              
            }
            finally {
              setsinput('');
            }
    };

    return(
        <div>
        <h2>Search Records</h2>
        <label>Enter the name:</label>
        <input type="text" value={sinput} onChange={(e) => setsinput(e.target.value)} />
        <button onClick={handlesearch}>Search</button>
        {sres && (
          <div>
            <h3>Search Results:</h3>
            <ul>
              {sres.length > 0 ? (
                sres.map((data) => (
                  <li key={data.id}>
                    <strong>Name:</strong> {data.name}, <strong>ID:</strong> {data.id},{' '}
                    <strong>Assignee:</strong> {data.assignee}, <strong>Project:</strong>{' '}
                    {data.project}, <strong>StartTime:</strong> {data.startTime}
                  </li>
                ))
              ) : (
                <p></p>
              )}
            </ul>
          </div>
        )}
      </div>
    );
};

export default SearchByName;