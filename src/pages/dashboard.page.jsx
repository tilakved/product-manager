import Grid2 from '@mui/material/Grid2';
import Sidebar from '../components/sidebar.component';
import { Outlet } from 'react-router-dom';

function App() {

    return (

        <>
            <Grid2 container sx={{ height: '100vh', overflow:'hidden' }}>
                <Grid2 size={{ xs: 3 }} >
                    <Sidebar />
                </Grid2>
                <Grid2 size={{ xs: 9 }} >
                    <Outlet />
                </Grid2>
            </Grid2>
        </>
    )
}

export default App
