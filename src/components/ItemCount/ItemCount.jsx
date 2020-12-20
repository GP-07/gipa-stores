import { Fab, Input } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import "./ItemCount.css";

const ItemCount = ({stock, initial, onAdd, onRemove}) => {
    const canBeAdded = () => {
        return stock > 0 && initial + 1 <= stock;
    }

    return (
        <>
            <form>
                <Fab disabled={initial - 1 < 0} size="small" color="primary" onClick={onRemove}>
                    <RemoveIcon />
                </Fab>
                <Input readOnly type="number" value={initial} inputProps={{style: { textAlign: 'center' }}} />
                <Fab disabled={!canBeAdded()} size="small" color="primary" onClick={onAdd}>
                    <AddIcon />
                </Fab>
            </form>
        </>
    )
}

export default ItemCount;