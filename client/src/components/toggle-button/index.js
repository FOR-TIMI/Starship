import React, { useState } from 'react';
import { Button, TableCell } from '@mui/material';
// import { useMutation } from '@apollo/client';
// import { addFollowing, removeFollowing } from '../utils/mutations'

function handleFollowToggle (data) {
    console.log(data)
    console.log(data._id)
    console.log(data.username)
    // const [addFollowing] = useMutation(ADD_FOLLOWING)
    // const [removeFollowing] = useMutation(REMOVE_FOLLOWING)


    /*

    

    const addToArray = async() => {
        try {
            await addFollowing({
                variables: { id: data.user._id}
            })
        } catch (e) {
            console.error(e)
        }
    } 

    const pullFromArray = async() => {
        try {
            await removeFollowing({
                variables: { id: data.user._id}
            })
        } catch (e) {
            console.error(e)
        }
    }

    if (isFollowing) {
        addToArray()
    } else {
        pullFromArray()
    }
    */
    
}

export default function FollowButton (props) {
    const [isToggled, setIsToggled] = useState(false);

    const { user } = props

    //add code to setIsToggled  to True if 'user._id' is in [following]

    return (
        <TableCell align="left">
            <Button onClick={(event)=>{
                setIsToggled(!isToggled)
                handleFollowToggle (user)
            }}>
                {isToggled === false? 'Follow' : 'Unfollow'}
            </Button>
        </TableCell>
    )
}

