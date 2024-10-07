import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Stack , IconButton, InputAdornment} from '@mui/material';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { Field, Form, Formik, useFormik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Loginpage = () => {
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const [initialValues, setinitialValues] = useState({
        email: '',
        password: ''
    })


    const handleSubmit = async (values) => {
        console.log(values.email);
        console.log(values.password);
        try {
            const response = await axios.post('https://backend-interview-test-6hzp.onrender.com/admin/login', values,);
            const token = response.data.token;
            console.log("Token:", token);
            localStorage.setItem('token', token);
            history.push('/dashboard');
        }
        catch (error) {
            console.error("Error ", error);
        }
    };

    return (
        <Box
            sx={{ display: 'flex', justifyContent: 'center', margin: '120px 0px' }}
        >
            <Box
                sx={{
                    '& > :not(style)': { m: 1, width: '35ch' },
                    padding: '25px',
                    border: '2px solid #242424',
                    borderRadius: '20px',
                    boxShadow: '#242424 0px 0px 5px'
                }}
                noValidate
                autoComplete="off"
            >
                <Formik
                    enableReinitialize
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    <Form>
                        <Box >
                            <h1
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                    margin: '0px',
                                    marginBottom: '20px',
                                    color: '#242424'
                                }}
                            >
                                Admin Panel
                            </h1>
                            <Field
                                as={TextField}
                                id="outlined-email-input"
                                label="Email"
                                variant="outlined"
                                type="email"
                                name='email'
                                className='black_color'
                                sx={{ marginBottom: '15px', width: '300px' }}
                            />
                            <Field
                                as={TextField}
                                id="outlined-password-input"
                                label="Password"
                                variant="outlined"
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                className='black_color'
                                sx={{ marginBottom: '10px', width: '300px' }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Box
                                sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <Stack
                                    spacing={2}
                                    direction={"row"}
                                >
                                    <Button
                                        variant='contained'
                                        type="submit"
                                        sx={{ background: '#242424', '&:hover': { background: 'black' }, }}
                                    >
                                        SUBMIT
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Form>
                </Formik>
            </Box>
        </Box>
    );
}

export default Loginpage
