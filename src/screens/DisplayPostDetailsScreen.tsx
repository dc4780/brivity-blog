import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MdCached } from 'react-icons/md';
import axios from 'axios';
import Container from '../components/Container';
import DisplayItems from '../components/DisplayItems';
import CreateComment from '../components/CreateComment';
import { UserContext } from '../components/UserContext';
import { Link, useNavigate } from 'react-router-dom';

type Post = {
  body: string;
  comment_count: number;
  created_at: string;
  id: number;
  title: string;
  updated_at: number;
  user: {
    display_name: string;
    id: number;
  }
}

function DisplayPostDetailsScreen() {
  //user
  const userContext = useContext(UserContext);

  const navigate = useNavigate();
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [body, setBody] = useState(''); //post.body
  const [title, setTitle] = useState(''); //post.title
  const { postId } = useParams();
  const [post, setPost] = useState<Post>({} as Post);
  const [commentAdded, setCommentAdded] = useState(false);

  useEffect(() => {
    async function getPost() {
      try {
        const postResponse = await axios.get(`https://brivity-react-exercise.herokuapp.com/posts/${postId}`);
        const post = postResponse.data.post;
        setPost(post);
        setBody(post.body);
        setTitle(post.title);        
      }
      catch(err) {
        console.error(err);
      }
    }
    getPost();
  }, []);

  const handleEditPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      const editPostResponse = await axios.patch(
        `https://brivity-react-exercise.herokuapp.com/posts/${postId}`, 
        {"post": {"title": title, "body": body}},
        {headers: {
          authorization: userContext.user?.token as string
        }}
      );
      setBody('');
      navigate('/display-posts');
    } catch (err) {
      console.error(err);
    } finally {
      setEditLoading(false);
    }
  }

  const handleDeletePost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDeleteLoading(true);
    try {
      const createDeleteResponse = await axios.delete(
        `https://brivity-react-exercise.herokuapp.com/posts/${postId}`,
        {headers: {
          authorization: userContext.user?.token as string
        }}
      );
      navigate('/display-posts');
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteLoading(false);
    }
  }  

  return (
    <>
      {post.title && <Container title={post.title}>
        <div>by {post.user.display_name}</div>
        <div>{`${new Date(post.created_at)}`}</div>
        {userContext.user?.id === post.user.id
          ? (
            <div>
              <form onSubmit={handleEditPost}>
                <label className="block mt-2">Title:<br />
                  <input 
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="border-2"
                  />
                </label>              
                <label className="block mt-2">Body:<br /> 
                  <textarea
                    value={body}
                    onChange={e => setBody(e.target.value)} 
                    className="h-36 w-[25rem] p-5 border-2"
                  >
                  </textarea>
                </label>
                <button type="submit" className="px-6 py-2 bg-green-400 rounded-md flex items-center disabled:bg-slate-50 disabled:text-slate-500" disabled={editLoading}>{editLoading && <MdCached className="-scale-100 mr-2 animate-spin" size={30} />}Edit Post</button>
              </form>
              <form onSubmit={handleDeletePost}>
                <button type="submit" className="mt-2 px-6 py-2 bg-red-400 rounded-md flex items-center disabled:bg-slate-50 disabled:text-slate-500" disabled={deleteLoading}>{deleteLoading && <MdCached className="-scale-100 mr-2 animate-spin" size={30} />}Delete Post</button>
              </form>
            </div>
          )
          : (
            <div>{post.body}</div>           
        )}
        { postId && <CreateComment postId={postId} setCommentAdded={setCommentAdded} /> }
        <DisplayItems fetchUrl={`https://brivity-react-exercise.herokuapp.com/posts/${postId}/comments`} shouldLink={false} shouldShowContent={true} dataType="comments" className="mt-20" commentAdded={commentAdded} setCommentAdded={setCommentAdded} />
      </Container>}
    </>
  );
}

export default DisplayPostDetailsScreen;
