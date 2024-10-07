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
import { Description } from '@mui/icons-material';

const TodayInterview = () => {
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
    axios.get('https://backend-interview-test-6hzp.onrender.com/interview/followupdate', {
      headers: { Authorization: dataToken }
    })
      .then((res) => {
        settoday(res.data.data)
        const initialStatuses = {};
        res.data.data.forEach((student) => {
          initialStatuses[student._id] = "Pending"
        })
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

  const handleStatusChange = (event, studentid) => {
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

  const DescriptionData = (event, Descriptionid) => {
    axios.put(`https://backend-interview-test-6hzp.onrender.com/interview/${Descriptionid}`, { description: event }, {
      headers: { Authorization: dataToken },
    })
      .then((response) => {
        Data();

      })
      .catch((error) => {
        console.error(error);
      });
  }
  DescriptionData();

  const rows = [
    // { no: 1, name: 'DecodeUp Technologies', student: 'Kirtan Makvana', status: statuses[1], dates: '01-06-2024' },
    // { no: 2, name: 'Codeyes Infotech', student: 'Vora Rutvik', status: statuses[2], dates: '02-06-2024' },
    // { no: 3, name: 'Celestial Infosoft', student: 'Rathod Vraj', status: statuses[3], dates: '12-06-2024' },
    // { no: 4, name: 'Octet Design Studio', student: 'Parmar Divyesh', status: statuses[4], dates: '20-06-2024' },
    // { no: 5, name: 'WeeTech Solution Pvt Ltd', student: 'Sojitra yash', status: statuses[5], dates: '25-06-2024' },
  ];

  // const handleStatusChange = (event, rowId) => {
  //   setStatuses({ ...statuses, [rowId]: event.target.value });
  // };

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
                        value={row.description}
                        onChange={(e) => DescriptionData(e.target.value, row._id)}
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

export default TodayInterview;

