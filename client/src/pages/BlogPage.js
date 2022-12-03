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

import  {QUERY_POSTS, QUERY_POST } from '../utils/queries';

//Import post modal
import SinglePostPage from './singlePostPage';


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

  
  //To Keep track of modal
  const [modalOpen, setModalOpen] = useState(false);

  //To keep track of the current post selected
  const [currentPostId, setCurrentPostId] = useState();
  
  const toggleModal = (_id) => {
    setCurrentPostId(_id);
    setModalOpen(!modalOpen)
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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Post
          </Button>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>


        <Grid container spacing={3}>

          {/* posts  */}
          {POSTS && POSTS.map((post, index) => (
            <BlogPostCard key={post._id} post={post} index={index} modalToggle={toggleModal}/>
          ))}
     
          {/* Modal */}
          {modalOpen && (
             <SinglePostPage
             modalOpen={modalOpen}
             setModalOpen={setModalOpen}
             currentPostId={currentPostId}
           />
          )}

          
        </Grid>
      </Container>
    </>
  );
}
