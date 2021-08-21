import React, { useContext } from 'react';
import ImageContext from '../context/image/imageContext';
import Comment from './Comment';

const Comments = () => {
  const imageContext = useContext(ImageContext);
  const { comments } = imageContext;
  return (
    <div className='comments-section'>
      <h2 className='album-title'>COMMENTS</h2>
      <div className='comments'>
        {comments.map(item => (
          <Comment
            author={item.author}
            key={item.id}
            comment={item.comment}
            children={item.children}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
