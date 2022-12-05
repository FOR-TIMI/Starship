import React  from 'react';
import {Button, TableCell} from '@mui/material'
import {  useMutation } from '@apollo/client'
import { REMOVE_FOLLOWING } from '../../utils/mutations'

export default function UnfollowButton (props) {
    
    const [removeFollowing, {error}] = useMutation(REMOVE_FOLLOWING)
    const {styleProps, user, handleToggle} = props
 
    const handleUnfollow = async (user, event) => {
        const followingId = user._id
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
        
            <Button sx={styleProps} onClick={(event)=>{
                handleUnfollow(user, event)
            }}>
                Unfollow
            </Button>
        
    )
}