import React  from 'react';
import {Button, TableCell} from '@mui/material'
import {  useMutation } from '@apollo/client'
import { REMOVE_FOLLOWING } from '../../utils/mutations'

export default function UnfollowButton (props) {
    
    const [removeFollowing, {error}] = useMutation(REMOVE_FOLLOWING)
    const {user, handleToggle} = props
 
    const handleUnfollow = async (user, event) => {
        //const token = Auth.loggedIn() ? Auth.getToken() : null;
        const followingId = user._id
        /* 
            if (!token) {
                return false
            }
        */
            try {
                await removeFollowing({
                    variables: { followingId }
                })

                handleToggle()
            } catch (err) {
                console.error(err)
            }        
    }

    return(
        <TableCell align="left">
            <Button sx={{ width: 75 }} onClick={(event)=>{
                handleUnfollow(user, event)
            }}>
                Unfollow
            </Button>
        </TableCell>
    )
}