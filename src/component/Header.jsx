console.log('header file s')

import { AppBar, Badge, Button, IconButton, alpha, styled, Toolbar, Typography, Autocomplete, TextField, Select, Menu } from '@mui/material'
import React, { useEffect, useState } from 'react'

import ShoppingCartSharp from '@mui/icons-material/ShoppingCartSharp'
import { Box } from '@mui/system';
import { getItemCount } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { fetchAllCategories } from '../features/categories-slice';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search'
import { userAuth } from '../firebase/Auth';

const Search = styled('section')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
}));


const StyleAutocomplete = styled(Autocomplete)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    "& .MuiTextField-root": {
        paddingRight: `calc(1em + ${theme.spacing(4)})`
    },
    "& .MuiInputBase-input": {
        color: theme.palette.common.white,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: 'none',
    },
    "& .MuiSvgIcon-root": {
        color: theme.palette.common.white
    }
}))

const SearchIconWrapper = styled('section')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    right: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

}));

function SearchBar() {

    const theme = useTheme();
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const searchTerm = searchParams.get('searchterm');

    const products = useSelector(state => state.products.value);
    const categories = useSelector(state => state.categories?.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedCategory, setselectedCategory] = useState('');

    if (!categories.length) {
        dispatch(fetchAllCategories());
    }

    useEffect(() => {
        setselectedCategory(category ? category : 'all');
        
    }, [category])


    function handleCategoryChange(event) {
        const { value } = event.target;
        console.log(value)
        navigate(value == 'all' ? '/' : `/?category=${value}${searchTerm ? '&searchterm=' + searchTerm : ""}`);

    }

    function handleSearchChange(searchText) {
        if (searchText) {
            navigate(selectedCategory === 'all' ? `?searchterm=${searchText}` : `?/category=${selectedCategory}&searcterm=${searchText}`)
        }
        else {
            navigate(selectedCategory === 'all' ? '/' :
                `/?category=${selectedCategory}`)

        }
    }

    return <Search>
        <Select size='small'
            value={selectedCategory}
            onChange={handleCategoryChange}
            sx={
                {
                    m: 1,
                    '&': {
                        "::before": {
                            ":hover": {
                                border: 'none',
                            },
                        },
                        "::before, &::after": {
                            border: 'none',
                        },
                        ".MuiSelect-standard": {
                            color: 'common.white',
                        },
                        ".MuiSelect-icon": {
                            fill: theme.palette.common.white,
                        }

                    },
                }
            }
        >
            <MenuItem value='all'>all</MenuItem>
            {
                categories?.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)
            }
        </Select>
        <StyleAutocomplete
            freeSolo
            id="selected-product"
            disablePortal
            onChange={(e, value) => handleSearchChange(value.label)}
            options={Array.from(selectedCategory != 'all' ? products.filter(prod => prod.category === selectedCategory) : products, (prod) => ({ id: prod.id, label: prod.title }))}
            renderInput={(params) => <TextField {...params} label="Search" />} />
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
    </Search>
}

export default function Header() {
    console.log('header render s');
    const { user,signOutUser } = userAuth();
    console.log('header : ');
    console.log(user);
    const cartItems = useSelector(state => state.cart?.value);
    const count = getItemCount(cartItems);
    const navigate = useNavigate();
    const [anchorEl, setanchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    function navigateToCart() {
        navigate('/cart');
    }
    function navigateToLogin(){
        navigate('/login');
    }

    function navigateToHome() {
        navigate('/');
    }
    function handleProfileMenuOpen(e) {
        setanchorEl(e.currentTarget);
    }
    function handleMenuClose() {
        setanchorEl(null);
    }
    async function logout(){
       await signOutUser();
       navigate('/login');
    }

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id='user-profile-menu'
            keepMounted transformOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
            }}
            anchorOrigin={{
                horizontal: 'right',
                vertical: 'bottom',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Log Out</MenuItem>
        </Menu>
    );

   
    return (
        <React.Fragment>

            <AppBar position='relative'>
                <Toolbar>
                    <Typography
                        onClick={navigateToHome}
                        variant='h6' color="inherit" sx={{

                            flexGrow: 1,
                        }}>
                        DoShop
                    </Typography>

                    <SearchBar />

                    <Box flexBasis={500} sx={{ display: { md: 'flex' } }}>
                        <IconButton onClick={navigateToCart} size='large' aria-label='shows cart items count' color='inherit'>
                            <Badge badgeContent={count} color='error'>
                                <ShoppingCartSharp></ShoppingCartSharp>
                            </Badge>
                        </IconButton>
                        {user ? <Button onClick={handleProfileMenuOpen} color='inherit'>Hello, {user?.displayName ?? user.email}</Button> : <Button color='inherit' onClick={navigateToLogin}>Login</Button>}

                    </Box>

                </Toolbar>

            </AppBar>
            {renderMenu}
            { console.log('header render e')}
        </React.Fragment>
    )
}

console.log('header file e')
