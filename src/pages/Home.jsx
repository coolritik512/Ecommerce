console.log('home file start')
import { useTheme } from '@emotion/react';
import { ShoppingCartSharp } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Rating, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToCart } from '../features/cart-slice';
import { fetchAllProducts } from '../features/products-slice';

export default function Home() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const searchTerm = searchParams.get('searchterm');

    const theme = useTheme();
    let state = useSelector(state => state.products);
    const { loading, value: products } = state ?? {};

    const dispatch = useDispatch();


    useEffect(() => {
        if (!products?.length) 
        {
            dispatch(fetchAllProducts());
        }
    }, []);



    function addProductToCart(product) {
        dispatch(addToCart({ product, quantity: 1 }));
    }


    let filteredProduct = (category && category !== 'all') ? products.filter(prod => prod.category === category) : products;

    filteredProduct = searchTerm ? filteredProduct.filter((prod) => { return prod.title.toLowerCase().includes(searchTerm.toLowerCase()) }) : filteredProduct;

    return (
        <React.Fragment>

            <Container sx={{ py: 8 }} maxWidth='lg'>
                <Grid container spacing={4}>
                    {
                        filteredProduct.map((product) => {
                            const { title, description, id, image, rating, price } = product;
                            return (
                                <Grid item key={id} xs={12} sm={6} md={3}>
                                    <Card sx={{ height: '100%', distplay: 'flex', flexDirection: 'column' }}>
                                        <CardMedia component='img'
                                            image={image} alt={title}
                                            sx={{ alignSelf: 'center', width: theme.spacing(30), height: theme.spacing(30), objectFit: 'contain' }}></CardMedia>
                                        <CardContent>
                                            <Typography variant='h5' component='h2' gutterBottom sx={{
                                                overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
                                                WebkitLineClamp: '2',
                                                WebkitBoxOrient: "vertical"
                                            }} >
                                                {title}
                                            </Typography>
                                            <Typography paragraph color='text.secondary'
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: '2',
                                                    WebkitBoxOrient: "vertical"
                                                }}  >
                                                {description}
                                            </Typography>
                                            <Typography fontSize='large' paragraph  >
                                                {price}
                                            </Typography>
                                            <Rating readOnly precision={0.5} value={rating.rate}></Rating>

                                        </CardContent>
                                        <CardActions sx={{
                                            alignSelf: 'center',
                                        }}>
                                            <Button variant='contained' onClick={() => addProductToCart({ title, description, id, image, rating, price })}>
                                                <ShoppingCartSharp />
                                                Add to Cart
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>

        </React.Fragment>
    )
}

console.log('home file end')
