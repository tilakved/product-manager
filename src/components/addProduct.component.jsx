import { useState } from 'react';
import { Box, Button, TextField, InputLabel, Select, MenuItem, FormControl, InputAdornment, Stack, Typography, Rating } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { ArrowLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../services/products.api';
import useLoader from '../hooks/useLoader';

const AddProducts = () => {
    const navigate = useNavigate();
    const { showLoader, hideLoader, LoaderComponent, isLoading } = useLoader();
    const [productData, setProductData] = useState({
        title: '',
        category: '',
        price: '',
        discount: '',
        rating: 0,
        stock: '',
        brand: '',
        images: []
    });

    const categories = ['Electronics', 'Clothing', 'Home', 'Beauty']; // Example categories

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSliderChange = (e, newValue) => {
        setProductData(prevState => ({
            ...prevState,
            rating: newValue
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length <= 5) {
            setProductData(prevState => ({
                ...prevState,
                images: files
            }));
        } else {
            alert('You can only upload a maximum of 5 images.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formFormData = new FormData();
        Object.entries(productData).forEach(([key, value]) => { if (key != 'images') { formFormData.append(key, value) } })
        productData.images.forEach((file) => {
            formFormData.append('images[]', file)
        });
        sendData(formFormData)
    };

    const sendData = async (formFormData) => {
        showLoader()
        try {
            const response = await productsApi.addProduct(formFormData)
            if (response.status == '201') {
                setProductData({
                    title: '',
                    category: '',
                    price: '',
                    discount: '',
                    rating: 0,
                    stock: '',
                    brand: '',
                    images: []
                })
                // navigate(-1) 
            }
        } catch (error) {
            console.log(error);
        } finally {
            hideLoader()
        }
    }

    return (
        <>
            <Stack sx={{ padding: "0 160px" }}>
                <Box>
                    <Button size="small" startIcon={<ArrowLeft />} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </Box>
                <Typography variant="h5" gutterBottom mt={4}>
                    Add New Product
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', margin: 'auto' }}>
                    <TextField
                        label="Title"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <FormControl fullWidth>
                        <InputLabel id={'category'}>Category</InputLabel>
                        <Select
                            labelId='category'
                            id='category'
                            label='category'
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            required
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Discount (%)"
                        name="discount"
                        value={productData.discount}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                    />

                    <Box>
                        <InputLabel>Rating</InputLabel>
                        <Stack direction={"row"} alignItems={'center'} gap={0.5}>
                            <Typography variant='overline' mt={0.5} sx={{ width: '3ch' }}>{productData.rating}</Typography>

                            <Rating
                                value={productData.rating}
                                onChange={handleSliderChange}
                                name="rating"
                                min={1}
                                max={5}
                                precision={0.1}
                            />
                        </Stack>
                    </Box>

                    <TextField
                        label="Stock"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        type="number"
                        required
                        fullWidth
                    />

                    <TextField
                        label="Brand"
                        name="brand"
                        value={productData.brand}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadIcon />}
                    >
                        Upload Images (Max 5)
                        <input
                            type="file"
                            hidden
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </Button>

                    {productData.images.length > 0 && (
                        <Box>
                            <InputLabel>Selected Images:</InputLabel>
                            {productData.images.map((image, index) => (
                                <p key={index}>{image.name}</p>
                            ))}
                        </Box>
                    )}

                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </Stack>
            {isLoading &&
                <LoaderComponent />}
        </>
    );
};

export default AddProducts;

