import React, { useState } from 'react';
import styles from './Comment.module.css'
const Comment = ({ author, comment, children }) => {
  const [show, setsshow] = useState({ shown: false });
  const handleShow = () => {
    setsshow({ shown: !show.shown });
  };
  return (
    <div className={styles.commentContainer}>
      <div className={styles.author}>{author}</div>
      <p className={styles.comment}>{comment}</p>
      {children.length > 0 && (
        <a onClick={handleShow}>Replies: {children.length}</a>
      )}
      {show.shown &&
        children.map(item => (
          <Comment
            author={item.author}
            comment={item.comment}
            children={item.children}
          />
        ))}
    </div>
  );
};

export default Comment;
