

import React, { useState } from 'react';

// post modal
import PostModal from '../components/post-modal'

// @apollo client
import { useQuery} from '@apollo/client';

//graphql queries
import  {QUERY_POST } from '../utils/queries';



function SinglePost({modalOpen, setModalOpen, currentPostId }) {

  const { loading,data } = useQuery(QUERY_POST, {
    variables:{ id: currentPostId }
  });

  const POST = data?.post || [];
  
  return (
    <PostModal
        open={modalOpen}
        setOpen={setModalOpen}
        post={POST}
        loading={loading}
    />
  )
}

export default SinglePost