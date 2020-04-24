import React from 'react';
import { IconButton, Menu, MenuItem, Fade, ListItemIcon, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default (props) => {
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
                { props.icon ? props.icon : <MoreVertIcon fontSize="large" /> }
            </IconButton>
            <MyActionMenu open={open} anchorEl={anchorEl} handleClose={handleClose} />
        </div>
    );

}

const useStyles = makeStyles({
    root: {

    }
})

function MyActionMenu(props) {
    const classes = useStyles();

    return (
        <Menu
            anchorEl={props.anchorEl}
            keepMounted
            open={props.open}
            onClose={props.handleClose.bind(null, null)}
            TransitionComponent={Fade}
        >
            <MenuItem onClick={props.handleClose.bind(null, 'edit')}>
                <ListItemIcon className={classes.root}>
                    <EditIcon />
                </ListItemIcon>
                <Typography variant="inherit">
                    Edit
                </Typography>

            </MenuItem>
            <MenuItem onClick={props.handleClose.bind(null, 'delete')}>
                <ListItemIcon className={classes.root}>
                    <DeleteIcon />
                </ListItemIcon>
                <Typography variant="inherit">
                    Delete
                </Typography>
            </MenuItem>
        </Menu>
    )
}