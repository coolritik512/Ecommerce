console.log('cart file start')


import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, CardMedia, Rating, TextField, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { getSubtotal } from '../utils';
import { addToCart, removeFromCart } from '../features/cart-slice';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const theme = useTheme();
  const navigate = useNavigate()


  const dispatch=useDispatch();
  const cart = useSelector(state => state.cart?.value);
  const subtotal = getSubtotal(cart).toFixed(2);

  function updateQuantity(e,{product,quantity}){    
    const updatedQuantity=e.target.valueAsNumber;

    if(updatedQuantity<quantity){
      // remove
      dispatch(removeFromCart({product}));
    }
    else{
      dispatch(addToCart({product,quantity}));
    }
  }

  function goToHome() {
    navigate('/');
  }

  function checkout(){
    navigate('/checkout')
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={2}>

        <Grid item container md={8} spacing={2}>

          {cart?.map(({ product, quantity }) => {

            const { title, id, price, description, rating, image } = product;

            return <Grid item key={id} xs={12}>
              <Card sx={{
                display: 'flex',
                py: 2,
              }}>
                <CardMedia component='img' image={image} sx={{
                  width: theme.spacing(30),
                  height: theme.spacing(30),
                  objectFit: 'contain',
                  pt: theme.spacing(),
                }}
                  alt={title}>
                </CardMedia>

                <CardContent sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flex: 1,
                }}>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}>

                    <Typography>{title}</Typography>
                    <Rating readOnly precision={0.5} value={rating.rate}></Rating>
                    <form >
                      <TextField label='Quantity'
                        value={quantity}
                        sx={{
                          width: theme.spacing(8),
                        }}
                        inputProps={{
                          min: 0,
                          max: 10,
                        }}
                        type='number'
                        id={`${id}-product-id`}
                        variant='standard'
                        onChange={(event)=>updateQuantity(event,{product,quantity})}
                      >

                      </TextField>
                    </form>
                  </Box>
                  <Box>
                    <Typography variant='h5'>
                      {getSubtotal([{ product, quantity }]).toFixed(2)}
                    </Typography>
                  </Box>

                </CardContent>
              </Card>
            </Grid>

          })}


        </Grid>

        <Grid item container md={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box sx={{
            width: '100%',
          }}>
            <Card sx={{
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
              <Typography variant='h4'>Subtotal</Typography>
              <Typography variant='h4'>{subtotal}</Typography>
              {
                subtotal > 0 ? <Button variant='contained' onClick={checkout}>Buy Now</Button> :
                  <Button variant='contained' onClick={goToHome}>Show products</Button>}
            </Card>
          </Box>
        </Grid>

      </Grid>
    </Container >

  )
}
console.log('cart file end')