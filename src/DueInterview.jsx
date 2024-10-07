import React, { useEffect, useState } from 'react';
import Drawerspage from './Drawerspage';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
// import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import { Formik } from 'formik';

const DueInterview = () => {
  const dataToken = localStorage.getItem('token');
  const [today, settoday] = useState([])
  const [initialValues, setInitialValues] = useState({
    company: '',
    name: '',
    jobstatus: '',
    note: '',
    followupdate: ''

  });
  const Data = async () => {
    axios.get('https://backend-interview-test-6hzp.onrender.com/interview/due', {
      headers: { Authorization: dataToken }
    })
      .then((res) => {
        settoday(res.data.data)
      })
      .catch((error) => {
        console.log(error);

      })
  }
  useEffect(() => {
    Data();
  }, [dataToken]);

  const [statuses, setStatuses] = useState({});

  const currencies = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Done', label: 'Done' },
    { value: 'Reject', label: 'Reject' },
  ];

  const handleStatusChange = async (event, studentid) => {
    console.log(event, studentid);

    axios.put(`https://backend-interview-test-6hzp.onrender.com/interview/followupdate/${studentid}`, { status: event }, {
      headers: { Authorization: dataToken },
    })
      .then((response) => {
        Data();

      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  

  return (
    <Drawerspage>
      <Box sx={{ width: '100%', maxWidth: '100%' }}>
        <TextField
          fullWidth
          label="Search"
          id="fullWidth"
          className='black_color' />

      </Box>

      <Formik
        enableReinitialize
        initialValues={initialValues}
      >
        <Box sx={{ marginTop: '20px' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ background: '#242424' }}>
                  <TableCell sx={{ color: 'white' }}>NO</TableCell>
                  <TableCell sx={{ color: 'white' }} align="left">COMPANY NAME</TableCell>
                  <TableCell sx={{ color: 'white' }} align="left">STUDENT NAME</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">STATUS</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">DESCRIPTION NOTE</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">FOLLOW UPDATE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {today.map((row, index) => (
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">{index + 1}</TableCell>
                    <TableCell align="left">{row.companyname.company}</TableCell>
                    <TableCell align="left">{row.studentname ? row.studentname.name : 'N/A'}</TableCell>
                    <TableCell align="center">

                      <Box sx={{ minWidth: 100 }}>
                        <FormControl fullWidth>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            className='panding_button '
                            value={row.status}
                            onChange={(event) => handleStatusChange(event.target.value, row._id)}
                            sx={{
                              textAlign: 'center',
                              backgroundColor: row.status === 'Pending' ? '#FF8C00' :
                                row.status === 'Done' ? 'green' : 'red',
                              color: 'white'
                            }}
                          >
                            {currencies.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        // id={`description-${row._id}`}
                        placeholder='write your thoughts...'
                        multiline maxRows={4}
                        className='black_color'
                        
                      />
                    </TableCell>
                    <TableCell align="center">{row.followupdate.split('T')[0].split('-').reverse().join("-")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Formik>
    </Drawerspage>
  );
};

export default DueInterview;
