import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import CartWidget from '../CartWidget/CartWidget';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    }
}));

function NavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <LocalMallIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        GIPA-STORES - Equipamientos para el hogar
                    </Typography>
                    <List 
                        component="nav" 
                        aria-labelledby="main navigation"
                        className={classes.navDisplayFlex}
                    >
                        <CartWidget />
                        <a href="#" key="Cocina" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="Cocina" />
                            </ListItem>
                        </a>
                        <a href="#" key="Living/Comedor" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="Living/Comedor" />
                            </ListItem>
                        </a>
                        <a href="#" key="Habitación" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="Habitación" />
                            </ListItem>
                        </a>
                        <a href="#" key="Baño" className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary="Baño" />
                            </ListItem>
                        </a>
                    </List>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;