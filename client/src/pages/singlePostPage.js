import React from 'react'
import PostModal from 'src/components/postModal'

function singlePostPage({modalOpen, setModalOpen, currentPostId }) {

  


  return (
    <PostModal
        open={modalOpen}
        setOpen={setModalOpen}
    />
  )
}

export default singlePostPage