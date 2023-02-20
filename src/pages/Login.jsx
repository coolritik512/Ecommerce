console.log('Loign file s')

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container";
import React from "react";
import { display } from "@mui/system";
import { useTheme } from "@mui/material";
import { userAuth } from "../firebase/Auth";
import { NavLink, useNavigate } from "react-router-dom";
import { borders } from '@mui/system';


export default function Login() {
    console.log('login render s')

    const theme = useTheme();
    const navigate = useNavigate();

    const { signIn } = userAuth();


    async function login(event) {
        event.preventDefault();
        console.log(event);
        const { email , password } = event.target;

        console.log(email.value+":"+password.value);
        const user = await signIn(email.value, password.value);
        navigate('/')
    }

    return (
        <Container component={'main'} maxWidth="xs">
            <CssBaseline></CssBaseline>

            <Box
                sx={{
                    mt: theme.spacing(8),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Avatar sx={{
                    m:1,
                    backgroundColor: theme.palette.secondary.main,
                }}>
                    <LockOutlinedIcon></LockOutlinedIcon>
                </Avatar>

                <Typography component={'h1'} variant='h5'>
                    Sign in
                </Typography>

                <form onSubmit={login} sx={{
                    width: '100%',
                    mt: 1,
                }}>
                    <TextField
                        
                        variant='outlined' margin="normal" required fullWidth id='email' autoFocus
                        name='email'
                        label='email'
                        type='email'
                    >

                    </TextField>
                    <TextField variant='outlined' margin="normal" required fullWidth id='password' autoFocus
                        label='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                    >
                    </TextField>

                    <Button type="submit" variant="contained" fullWidth color='primary' sx={{
                        margin: theme.spacing(0),
                    }}>
                        Sign In
                    </Button>

                    <Grid container justifyContent={'flex-end'} mt={2}>
                        <Grid item>
                            <NavLink variant="body2" to='/register' >New User ? Sign Up</NavLink>
                        </Grid>

                    </Grid>

                </form>

            </Box>
            {
                    console.log('login render s')
            }
        </Container>
    )
}

console.log('Loign file e')

