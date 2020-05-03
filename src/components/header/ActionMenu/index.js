import React from 'react';
import { Menu, Fade, Typography, MenuItem, makeStyles, Avatar } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.error.contrastText,
        cursor: 'pointer',
    }
}))
const ActionMenu = (props) => {
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
            <Avatar className={classes.avatar} onClick={handleClick}>{props.profile.initials}</Avatar>
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
            <MenuItem onClick={props.handleClose.bind(null, 'updatePassword')}>
                <Typography variant="inherit">
                    Update Password
                </Typography>
            </MenuItem>
            <MenuItem onClick={props.handleClose.bind(null, 'settings')}>
                <Typography variant="inherit">
                    Settings
                </Typography>
            </MenuItem>
            <MenuItem onClick={props.handleClose.bind(null, 'signout')}>
                <Typography variant="inherit">
                    Logout
                </Typography>
            </MenuItem>
        </Menu>
    )
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile,
});

export default connect(mapStateToProps)(ActionMenu);