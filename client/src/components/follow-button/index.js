import React from 'react';
import { Button, TableCell } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOWING } from '../../utils/mutations';

export default function FollowButton (props) {
    
    const [addFollowing, {error}] = useMutation(ADD_FOLLOWING)
    const {user} = props
    
    const HandleFollow = async (user, event) => {
        
        const followingId = user._id

        try {
            await addFollowing({
                variables: { followingId }
            })
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <TableCell align="left">
            <Button  sx={{ width: 75 }} onClick={(event)=>{
                HandleFollow(user, event);
            }}>
                Follow
            </Button>
        </TableCell>
    )
}

