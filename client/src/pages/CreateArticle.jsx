import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useMutation, useQuery} from '@apollo/client';
import {GET_AUTHORS} from '../queries/authorQueries';
import {GET_ARTICLES} from '../queries/articleQueries';
import {ADD_ARTICLE} from '../mutations/articleMutations';

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tag, setTag] = useState('');
  const [authorId, setAuthorId] = useState('');
  const {loading, error, data} = useQuery(GET_AUTHORS);
  const [addArticle] = useMutation(ADD_ARTICLE, {
    variables: {content, coverImage, summary, tag, title, authorId},
    // data: {addArticle}} is the data returned when the function is called
    update(cache, {data: {addArticle}}) {
      const {articles} = cache.readQuery({query: GET_ARTICLES});
      cache.writeQuery({
        query: GET_ARTICLES,
        data: {
          articles: articles.concat([addArticle]),
        },
      });
    },
  });

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
    addArticle(content, coverImage, summary, tag, title, authorId);
    setTitle('');
    setSummary('');
    setContent('');
    setCoverImage('');
    setTag('');
    setAuthorId('');
  };

  if (loading) return null;
  if (error) return 'Something Went Wrong';

  return (
    <>
      {!loading && !error && (
        <form onSubmit={onSubmit}>
          <input
            type="title"
            placeholder={'Title'}
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input type="image" onChange={e => setCoverImage(e.target.image)} />
          <select name="category" onChange={e => setTag(e.target.value)}>
            {/* value has to correspond with graphQL enum type */}
            <option value="art">Art</option>
            <option value="art_market">Art Market</option>
          </select>
          <div>
            <label for="authors">Author</label>
            <select
              id="authors"
              name="authors"
              value={authorId}
              onChange={e => setAuthorId(e.target.value)}
            >
              {/* add default author name */}
              <option value="">Select Author</option>
              {data.authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
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
      )}
    </>
  );
}
