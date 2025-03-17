import React, { useState } from 'react';

const NewPostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPost({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form className='post' onSubmit={handleSubmit}>
      <input
      className='postADD'
        type="text"
        placeholder="write the title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea className='postADD'
        placeholder="write content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit"> add post</button>
    </form>
  );
};

export default NewPostForm;