import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Loginpage from './Loginpage';
import Dashboard from './Dashboard';
import Drawerspage from './Drawerspage';
import TodayInterview from './TodayInterview';
import DueInterview from './DueInterview';
import Courses from './Courses';
import Company from './Company';
import Students from './Students';
import Interview from './Interview';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {
  const [tokenremove, settokenremove] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      settokenremove(true);
    }
  }, []);

  return (
    <>

      <Router>
        <Switch>
          <Route path="/interview">
            {/* {tokenremove ? <Interview /> : <Redirect to="/" />} */}
            <Interview />
          </Route>
          <Route path="/Student">
            {/* {tokenremove ? <Students /> : <Redirect to="/" />} */}
            <Students />
          </Route>
          <Route path="/Company">
            {/* {tokenremove ? <Company /> : <Redirect to="/" />} */}
            <Company />
          </Route>
          <Route path="/Courses">
            {/* {tokenremove ? <Courses /> : <Redirect to="/" />} */}
            <Courses />
          </Route>
          <Route path="/DueInterview">
            {/* {tokenremove ? <DueInterview /> : <Redirect to="/" />} */}
            <DueInterview /> 
          </Route>
          <Route path="/TodayInterview">
            {/* {tokenremove ? <TodayInterview /> : <Redirect to="/" />} */}
            <TodayInterview />
          </Route>
          <Route path="/dashboard">
            {/* {tokenremove ? <Dashboard /> : <Redirect to="/" />} */}
            <Dashboard />
          </Route>
          <Route path="/">
            <Loginpage settokenremove={settokenremove} />
          </Route>
        </Switch>
      </Router>

    </>
  );
}

export default App;

