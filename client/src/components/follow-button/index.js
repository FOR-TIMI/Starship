import React from 'react';
import { Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_FOLLOWING } from '../../utils/mutations';

export default function FollowButton (props) {
    
    const [addFollowing, {error}] = useMutation(ADD_FOLLOWING)
    const {styleProps, user} = props
    
    const handleFollow = async (user, event) => {
        
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
        
        <Button  sx={styleProps} onClick={(event)=>{
            handleFollow(user, event);
        }}>
            Follow
        </Button>
        
    )
}

