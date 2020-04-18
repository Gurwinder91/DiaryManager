import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';

const UserList = (props) => {
    return (
        props.users.map(user =>
            <ListItem key={user.uid} >
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.username}
                    secondary={user.email}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={props.deleteUser.bind(null, user)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem >
        ))
};

export default UserList;