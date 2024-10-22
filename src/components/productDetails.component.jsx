import { useState, useEffect } from "react"
import { productsApi } from "../services/products.api"
import { Box, Button, Card, CardContent, Grid2, Rating, Stack, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "@mui/icons-material"
import useLoader from "../hooks/useLoader"


function ProductDetails() {
    const [product, setProduct] = useState({})
    const { showLoader, hideLoader, LoaderComponent, isLoading } = useLoader(true);

    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(0);
    useEffect(() => {
        getProductsDetails()
    }, [])

    const getProductsDetails = async () => {
        showLoader()
        try {
            const response = await productsApi.getProductDetails(Number(id))
            console.log('response.data', response.data)
            setProduct(response.data)
        } catch (error) {
            return error;
        } finally {
            hideLoader()
        }
    }

    return (

        <>
            <Grid2 container sx={{ height: '100vh', padding: "0 160px" }} justifyContent={'center'} alignItems={'center'}>
                <Grid2 size={{ xs: 6 }}>
                    <Button size="small" startIcon={<ArrowLeft />} onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <Stack justifyContent={"center"} alignItems={"center"}>
                        <Box sx={{ maxWidth: 500, height: 500 }}>
                            <img style={{ objectFit: "contain", height: "100%", width: "100%" }} src={product?.images?.[selectedImage]} alt="Not loaded" />
                        </Box>
                        <Stack direction={"row"} gap={2}>
                            {product?.images?.map((img, indx) =>
                                <Box key={indx} sx={{ maxWidth: 50, cursor: "pointer" }} onMouseOver={() => setSelectedImage(indx)}>
                                    <img style={{ objectFit: "contain", height: 'auto', width: "100%" }} src={img} key={indx} />
                                </Box>
                            )}
                        </Stack>
                    </Stack>
                </Grid2>
                <Grid2 size={{ xs: 6 }}>
                    <Typography variant="h4" gutterBottom>
                        {product?.title}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {product?.description}
                    </Typography>
                    <Typography variant="overline" gutterBottom>
                        {product?.brand} - {product?.category}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Total
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        ${product?.price}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                        Discount Percentage available
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        {product?.discountPercentage}%
                    </Typography>
                    <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                        <Typography variant="caption1" mt={0.5} sx={{ fontWeight: 600 }}>Stock : </Typography>
                        <Typography variant="caption1" mt={0.5}>{product?.stock}</Typography>
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                        <Typography variant="caption1" mt={0.5}>{product?.rating}</Typography>
                        <Rating name="half-rating-read" precision={0.1} value={Number(product?.rating)} readOnly />
                    </Stack>
                    <Stack>
                        <Typography variant="h5" gutterBottom mt={4}>
                            Reviews
                        </Typography>
                        <Stack direction={"row"} gap={2} overflow={"auto"}>
                            {product?.reviews?.map((review, index) =>
                                <Card sx={{ minWidth: 275 }} key={index}>
                                    <CardContent>
                                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                            {review?.reviewerEmail}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {review?.reviewerName}
                                        </Typography>
                                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                            <Rating name="half-rating-read" precision={0.1} value={Number(review?.rating)} readOnly />
                                        </Typography>
                                        <Typography variant="body1">
                                            {review?.comment}
                                        </Typography>
                                    </CardContent>

                                    {/* <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}
                                </Card>
                            )}
                        </Stack>

                    </Stack>
                </Grid2>
            </Grid2>
            {
                isLoading &&
                <LoaderComponent />
            }

        </>
    )
}

export default ProductDetails
