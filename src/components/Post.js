import React, { useState } from 'react';
import axios from 'axios';


import Comments from './Comments';
import { useAuth } from '../context/Auth';

const Post = (props) => {

  const auth = useAuth();

  const { id, comments, commentCount, image, like, user, content, deleteButton, getData } = props;
  const [likes, setLikes] = useState(like);
  const [liked, setLiked] = useState(false);
  const [mediaData] = useState(image);
  const [showComments, setShowComments] = useState(false);
  console.log(comments);

  const handelCommentClick = () => {
    const tmp = !showComments;
    setShowComments(tmp);
  }

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handelDeletPost = async () => {
    try{
      const token = localStorage.getItem('jwtToken');
      const deletePost = await axios.post('http://localhost:5000/postOperation/deletePost',{postID:id},{
        headers:{
          'Content-Type':'application/json',
          'auth-token':token
        }
      });

      if(deletePost){
        getData();
        auth.successToast('Post deleted');

      }
    }
    catch(err){
      console.log(err.message);
    }
  }

  return (
    <div className="card my-4" style={{ maxWidth: '25rem' }}>
      <div className="card-body">
        <div className='mb-3' style={{ display: 'flex' }}>
          <div style={{ maxWidth: '40', marginRight: '10px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gray" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
          </div>
          <div className='col'>
            <h5 className="card-title">{user}</h5>
          </div>
        </div>

        {
          mediaData && mediaData.startsWith('data:image') ?
            (<img src={mediaData} alt="Media" style={{ width: '100%' }} />) :
            (
              <video controls>
                <source src={mediaData} type="video/mp4" />
              </video>
            )
        }

        <p className="card-text mt-2">{content}</p>
      </div>
      <div className="card-footer">
        <button className='btn btn-outline' onClick={handleLike}>
          {
            liked ?

              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" className="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
          }
          {likes}
        </button>
        <button className='btn btn-outline' onClick={handelCommentClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-left-dots" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
          {commentCount}
        </button>

        {
          deleteButton && <button className='btn btn-outline' onClick={handelDeletPost}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </button>
        }

        {
          showComments && <Comments id={id} comment={comments} commentCount={commentCount} userName={user} />
        }
      </div>
    </div>
  );
};

export default Post;
