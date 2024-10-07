import React, { useState } from 'react'
import Drawerspage from './Drawerspage'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Divider, IconButton, InputLabel, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import MenuItem from '@mui/material/MenuItem';
import { Field, Form, Formik } from 'formik';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

const Interview = () => {
    const [open, setOpen] = React.useState(false);
    const [inter, setinter] = useState([])
    const [editid, seteditId] = useState(null)
    const [companies, setcompanies] = useState([])
    const [stud, setstud] = useState([])
    const dataToken = localStorage.getItem('token');

    const [initialValues, setInitialValues] = useState({
        companyname: '',
        studentname: '',
        // date: '',
        followupdate: ''
    });
    React.useEffect(() => {
        Data();
        companyapi();
        studapi();


    }, [dataToken]);

    const companyapi = (() => {
        axios.get('https://backend-interview-test-6hzp.onrender.com/company/', {
            headers: { Authorization: dataToken },
        })
            .then(res => setcompanies(res.data.data))
            .catch(error => console.log(error));
    })
    const studapi = (() => {
        axios.get('https://backend-interview-test-6hzp.onrender.com/student/', {
            headers: {
                Authorization: dataToken
            }
        })
            .then(res => setstud(res.data.data))
            .catch(error => console.log(error))
    })

    const Data = async () => {
        axios
            .get('https://backend-interview-test-6hzp.onrender.com/interview/', {
                headers: { Authorization: dataToken },
            })
            .then((response) => {
                setinter(response.data.data);
                const initialStatuses = {};
                response.data.data.forEach((student) => {
                    initialStatuses[student._id] = 'Pending';
                });
                setStatuses(initialStatuses);

            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values);

        if (editid != null) {
            axios.put('https://backend-interview-test-6hzp.onrender.com/interview/' + editid, values, {
                headers: {
                    Authorization: dataToken
                }
            })
                .then((res) => {
                    Data();
                    seteditId(null)
                    // setInitialValues({
                    //     companyname: '',
                    //     studentname: '',
                    //     date: '',
                    //     followupdate: ''
                    // });
                    setInitialValues(values);
                    handleClose()
                })
                .catch((error) => {
                    console.log(error);

                })
        }
        else {
            // console.log(values);
            axios.post('https://backend-interview-test-6hzp.onrender.com/interview/create', values, {
                headers: {
                    Authorization: dataToken
                }
            }).then(() => {
                // console.log(values);
                resetForm();
                Data();
                handleClose();
            })
                .catch((error) => {
                    console.log(error);

                })
        }

    };

    const handleDelete = (id) => {
        axios
            .delete('https://backend-interview-test-6hzp.onrender.com/interview/' + id, {
                headers: { Authorization: dataToken },
            })
            .then((res) => {
                Data();
                console.log("jjj");

            })
            .catch((error) => {
                console.error(error);
            });
    };

    const updatedata = (row) => {
        setInitialValues({ initialValues })
        // setInitialValues({
        //     companyname: row.companyname,
        //     studentname: row.studentname,
        //     date: row.date,
        //     followupdate: row.followupdate || ''
        // });
        seteditId(row._id)
        setOpen(true)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [statuses, setStatuses] = useState({});

    const currencies = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Done', label: 'Done' },
        { value: 'Reject', label: 'Reject' },
    ];

    const handleStatusChange = async (event, studentid) => {
        console.log(event, studentid);

        axios.put(`https://backend-interview-test-6hzp.onrender.com/interview/${studentid}`, { status: event }, {
            headers: { Authorization: dataToken },
        })
            .then((response) => {
                Data();

            })
            .catch((error) => {
                console.error(error);
            });
    };
    const createButton = (IconComponent, backgroundColor = '#242424', color = 'white') => (
        <Button
            sx={{
                backgroundColor,
                color,
                '&:hover': {
                    backgroundColor,
                },
                minWidth: 'unset',
                padding: '5px',
            }}
        >
            <IconComponent />
        </Button>
    );



    return (
        <Drawerspage>
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    gap: 2
                }}
            >
                <TextField fullWidth label="Search" id="fullWidth" className='black_color' />
                <React.Fragment >
                    <Button variant="outlined" onClick={handleClickOpen} sx={{ width: '20%', color: 'black', borderColor: 'black', '&:hover': { borderColor: '#242424' }, }}>
                        Create Student
                    </Button>
                    <Dialog
                        open={open}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Add Student"}</DialogTitle >
                        <Divider />

                        <Formik
                            enableReinitialize
                            onSubmit={handleSubmit}
                            initialValues={initialValues}
                        >
                            {({ values, setFieldValue }) => (
                                <Form style={{ margin: '10px' }}>
                                    <Box
                                        component="form"
                                        sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            margin: '10px',
                                            '& > :not(style)': { m: 1, width: '29ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >

                                         <Box sx={{ minWidth: 100, width: '95%', margin: '10px' }} className='black_color'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select an Company</InputLabel>
                                                <Field
                                                    as={Select}
                                                    name='companyname'
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Select an Company "
                                                    value={values.companyname}
                                                    onChange={(e) => setFieldValue('companyname', e.target.value)}
                                                >
                                                    {companies.map((option) => (
                                                        <MenuItem key={option._id} value={option._id}>
                                                            {option.company}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </FormControl>
                                        </Box> 

                                        
                                        <Box sx={{ minWidth: 100, width: '95%', margin: '10px' }} className='black_color'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select an Student</InputLabel>
                                                <Field
                                                    as={Select}
                                                    name='studentname'
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Select an Student "
                                                    value={values.studentname}
                                                    onChange={(e) => setFieldValue('studentname', e.target.value)}
                                                >
                                                    {stud.map((option) => (
                                                        <MenuItem key={option._id} value={option._id}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </FormControl>
                                        </Box>
                                    </Box>

                                    {/*  */}
                                    <Box sx={{ flex: '1 1 100%', margin: '10px' }}>
                                        <Field
                                            as={TextField}
                                            label="Select Date"
                                            type="date"

                                            // name='date'
                                            name='followupdate'
                                            className='black_color'
                                            fullWidth
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                        />
                                    </Box>


                                    {/*  */}
                                    <DialogActions sx={{ justifyContent: 'start', padding: '0px 20px 20px 10px' }}>
                                        <Button type='submit' sx={{ background: '#242424', color: 'white', '&:hover': { backgroundColor: '#242424' }, }}><AddIcon /> Add Course</Button>
                                    </DialogActions>
                                </Form>
                            )}
                        </Formik>
                    </Dialog>
                </React.Fragment>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow sx={{ background: '#242424' }}>
                                <TableCell sx={{ color: 'white' }} align="left">NO</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">STUDENT NAME</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">COMPANY NAME</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">STATUS</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">EDIT</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">DELETE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inter.map((row, index) => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">{row.studentname ? row.studentname.name : 'N/A'}</TableCell>
                                    <TableCell align="left">{row.companyname.company}</TableCell>
                                    <TableCell align="center">
                                        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
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
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="edit" onClick={() => updatedata(row)}>
                                            {createButton(ModeEditIcon)}
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete" onClick={() => handleDelete(row._id)}>
                                            {createButton(DeleteIcon)}
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Drawerspage>
    )
}

export default Interview
