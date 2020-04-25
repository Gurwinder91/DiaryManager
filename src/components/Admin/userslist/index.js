import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Switch} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

export default ({users, disableUser}) => {
    return (
        users.map(user =>
            <ListItem key={user.uid} >
                <ListItemAvatar>
                    <Avatar>
                        <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                    secondary={user.email}
                />
                <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        onChange={disableUser.bind(null, {...user, disabled: !user.disabled})}
                        checked={user.disabled}
                        inputProps={{ 'aria-labelledby': 'active-inactive-user' }}
                    />
                </ListItemSecondaryAction>
            </ListItem >
        ))
};
