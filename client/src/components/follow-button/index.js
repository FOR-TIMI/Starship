import React, { useState, useReducer } from 'react';
import { Button, TableCell } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOWING } from '../../utils/mutations';



export default function FollowButton (props) {
    const [addFollowing, {error}] = useMutation(ADD_FOLLOWING)
    

    const {user} = props



    const handleFollow = async (user, event) => {
        //const token = Auth.loggedIn()? Auth.getToken() : null;
        
        console.log(user)
        console.log(user._id)
        const followingId = user._id

        //if (!token) {
        //     return false
        // }
        try {
                    await addFollowing({
                        variables: { followingId }
                    })
                } catch (err) {
                    console.error(err)
                }
        window.location.reload()
        
        
    }

    return (
        <TableCell align="left">
            <Button  sx={{ width: 75 }} onClick={(event)=>{
                handleFollow(user, event);
            }}>
                Follow
            </Button>
        </TableCell>
    )
}

