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
import { updatePayment } from '../features/checkout-slice'

export default function PaymentForm() {

  const payment = useSelector(state => state.checkout?.payment);
  const dispatch = useDispatch();
  function handleChange(event) {
    const { name, value } = event.target;
    console.log(name +":"+value)

    dispatch(updatePayment({ [name]: value }))
  }

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Payment Method
      </Typography>
      <Box component='form' onChange={handleChange}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField name='name' id="name" variant="standard" required label="Name on card" fullWidth autoComplete="cc-name"
              defaultValue={payment?.name ?? ""}></TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField name='cardNumber' id="cardNumber" variant="standard" required label="Card Number" defaultValue={payment?.cardNumber ?? ""} fullWidth autoComplete="cc-name"></TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name='expDate' id="expDate" variant="standard" required label="Expiry Date" fullWidth autoComplete="cc-exp"
              defaultValue={payment?.expDate ?? ""}></TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type='password'
              name='cvv' id="cvv" variant="standard" required label="cvv no" fullWidth autoComplete="cc-exp"
              defaultValue={payment?.password ?? ""}></TextField>
          </Grid>
        </Grid>
      </Box>
    </>

  )
}
