import React from 'react';
import {useQuery} from '@apollo/client';
import {GET_ARTICLES} from '../queries/articleQueries';

export default function Articles() {
  const {loading, error, data} = useQuery(GET_ARTICLES);

  if (loading) return <p>Loading...</p>;
  // show spinner component while loading
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      {data.articles.length > 0 ? (
        <div>
          {data.articles.map(article => (
            <a key={article.id} href={`/articles/${article.id}`}>
              {article.title}
            </a>
          ))}
        </div>
      ) : (
        <p>No Articles</p>
      )}
    </>
  );
}
