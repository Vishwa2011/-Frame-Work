import React, { useEffect, useState } from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Drawerspage from './Drawerspage';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'start',
  color: 'black',
}));

const Dashboard = () => {
  const dataToken = localStorage.getItem('token')
  const [Follow, setFollow] = useState([0])
  const [Due, setDue] = useState([0])
  const [Company, setCompany] = useState([0])
  const [Pending, setPending] = useState([0])
  const [Done, setDone] = useState([0])
  const [All, setAll] = useState([0])

  const FollowCount = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/interview/followcount`, { headers: { Authorization: dataToken } })
      .then((res) => { setFollow(res.data.data) })
      .catch((error) => { console.log(error) })
  }

  const DueCount = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/interview/duecount`, { headers: { Authorization: dataToken } })
      .then((res) => { setDue(res.data.data) })
      .catch((error) => { console.log(error) })
  }

  const CompanyCount = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/company/count`, { headers: { Authorization: dataToken } })
      .then(res => setCompany(res.data.data))
      .catch(error => console.log(error))
  }

  const StudPending = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/student/pendingcount`, { headers: { Authorization: dataToken } })
      .then(res => setPending(res.data.data))
      .catch(error => console.log(error))
  }

  const StudDone = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/student/donecount`, { headers: { Authorization: dataToken } })
      .then(res => setDone(res.data.data))
      .catch(error => console.log(error))
  }
  const AllStud = () => {
    axios.get(`https://backend-interview-test-6hzp.onrender.com/student/count`, { headers: { Authorization: dataToken } })
      .then(res => setAll(res.data.data))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    FollowCount();
    DueCount()
    CompanyCount()
    StudPending()
    StudDone()
    AllStud()

  }, [dataToken])
  return (
    <Drawerspage>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid xs={2} sm={4} md={4} >
            <Item>
              <Box sx={{ fontSize: '2rem', fontWeight: '600' }}>{Follow}</Box>
              <h3>Today Interview</h3>
            </Item>
          </Grid>
          <Grid xs={2} sm={4} md={4} >
            <Item>
              <Box sx={{ fontSize: '2rem', fontWeight: '600' }}>{Due}</Box>
              <h3>Due Interview</h3>
            </Item>
          </Grid>
          <Grid xs={2} sm={4} md={4} >
            <Item>
              <Box sx={{ fontSize: '2rem', fontWeight: '600' }}>{Company}</Box>
              <h3>Total Company</h3>
            </Item>
          </Grid>
          <Grid xs={2} sm={4} md={4} >
            <Item>
              <Box sx={{ fontSize: '2rem', fontWeight: '600' }}>{Pending}</Box>
              <h3>Student Pending</h3>
            </Item>
          </Grid><Grid xs={2} sm={4} md={4} >
            <Item>
              <Box sx={{ fontSize: '2rem', fontWeight: '600' }}>{Done}</Box>
              <h3>Student Complete</h3>
            </Item>
          </Grid><Grid xs={2} sm={4} md={4} >
            <Item>
              <Box sx={{ fontSize: '2rem', fontWeight: '600' }}>{All}</Box>
              <h3>Today Student</h3>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Drawerspage>
  )
}

export default Dashboard
