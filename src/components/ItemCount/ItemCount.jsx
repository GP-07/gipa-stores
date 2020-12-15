import { Fab, Input } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import "./ItemCount.css";

const ItemCount = ({stock, initial, onAdd, onRemove}) => {
    const plusOne = () => {
        if (stock > 0 && initial + 1 <= stock) {
            onAdd();
        }
    }

    const minusOne = () => {
        if (initial - 1 >= 0) {
            onRemove();
        }
    }

    return (
        <>
            <form>
                <Fab size="small" color="primary" onClick={minusOne}>
                    <RemoveIcon />
                </Fab>
                <Input type="number" value={initial} />
                <Fab size="small" color="primary" onClick={plusOne}>
                    <AddIcon />
                </Fab>
            </form>
        </>
    )
}

export default ItemCount;