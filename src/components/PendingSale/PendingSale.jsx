import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const PendingSale = ({open, handleClose, handleContinue}) => (
    <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"¿Desea continuar con su compra?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Detectamos que en su última visita colocó productos en el carro y no los compró. ¿Desea continuar con esta última compra?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={handleContinue} color="primary" autoFocus>
                    Si
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);

export default PendingSale;