import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Switch} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonIcon from '@material-ui/icons/Person';

export default (props) => {
    return (
        props.users.map(user =>
            <ListItem key={user.uid} >
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.userName}
                    secondary={user.email}
                />
                <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        onChange={props.disableUser.bind(null, {...user, disabled: !user.disabled})}
                        checked={user.disabled}
                        inputProps={{ 'aria-labelledby': 'active-inactive-user' }}
                    />
                </ListItemSecondaryAction>
            </ListItem >
        ))
};
