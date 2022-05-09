import React from 'react';
import Container from '../components/Container';
import DisplayItems from '../components/DisplayItems';

function DisplayAllPostsScreen() {
  return (
    <Container title="Display All Posts">
      <DisplayItems fetchUrl='https://brivity-react-exercise.herokuapp.com/posts' shouldLink={true} dataType="posts" linkUrl='/display-posts/' shouldShowContent={false} />
    </Container>
  )
}

export default DisplayAllPostsScreen;
