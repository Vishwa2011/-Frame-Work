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
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Field, Form, Formik } from 'formik';
import Draggable from 'react-draggable';
import axios from 'axios';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

const Students = () => {
    const [open, setOpen] = React.useState(false);
    const [info, setinfo] = React.useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [courses, setcourses] = React.useState([]);
    const [stud, setstud] = useState([])
    const [editid, seteditId] = useState(null)
    const [initialValues, setInitialValues] = useState({
        name: '',
        contact: '',
        experience: '',
        branch: '',
        education: '',
        course: '',
        note: '',
    });
    const [statuses, setStatuses] = useState({});

 
    const dataToken = localStorage.getItem('token');

    React.useEffect(() => {
        Data();
        axios.get('https://backend-interview-test-6hzp.onrender.com/course/', {
            headers: { Authorization: dataToken },
        })
            .then(res => setcourses(res.data.data))
            .catch(error => console.log(error));
    }, [dataToken]);

    const Data = async () => {
        axios
            .get('https://backend-interview-test-6hzp.onrender.com/student/', {
                headers: { Authorization: dataToken },
            })
            .then((response) => {
                setstud(response.data.data);

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
            axios.put('https://backend-interview-test-6hzp.onrender.com/student/' + editid, values, {
                headers: {
                    Authorization: dataToken
                }
            })
                .then((res) => {
                    Data();
                    seteditId(null)
                    setInitialValues({
                        name: '',
                        contact: '',
                        experience: '',
                        education: '',
                        branch: '',
                        course: '',
                        description: '',
                    });
                    // setInitialValues(values); 
                    handleClose()
                })
                .catch((error) => {
                    console.log(error);

                })
        }
        else {
            // console.log(values);
            axios.post('https://backend-interview-test-6hzp.onrender.com/student/create', values, {
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
            .delete('https://backend-interview-test-6hzp.onrender.com/student/' + id, {
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
        seteditId(row._id)
        setOpen(true)
    }
    const handleClickOpeninfo = (student) => {
        setSelectedCompany(student);
        setinfo(true);
    };

    const handleCloseinfo = () => {
        setinfo(false);
        setSelectedCompany(null);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const currencies = [
        { value: 'Pending', label: 'Pending' },
        { value: 'Done', label: 'Done' },
        { value: 'Reject', label: 'Reject' },
    ];

    // const handleStatusChange = (event, studentId) => {
    //     setStatuses({ ...statuses, [studentId]: event.target.value });
    // };

    const handleStatusChange = async (event, studentid) => {
        axios
            .put(`https://backend-interview-test-6hzp.onrender.com/student/${studentid}`,{jobstatus:event}, {
                headers: { Authorization: dataToken },
            })
            .then((response) => {
                Data();

            })
            .catch((error) => {
                console.error(error);
            });

    }
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
    const experience = [
        { value: 'Fresher', label: "Fresher" },
        { value: '1 year', label: "1 year" },
        { value: '2 year', label: '2 year' },
    ];
    const educations = [
        { value: '10th', label: "10th" },
        { value: '12th', label: "12th" },
        { value: 'BCA', label: 'BCA' },
        { value: 'MCA', label: 'MCA' },
    ];

    const branch = [
        { value: 'katargam', label: "Katargam" },
        { value: 'adajan', label: 'Adajan' },
        { value: 'vesu', label: 'Vesu' },
    ];



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
                        // TransitionComponent={Transition}
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
                                <Form style={{ margin: '10px 15px 0px 20px' }}>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '29ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Field
                                            as={TextField}
                                            id="outlined-basic"
                                            name='name'
                                            className='black_color'
                                            label="Student name"
                                            variant="outlined"
                                        />
                                        <Field
                                            as={TextField}
                                            id="outlined-basic"
                                            name='contact'
                                            className='black_color'
                                            label="Phone number"
                                            variant="outlined"
                                        />

                                    </Box>
                                    <Box sx={{
                                        display: 'flex'
                                    }}>

                                        <Box sx={{ minWidth: 100, width: '95%', margin: '10px' }} className='black_color'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                                                <Field
                                                    as={Select}
                                                    name="experience"
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Experience"
                                                    fullWidth
                                                >
                                                    {experience.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </FormControl>
                                        </Box>

                                        {/*  */}

                                        <Box sx={{ minWidth: 100, width: '95%', margin: '10px' }} className='black_color'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-city-label">Branch</InputLabel>
                                                <Field
                                                    as={Select}
                                                    name="branch"
                                                    labelId="demo-simple-select-city-label"
                                                    id="demo-simple-select-city"
                                                    label="Branch"
                                                    fullWidth
                                                >
                                                    {branch.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </FormControl>
                                        </Box>
                                        <Box sx={{ minWidth: 100, width: '95%', margin: '10px' }} className='black_color'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-city-label">Education</InputLabel>
                                                <Field
                                                    as={Select}
                                                    name="education"
                                                    labelId="demo-simple-select-city-label"
                                                    id="demo-simple-select-city"
                                                    label="Education"
                                                    fullWidth
                                                >
                                                    {educations.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </FormControl>
                                        </Box>

                                    </Box>

                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '60ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >

                                        <Box sx={{ minWidth: 100, width: '95%', margin: '10px' }} className='black_color'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Coursesname</InputLabel>
                                                <Field
                                                    as={Select}
                                                    name='course'
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Coursesname"
                                                    value={values.course}
                                                    onChange={(e) => setFieldValue('course', e.target.value)}
                                                >
                                                    {courses.map((option) => (
                                                        <MenuItem key={option._id} value={option._id}>
                                                            {option.course}
                                                        </MenuItem>
                                                    ))}
                                                </Field>
                                            </FormControl>
                                        </Box>
                                    </Box>

                                    {/*  */}
                                    <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1, width: '60ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >

                                        <Field
                                            as={TextField}
                                            id="filled-multiline-static"

                                            name='note'
                                            label='Description'
                                            className='black_color'
                                            multiline
                                            rows={4}
                                            placeholder='Write company description here'

                                            variant="outlined"
                                        />

                                    </Box>

                                    {/*  */}
                                    <DialogActions sx={{ justifyContent: 'start', padding: '0px 20px 20px 20px' }}>
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
                                <TableCell sx={{ color: 'white' }} align="left">CONTACT</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">STATUS</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">EDIT</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">DELETE</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">INFO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stud.map((row, index) => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.contact}</TableCell>
                                    <TableCell align="center">
                                        {/* <Box sx={{ minWidth: 50 }}> */}
                                            <FormControl sx={{m:1,minWidth:120}} size='small'>
                                                <Select
                                                    // as={Select}
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    className='panding_button '
                                                    // value={statuses[row._id] || 'Pending'}
                                                    value={row.jobstatus}
                                                    onChange={(event) => handleStatusChange(event.target.value, row._id)}
                                                    sx={{
                                                        textAlign: 'center',
                                                        backgroundColor: row.jobstatus === 'Pending' ? '#FF8C00' :
                                                        row.jobstatus === 'Done' ? 'green' : 'red',
                                                        color:'white'

                                                    }}
                                                >
                                                    {currencies.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        {/* </Box> */}
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
                                    <TableCell align="center">
                                        <Button onClick={() => handleClickOpeninfo(row)}>
                                            {createButton(InfoIcon)}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    open={info}
                    onClose={handleCloseinfo}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title" />
                    <DialogContent>

                        {selectedCompany ? (
                            <>
                                <DialogContentText sx={{ color: 'black', fontSize: '24px' }} >
                                    {selectedCompany.name}
                                </DialogContentText>
                                <hr />
                                <DialogContentText sx={{ color: 'black', fontSize: '20px', marginBottom: '10px' }}>
                                    student information for the company visit:
                                </DialogContentText>
                                <DialogContent sx={{ padding: '0px', background: 'black', padding: '20px', borderRadius: '10px' }}>
                                    <DialogContentText sx={{ color: 'white' }}>
                                        Company name:
                                    </DialogContentText>
                                    <DialogContentText sx={{ color: 'white' }}>
                                        Reason:
                                    </DialogContentText>
                                </DialogContent >
                            </>
                        ) : (
                            <DialogContentText>No company information available.</DialogContentText>
                        )}
                    </DialogContent>

                </Dialog>
            </Box>
        </Drawerspage>
    )
}

export default Students
