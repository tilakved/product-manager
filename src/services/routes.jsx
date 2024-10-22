import { createBrowserRouter, Navigate } from "react-router-dom";
import ProductLists from "../components/productList.component";
import ProductDetails from "../components/productDetails.component";
import App from "../pages/dashboard.page";
import AddProducts from "../components/addProduct.component";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Navigate to="product-lists" />,
            },
            {
                path: '/product-lists',
                element: <ProductLists />,
            }
        ]
    },
    {
        path: '/product-details/:id',
        element: <ProductDetails />
    },
    {
        path: '/add-products',
        element: <AddProducts />
    },
])

