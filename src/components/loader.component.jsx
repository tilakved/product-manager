import { CircularProgress, Dialog, DialogContent } from "@mui/material";
const Loader = () => {
    return (
        <Dialog
            open
            sx={{
                "& .MuiDialog-paper": {
                    background: "none",
                    boxShadow: "none",
                },
            }}
        >
            <DialogContent>
                <CircularProgress />
            </DialogContent>
        </Dialog>
    );
};
export default Loader;