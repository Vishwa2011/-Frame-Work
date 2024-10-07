import React, { useState } from 'react';
import Drawerspage from './Drawerspage';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Divider, Grid, IconButton, InputLabel, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form, Field } from 'formik';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Draggable from 'react-draggable';
import axios from 'axios';

const PaperComponent = (props) => {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
};
const Company = () => {

    const [info, setinfo] = React.useState(false);
    const theme = useTheme();
    // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [editid, seteditId] = useState(null)
    const [open, setOpen] = React.useState(false);


    const handleClickOpeninfo = (company) => {
        setSelectedCompany(company);
        setinfo(true);
    };

    const handleCloseinfo = () => {
        setinfo(false);
        setSelectedCompany(null);
    };

    const [initialValues, setInitialValues] = useState({
        company: '',
        contact: '',
        url: '',
        address: '',
        area: '',
        city: '',
        note: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [company, setcompany] = useState([]);
    const dataToken = localStorage.getItem('token');

    React.useEffect(() => {
        Data();
    }, [dataToken]);

    const Data = async () => {
        axios
            .get('https://backend-interview-test-6hzp.onrender.com/company/', {
                headers: { Authorization: dataToken },
            })
            .then((response) => {
                setcompany(response.data.data);

            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleSubmit = async (values, { resetForm }) => {
        if (editid != null) {
            axios.put('https://backend-interview-test-6hzp.onrender.com/company/' + editid, values, {
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
            console.log(values);
            axios.post('https://backend-interview-test-6hzp.onrender.com/company/create', values, {
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
    const handleDelete = (id) => {
        axios
            .delete('https://backend-interview-test-6hzp.onrender.com/company/' + id, {
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


    const area = [
        { value: 'katargam', label: "Katargam" },
        { value: 'adajan', label: 'Adajan' },
        { value: 'vesu', label: 'Vesu' },
    ];

    const city = [
        { value: 'surat', label: "Surat" },
        { value: 'ahamdabad', label: 'Ahamdabad' },
        { value: 'vadodra', label: 'Vadodra' },
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
                <Button variant="outlined" onClick={handleClickOpen} sx={{ width: '25%', color: 'black', borderColor: 'black', '&:hover': { borderColor: '#242424' }, }}>
                    Create Company
                </Button>
                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Add Company"}</DialogTitle>
                    <Divider />

                    <Formik
                        enableReinitialize
                        onSubmit={handleSubmit}
                        initialValues={initialValues}

                    >
                        <Form>
                            <DialogContent>
                                <Box
                                    sx={{

                                        '& .MuiTextField-root': { m: 1, width: '28ch' },
                                    }}
                                >
                                    <Field
                                        as={TextField}
                                        name="company"
                                        variant="outlined"
                                        className='black_color'
                                        fullWidth
                                        label='Company Name'
                                    />
                                    <Field
                                        as={TextField}
                                        name="contact"
                                        variant="outlined"
                                        type='tel'
                                        className='black_color'
                                        fullWidth
                                        label='Phone Number'
                                    />
                                    <Field
                                        as={TextField}
                                        name="url"
                                        variant="outlined"
                                        className='black_color'
                                        fullWidth
                                        label='URL link'
                                    />
                                    <Field
                                        as={TextField}
                                        name="address"
                                        variant="outlined"
                                        className='black_color'
                                        fullWidth
                                        label='Address Name'
                                    />
                                </Box>
                                {/*  */}
                                <Box sx={{
                                    display: 'flex'
                                }}>

                                    <Box sx={{ minWidth: 100, width: '95%', margin: '10px' }} className='black_color'>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Area</InputLabel>
                                            <Field
                                                as={Select}
                                                name="area"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Area"
                                                fullWidth
                                            >
                                                {area.map((option) => (
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
                                            <InputLabel id="demo-simple-select-city-label">City</InputLabel>
                                            <Field
                                                as={Select}
                                                name="city"
                                                labelId="demo-simple-select-city-label"
                                                id="demo-simple-select-city"
                                                label="City"
                                                fullWidth
                                            >
                                                {city.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Field>
                                        </FormControl>
                                    </Box>

                                </Box>


                                <Box
                                    sx={{
                                        '& .MuiTextField-root': { m: 1, width: '58ch' },
                                    }}
                                >
                                    <Field
                                        as={TextField}
                                        name="note"
                                        label='Description'
                                        variant="outlined"
                                        fullWidth
                                        className='black_color'
                                        multiline
                                        rows={4}
                                        placeholder="write company description here"
                                    />
                                </Box>
                            </DialogContent>

                            <DialogActions sx={{ justifyContent: 'start', padding: '0px 20px 20px 20px' }}>
                                <Button type="submit" sx={{ background: '#242424', color: 'white', '&:hover': { backgroundColor: '#242424' } }}>
                                    <AddIcon /> Add Company
                                </Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>
            </Box>
            <Box sx={{ marginTop: '20px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow sx={{ background: '#242424' }}>
                                <TableCell sx={{ color: 'white' }} align="left">NO</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">COMPANY NAME</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">CONTACT</TableCell>
                                <TableCell sx={{ color: 'white' }} align="left">AREA</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">EDIT</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">DELETE</TableCell>
                                <TableCell sx={{ color: 'white' }} align="center">INFO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {company.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="left">{row.company}</TableCell>
                                    <TableCell align="left">{row.contact}</TableCell>
                                    <TableCell align="left">{row.area}</TableCell>
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
                                    </TableCell >
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog
                    open={info}
                    onClose={handleCloseinfo}
                    aria-labelledby="responsive-dialog-title"
                    PaperComponent={PaperComponent}
                    sx={{
                        '& .MuiPaper-root': {
                            borderRadius: '16px',
                            padding: '16px',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                        },
                    }}
                >
                    <DialogTitle
                        style={{ cursor: 'move', backgroundColor: 'black', color: 'white', textAlign: 'center' }}
                        id="draggable-dialog-title"
                    >
                        ACTOSOFT
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        {selectedCompany ? (
                            <Grid container spacing={2} sx={{ marginTop: '0px' }}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold', borderBottom: '1px solid black' }}>
                                        Company Information:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Company Name:</strong> {selectedCompany.company}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Contact No:</strong> {selectedCompany.contact}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Link:</strong> <a href={selectedCompany.url}>{selectedCompany.url}</a>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Address:</strong> {selectedCompany.address}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>Area:</strong> {selectedCompany.area}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1">
                                        <strong>City:</strong> {selectedCompany.city}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" sx={{ marginTop: '10px' }}>
                                        <strong>Note:</strong> {selectedCompany.note}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ) : (
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                No company information available.
                            </Typography>
                        )}
                    </DialogContent>
                </Dialog>
            </Box>
        </Drawerspage>
    );
};

export default Company;


