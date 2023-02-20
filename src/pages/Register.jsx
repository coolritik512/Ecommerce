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
import { useNavigate } from "react-router-dom";
import { borders } from '@mui/system';

export default function Register() {
    const theme = useTheme();
    const navigate = useNavigate();

    const { signUp } = userAuth();
    async function register(event) {
        event.preventDefault();
        const { email, name, password } = event.target;
        await signUp(email,password,name);
        navigate('/login');
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
                    m: 1,
                    backgroundColor: theme.palette.secondary.main,
                }}>
                    <LockOutlinedIcon></LockOutlinedIcon>
                </Avatar>

                <Typography component={'h1'} variant='h5'>
                    Sign Up
                </Typography>

                <form onSubmit={register} sx={{
                    width: '100%',
                    mt: 1,
                }}>
                    <TextField
                        variant='outlined' margin="normal" required fullWidth id='name' autoFocus
                        name='name'
                        label='Name'
                        type='text'
                    ></TextField>
                    <TextField

                        variant='outlined' margin="normal" required fullWidth id='email' autoFocus
                        name='email'
                        label='Email'
                        type='email'
                    >

                    </TextField>
                    <TextField variant='outlined' margin="normal" required fullWidth id='password'
                        label='Password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                    >
                    </TextField>

                    <Button type="submit" variant="contained" fullWidth color='primary' sx={{
                        margin: theme.spacing(0),
                    }}>
                        Sign Up
                    </Button>

                    <Grid container justifyContent={'flex-end'} mt={2}>
                        <Grid item>
                            <NavLink variant="body2" to="/login">Already have an account ? Sign In</NavLink>
                        </Grid>

                    </Grid>

                </form>

            </Box>
        </Container>

    )
}
