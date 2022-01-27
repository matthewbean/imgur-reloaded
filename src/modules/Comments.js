import React, { useContext } from 'react';
import ImageContext from '../context/image/imageContext';
import Comment from './Comment';
import styles from './Comments.module.css'
const Comments = () => {
  const imageContext = useContext(ImageContext);
  const { comments } = imageContext;
  return (
    <div className={styles.commentsSection}>
      <h2 className={styles.commentsTitle}>Comments</h2>
      <div className={styles.comments}>
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
