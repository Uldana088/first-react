import React from 'react';

const BlogPost = ({ post, onLike, onDelete }) => {
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button className='buttonn' onClick={() => onLike(post.id)}>
        like {post.likes}
      </button>
      <button className='buttonn' onClick={() => onDelete(post.id)}>delete</button>
    </div>
  );
};

export default BlogPost;