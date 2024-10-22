import { useState, useEffect } from 'react';
import { productsApi } from '../services/products.api';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import useLoader from "../hooks/useLoader"

function ProductLists() {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate()
    const { showLoader, hideLoader, LoaderComponent, isLoading } = useLoader(true);
    const [page, setPage] = useState(0)
    const columns = ['Product Id', 'Title', 'Category', 'Price', 'Discount (%)', 'Rating', 'Stock', 'Brand']
    useEffect(() => {
        getAllProducts()
    }, [page])

    const getAllProducts = async () => {
        showLoader()
        try {
            const response = await productsApi.getAllProducts(10, page * 10)
            setTableData(response.data)
        } catch (error) {
            return error;
        }
        finally {
            hideLoader()

        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <Paper sx={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack justifyContent={'flex-end'} direction={'row'} m={'0 20px 20px 0'}>
                    <Button sx={{ width: 'fit-content' }} variant='outlined' size="small" startIcon={<Add />} onClick={() => navigate('/add-products')}>
                        Add New Product
                    </Button>
                </Stack>
                <Stack >
                    <TableContainer >
                        <Table stickyHeader sx={{ minHeight: innerHeight - 1e2 - 5e1, }}>
                            <TableHead>
                                <TableRow >
                                    {columns.map((column, idx) => (
                                        <TableCell
                                            key={idx}
                                        >
                                            {column}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody >
                                {tableData.products?.map((row) => (
                                    <TableRow hover key={row.id} onClick={() => navigate(`/product-details/${row.id}`, { replace: true })}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell>{row.price}</TableCell>
                                        <TableCell>{row.discountPercentage}%</TableCell>
                                        <TableCell>{row.rating}</TableCell>
                                        <TableCell>{row.stock}</TableCell>
                                        <TableCell>{row.brand}</TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            rowsPerPage={10}
                            page={page}
                            onPageChange={handleChangePage}
                            component="div"
                            count={tableData?.total ?? 0}
                        >
                        </TablePagination>
                    </TableContainer>
                </Stack>
            </Paper>
            {isLoading &&
                <LoaderComponent />}
        </>
    )
}

export default ProductLists
