import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    }
}));

const NavBarItem = ({url, text}) => {
    const classes = useStyles();

    return (
            <ListItem button>
                <ListItemText>
                    <NavLink to={url} className={classes.linkText}>{text}</NavLink>
                </ListItemText>
            </ListItem>
    )
}

export default NavBarItem;