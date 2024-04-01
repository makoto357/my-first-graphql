import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_ARTICLE} from '../queries/articleQueries';
import DeleteArticleButton from '../components/DeleteArticleButton';

export default function Article() {
  const {articleId} = useParams();
  const {loading, error, data} = useQuery(GET_ARTICLE, {variables: {id: articleId}});

  if (loading) return <p>Loading...</p>;
  // show spinner component while loading
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div>hello it's article {articleId}</div>
          <DeleteArticleButton articleId={articleId} />
        </>
      )}
    </>
  );
}
