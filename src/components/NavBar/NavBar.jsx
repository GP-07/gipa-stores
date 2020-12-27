import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, List } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import CartWidget from '../CartWidget/CartWidget';
import NavBarItem from '../NavBarItem/NavBarItem';

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
    linkBrand: {
        color: `white`,
        textDecoration: `none`
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    }
}));

function NavBar() {
    const classes = useStyles();

    const categories = [
        {
            id: 1,
            url: "/category/1",
            text: "Cocina"
        },
        {
            id: 2,
            url: "/category/2",
            text: "Living/Comedor"
        },
        {
            id: 3,
            url: "/category/3",
            text: "Habitación"
        },
        {
            id: 4,
            url: "/category/4",
            text: "Baño"
        },
    ];

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <LocalMallIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/" className={classes.linkBrand}>GIPA-STORES - Equipamientos para el hogar</Link>
                    </Typography>
                    <List 
                        component="nav" 
                        aria-labelledby="main navigation"
                        className={classes.navDisplayFlex}
                    >
                        {
                            categories.map(category => (
                                <NavBarItem key={category.id} url={category.url} text={category.text} />
                            ))
                        }
                        <CartWidget />
                    </List>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;