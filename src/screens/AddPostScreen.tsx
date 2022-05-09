import React, { useState, useContext } from 'react';
import Container from '../components/Container';
import { MdCached } from 'react-icons/md';
import axios from 'axios';
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

function AddPostScreen() {
  //user
  const userContext = useContext(UserContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmitPost = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createPostResponse = await axios.post(
        'https://brivity-react-exercise.herokuapp.com/posts', 
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
      setLoading(false);
    }
  }

  return (
    <Container title={"Add Post"}>
      {userContext.user?.token
        ? (<form onSubmit={handleSubmitPost}>
          <div className="mt-5">
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
            <button type="submit" className="px-6 py-2 bg-green-400 rounded-md flex items-center disabled:bg-slate-50 disabled:text-slate-500" disabled={loading}>{loading && <MdCached className="-scale-100 mr-2 animate-spin" size={30} />}Add Post</button>   
          </div>
        </form>)
        : <div className="mt-10">Please <Link to="/sign-in" className='underline font-semibold'>log in</Link> to add a post.</div>
      }
    </Container>
  );
}

export default AddPostScreen;
