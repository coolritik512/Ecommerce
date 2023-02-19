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
import React, { useEffect, useState } from "react";
import { display } from "@mui/system";
import { Paper, Step, StepLabel, Stepper, useTheme } from "@mui/material";
import { userAuth } from "../firebase/Auth";
import { useNavigate } from "react-router-dom";
import { borders } from '@mui/system';
import AddressForm from "../component/AddressForm";
import PaymentForm from "../component/PaymentForm";
import ReviewForm from "../component/ReviewForm";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart-slice";
import { clearCheckoutInformation } from "../features/checkout-slice";


export default function Checkout() {

  const dispatch=useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Shipping Address", "Payment Details", "Review Order"];

  function handleNext() {
    setActiveStep(activeStep + 1);
  }
  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  function getStepContent(activeStep) {
    switch (activeStep) {
      case 0:
        return <AddressForm/>
      case 1:
        return <PaymentForm />
      case 2:
        return <ReviewForm/>
      default:
        return <h1>Some thing wrong please refesh</h1>
    }
  }

  useEffect(() => {
    if(activeStep === steps.length){
      dispatch(clearCart());
      dispatch(clearCheckoutInformation());
    }
  }, [activeStep])
  


  return (
    <Container component='section' maxWidth='lg' sx={{
      mb: 4,
    }}>

      <Paper variant="outline" sx={{
        my: { xs: 3, md: 4 }, p: { xs: 2, md: 3 }
      }}>
        <Typography component='h1' variant="h4" align="center">

          Checkout

          <Stepper activeStep={activeStep} sx={{
            pt: 3,
            pb: 5

          }}>
            {steps.map((step) => {
              return <Step key='Step'>
                <StepLabel>{step}</StepLabel>
              </Step>
            })}
          </Stepper>
          {
            activeStep == steps.length ?
              (
                <> <Typography variant="h5" gutterBottom>THnaks for order</Typography>
                  <Typography> Your order number is #123453,we have emailed you deitals</Typography>
                </>
              ) :
              (
                <>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {
                      activeStep !== 0 &&
                      <Button variant="contained"
                        onClick={handleBack}
                        sx={{
                          mt:3,
                          ml:1,
                        }}
                      >
                        Back
                      </Button>}

                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        mt:3,
                        ml:1,
                      }}
                    > {activeStep == steps.length - 1 ? 'Place order' : 'Next'}</Button>
                  </Box>
                </>

              )

          }
        </Typography>

      </Paper>

    </Container>
  )
}
