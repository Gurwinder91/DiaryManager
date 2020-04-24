import React from 'react';
import { ExpansionPanel, Typography, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import useStyles from './style';

export default ({ milkMath }) => {
    const classes = useStyles();
    return (
        <ExpansionPanel className={classes.root}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className={classes.total}>
                    <Typography component="h5" variant="h5" color="textSecondary">
                        TOTAL
                    </Typography>
                    <Typography component="h5" variant="h5">
                        -
                    </Typography>
                    <Typography component="h5" variant="h5" className={classes.green}>
                        {milkMath.total}L
                    </Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={classes.milkData}>
                    <div>
                        <Typography component="span" variant="subtitle1" color="textSecondary">
                            BM
                        </Typography>
                        <Typography component="h5" variant="h5" className={classes.orange}>
                            {milkMath.BMTotal}L
                        </Typography>
                    </div>
                    <div >
                        <Typography component="span" variant="subtitle1" color="textSecondary">
                            CM
                        </Typography>
                        <Typography component="h5" variant="h5" className={classes.purple}>
                            {milkMath.CMTotal}L
                        </Typography>
                    </div>
                    <div>
                        <Typography component="span" variant="subtitle1" color="textSecondary">
                            BCM
                        </Typography>
                        <Typography component="h5" variant="h5" className={classes.teal}>
                            {milkMath.BCMTotal}L
                        </Typography>
                    </div>
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        // <Card className={classes.root}>
        //     <CardContent className={classes.content}>
        //         <div className={classes.total}>
        //             <Typography component="h5" variant="h5" color="textSecondary">
        //                 TOTAL
        //             </Typography>
        //             <Typography component="h5" variant="h5">
        //                 -
        //             </Typography>
        //             <Typography component="h5" variant="h5" className={classes.green}>
        //                 {milkMath.total}L
        //             </Typography>
        //         </div>
        //         <div className={classes.milkData}>
        //             <div>
        //                 <Typography component="span" variant="subtitle1" color="textSecondary">
        //                     BM
        //                 </Typography>
        //                 <Typography component="h5" variant="h5" className={classes.orange}>
        //                     {milkMath.BMTotal}L
        //                 </Typography>
        //             </div>
        //             <div >
        //                 <Typography component="span" variant="subtitle1" color="textSecondary">
        //                     CM
        //                 </Typography>
        //                 <Typography component="h5" variant="h5" className={classes.purple}>
        //                     {milkMath.CMTotal}L
        //                 </Typography>
        //             </div>
        //             <div>
        //                 <Typography component="span" variant="subtitle1" color="textSecondary">
        //                     BCM
        //                 </Typography>
        //                 <Typography component="h5" variant="h5" className={classes.teal}>
        //                     {milkMath.BCMTotal}L
        //                 </Typography>
        //             </div>
        //         </div>
        //     </CardContent>
        // </Card>
    )
}