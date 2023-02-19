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
import React, { useState } from "react";
import { display } from "@mui/system";
import { Paper, Step, StepLabel, Stepper, useTheme } from "@mui/material";
import { userAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import { borders } from '@mui/system';
import { useDispatch, useSelector } from "react-redux";
import {updateAddress } from '../features/checkout-slice'

export default function AddressForm() {

    const address=useSelector(state=>state.checkout?.address);
    const dispatch=useDispatch();
    function handleUpdateAddress(event){
        const {name ,value} =event.target;
        dispatch(updateAddress({[name]:value}))
    }

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Shipping Addres
            </Typography>
            <Box component='form' onChange={handleUpdateAddress}>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField required id='firstName' name='firstName' label='First Name'
                            variant="standard"
                            fullWidth
                            autoComplete="given-name"
                            defaultValue={address.firstName?? ""}></TextField>

                        <TextField required id='LastName' name='LastName' label='Last Name'
                            variant="standard"
                            fullWidth
                            autoComplete="given-name"
                            defaultValue={address.LastName?? ""}>

                        </TextField>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField required id='address1' name='address1' label='address line 1'
                            variant="standard"
                            fullWidth
                            autoComplete="shipping address-line1"
                            defaultValue={address.address1?? ""}></TextField>

                        
                    </Grid>
                    <Grid item xs={12} >
                        <TextField required id='address2' name='address2' label='address line 2'
                            variant="standard"
                            fullWidth
                            autoComplete="shipping address-line2"
                            defaultValue={address.address2?? ""}></TextField>
                    </Grid>

                    <Grid item xs={12} >
                        <TextField required id='city' name='city' label='city'
                            variant="standard"
                            fullWidth
                            defaultValue={address.city?? ""}></TextField>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField required id='ZipCode' name='Zipcode' label='Zip Code/Postal COde'
                            variant="standard"
                            fullWidth
                            autoComplete="shipping address-line1"
                            defaultValue={address.Zipcode?? ""}></TextField>
                    </Grid>


                </Grid>
            </Box>
        </React.Fragment>
    )
}
