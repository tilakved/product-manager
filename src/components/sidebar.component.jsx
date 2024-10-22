import { Inventory } from "@mui/icons-material"
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"


function Sidebar() {

    return (

        <>
           <List sx={{borderRight:'1px solid #ebebeb',height:'100%'}}>
                <ListItemButton selected>
                    <ListItemIcon><Inventory/></ListItemIcon>
                    <ListItemText primary="Products" />
                </ListItemButton>
           </List>
        </>
    )
}

export default Sidebar
