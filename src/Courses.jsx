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
import { Divider, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Field, Form, Formik } from 'formik';
import axios from 'axios';


const Courses = () => {
    const [open, setOpen] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState({ course: '' });
    const [course, setcourse] = useState([]);
    const [editid, seteditId] = useState(null)
    const dataToken = localStorage.getItem('token');

    React.useEffect(() => {
        Data();
    }, [dataToken]);

    const Data = async () => {
        axios
            .get('https://backend-interview-test-6hzp.onrender.com/course/', {
                headers: { Authorization: dataToken },
            })
            .then((response) => {
                setcourse(response.data.data);

            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = async (values, { resetForm }) => {
        if (editid != null) {
            axios.put('https://backend-interview-test-6hzp.onrender.com/course/' + editid, values, {
                headers: {
                    Authorization: dataToken
                }
            })
                .then((res) => {
                    Data();
                    seteditId(null)
                    setInitialValues({ initialValues })
                    handleClose()
                })
                .catch((error) => {
                    console.log(error);

                })
        }
        else {
            axios.post('https://backend-interview-test-6hzp.onrender.com/course/create', values, {
                headers: {
                    Authorization: dataToken
                }
            }).then(() => {
                console.log(values);
                resetForm();
                handleClose();
            })
                .catch((error) => {
                    console.log(error);

                })
        }

    };
    const updatedata = (row) => {
        setInitialValues({ initialValues })
        seteditId(row._id)
        setOpen(true)
    }
    const handleDelete = (id) => {
        axios
            .delete('https://backend-interview-test-6hzp.onrender.com/course/' + id, {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                padding: '6px',
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
                        Create Course
                    </Button>

                    <Dialog
                        open={open}
                        // TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"Add Course"}</DialogTitle >
                        <Divider />
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <DialogContent>

                                    <Box
                                        sx={{
                                            '& > :not(style)': { width: '40ch' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Field as={TextField} id="outlined-basic" label="Courses name" name='course' className='black_color' variant="outlined" />
                                    </Box>
                                </DialogContent>
                                <DialogActions sx={{ justifyContent: 'start', padding: '0px 20px 20px 20px' }}>
                                    <Button type='submit' sx={{ background: '#242424', color: 'white', '&:hover': { backgroundColor: '#242424' }, }}><AddIcon /> Add Course</Button>
                                </DialogActions>
                            </Form>
                        </Formik>
                    </Dialog>

                </React.Fragment>
            </Box >
            <Box sx={{ marginTop: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow sx={{ background: '#242424' }}>
                                <TableCell sx={{ color: 'white' }} align="left">NO</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">COURSES NAME</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">EDIT</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">DELETE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {course.map((row, index) => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">{row.course}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete" onClick={() => updatedata(row)}>
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
        </Drawerspage >
    )
}

export default Courses


