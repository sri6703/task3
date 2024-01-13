import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CreateRecord from './components/CreateRecord';
import ShowRecord from './components/ShowRecord';
import SearchById from './components/SearchById';
import SearchByName from './components/SearchByName';
import SearchByAssignee from './components/SearchByAssignee';
import DeleteRecord from './components/DeleteRecord';
import './App.css';
import logo from './logo.jpeg';

const App = () => {
  return (
    <Router>
      <div className="container"> 
      <header style={{ display: 'flex', alignItems: 'center',justifyContent: 'center'  }}>
  <img src={logo} alt="Company Logo" style={{ marginRight: '10px' }} />
  <h1>Kaibur Assessment</h1>
</header>
        <nav>
          <ul>
            <li> 
              <Link to="/create">Create Record</Link>
            </li>
            <li>
              <Link to="/show">Show Records</Link>
            </li>
            <li>
              <Link to="/search/id">Search by ID</Link>
            </li>
            <li>
              <Link to="/search/name">Search by Name</Link>
            </li>
            <li>
              <Link to="/search/assignee">Search by Assignee</Link>
            </li>
            <li>
              <Link to="/delete">Delete Record</Link>
            </li>
          </ul>
        </nav> 

        <Switch> 
          <Route path="/create" component={CreateRecord} />
          <Route path="/show" component={ShowRecord} />
          <Route path="/search/id" component={SearchById} />
          <Route path="/search/name" component={SearchByName} />
          <Route path="/search/assignee" component={SearchByAssignee} />
          <Route path="/delete" component={DeleteRecord} />
        </Switch>
      </div>
    </Router>
  );
};
 
export default App;
