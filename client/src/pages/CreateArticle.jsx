import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('');
  const [authorId, setAuthorId] = useState('');

  const modules = {
    toolbar: [
      [{header: [1, 2, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const onSubmit = e => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input type="image" onChange={e => setImage(e.target.image)} />
      <select name="category">
        <option value="Art" onChange={e => setTag(e.target.value)}>
          Art
        </option>
        <option value="Art Market" onChange={e => setTag(e.target.value)}>
          Art Market
        </option>
      </select>
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={e => setSummary(e.target.value)}
      />
      <ReactQuill
        theme="snow"
        modules={modules}
        value={content}
        // react-quill can't read target.value, so just have to pass in value
        onChange={newValue => setContent(newValue)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
