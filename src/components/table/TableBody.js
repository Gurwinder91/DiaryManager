
import React from 'react';

const TableBody = (props) => {
    return props.users.map(user =>
        <tr key={user.id} className="data-row" onClick={props.rowclicked.bind(null, user)}>
            <td className="data-cell">
                {user.id}
            </td>
            <td className="data-cell">
                {user.email}
            </td>
            <td className="data-cell">
                {user.first_name}
            </td>
            <td className="data-cell">
                {user.last_name}
            </td>
            <td className="data-cell">
                {user.avatar}
            </td>
        </tr>
    );
}

export default TableBody;