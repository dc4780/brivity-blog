import React, { useContext, useState } from 'react';
import { MdCached } from 'react-icons/md';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
import { Link, useNavigate } from 'react-router-dom';

type CreateCommentProps = {
  postId: string;
  setCommentAdded: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateComment = ({ postId, setCommentAdded }: CreateCommentProps) => {
  //user
  const userContext = useContext(UserContext);
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const handleSubmit = (e: React.SyntheticEvent) => {
    setLoading(true);
  }

  const handleSubmitComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const createCommentResponse = await axios.post(
        'https://brivity-react-exercise.herokuapp.com/comments', 
        {"comment": {"post_id": postId, "content": comment}}, 
        {headers: {
          authorization: userContext.user?.token as string
        }}
      );
      setComment('');
      setCommentAdded(true);
      navigate(`/display-posts/${postId}#${createCommentResponse.data.comment.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    {userContext.user?.token
      ? (<form onSubmit={handleSubmitComment} className="mt-10">
        <div className="mt-5">
          <label className="block mt-2">Comment:<br />
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)} 
              className="h-36 w-[25rem] p-5 border-2"
            >
            </textarea>
          </label>
          <button type="submit" className="px-6 py-2 bg-green-400 rounded-md flex items-center disabled:bg-slate-50 disabled:text-slate-500" disabled={loading}>{loading && <MdCached className="-scale-100 mr-2 animate-spin" size={30} />}Comment</button>   
        </div>
      </form>)
      : <div className="mt-10">Please <Link to="/sign-in" className='underline font-semibold'>log in</Link> to edit the post if you are the author, or to leave a comment.</div>
    }
    </>
  );
}

export default CreateComment;
