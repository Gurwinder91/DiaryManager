import React from 'react';
import { IconButton, Menu, Fade, Typography, MenuItem, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    vertIcon: {
        color: theme.palette.common.white,
    }
}))
export default (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (actionType) => {
        setAnchorEl(null);
        if (actionType)
            props.whenMenuClosed(actionType);
    };

    return (
        <div>
            <IconButton edge="end" aria-label="action" style={{ marginRight: 5, padding: 0 }}
                onClick={handleClick}>
                <MoreVertIcon fontSize="large" className={classes.vertIcon}/>
            </IconButton>
            <MyActionMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
        </div>
    );
}

function MyActionMenu(props) {

    return (
        <Menu
            anchorEl={props.anchorEl}
            keepMounted
            open={props.open}
            onClose={props.handleClose.bind(null, null)}
            TransitionComponent={Fade}
        >
            <MenuItem onClick={props.handleClose.bind(null, 'signout')}>
                <Typography variant="inherit">
                    Signout
                </Typography>
            </MenuItem>
        </Menu>
    )
}