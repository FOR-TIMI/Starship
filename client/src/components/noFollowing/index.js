import React from 'react';
import { 
    TableRow,
    Paper,
    TableCell,
    Typography
} from '@mui/material';

export default function NoFollowings () {
    return(
        <TableRow>
            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
            <Paper
                sx={{
                textAlign: 'center',
                }}
            >
                <Typography variant="body2">
                    You are not following anyone yet.
                </Typography>
            </Paper>
            </TableCell>
        </TableRow>
    ) 
}