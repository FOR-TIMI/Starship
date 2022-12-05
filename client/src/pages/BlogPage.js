import { Helmet } from 'react-helmet-async';
// @apollo client
import { useQuery} from '@apollo/client';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
// import POSTS from '../_mock/blog';

import React, { useState } from 'react';

import  {QUERY_POSTS } from '../utils/queries';

//Import post modal
import SinglePost from './SinglePost';

//Import New Post Modal
import NewPostModal from '../components/new-post-modal'

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {

  const { loading,data } = useQuery(QUERY_POSTS);
  const POSTS = data?.posts || [];

  
  //To Keep track of post modal
  const [singlePostModalOpen, setSinglePostModalOpen] = useState(false);
 
  //keep track of New post Modal
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);



  //To keep track of the current post selected
  const [currentPostId, setCurrentPostId] = useState();

  const toggleNewPostModal = () => {
     setNewPostModalOpen(!newPostModalOpen)
  }
  
  const toggleSinglePostModal = (_id) => {
    setCurrentPostId(_id);
    setSinglePostModalOpen(!singlePostModalOpen)
  }


  return (
    <>
      <Helmet>
        <title> Tavern </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Tavern
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={toggleNewPostModal}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>


        <Grid container spacing={3}>
          {/* posts  */}
          {(loading ? Array.from(new Array(10)) : POSTS).map((post,index) => (
            <BlogPostCard 
                key={post ? post._id : index} 
                post={post} 
                index={index} 
                modalToggle={toggleSinglePostModal}
                loading={loading}
              />  
          ) 
          )}


           {/*New Post Modal */}
           { newPostModalOpen && (
              <NewPostModal
                open={newPostModalOpen}
                setOpen={setNewPostModalOpen}
              />
          )}

     
          {/*Single Post Modal */}
          {singlePostModalOpen && (
          <SinglePost
             modalOpen={singlePostModalOpen}
             setModalOpen={setSinglePostModalOpen}
             currentPostId={currentPostId}
           />
          )}

          
        </Grid>
      </Container>
    </>
  );
}
