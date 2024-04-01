import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import {GET_ARTICLES} from '../queries/articleQueries';
import {DELETE_ARTICLE} from '../mutations/articleMutations';

export default function DeleteArticleButton({articleId}) {
  const navigate = useNavigate();
  const [deleteArticle] = useMutation(DELETE_ARTICLE, {
    variables: {
      id: articleId,
    },
    onCompleted: () => navigate('/'),
    refetchQueries: [GET_ARTICLES, 'GetArticles'],
  });

  return <button onClick={deleteArticle}>DeleteArticleButton</button>;
}
