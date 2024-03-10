import React from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {GET_AUTHORS} from '../queries/authorQueries';
import {ADD_AUTHOR, DELETE_AUTHOR} from '../mutations/authorMutations';

export default function Authors() {
  const {loading, error, data} = useQuery(GET_AUTHORS);
  const {} = useMutation(ADD_AUTHOR);

  const [deleteAuthor] = useMutation(
    DELETE_AUTHOR,
    // {
    //   refetchQueries: [
    //     GET_AUTHORS, // DocumentNode object parsed with gql
    //     'GetAuthors', // Query name
    //   ],
    // },
    {
      update(cache, {data: {deleteAuthor}}) {
        const {authors} = cache.readQuery({query: GET_AUTHORS});
        cache.writeQuery({
          query: GET_AUTHORS,
          data: {
            authors: authors.filter(author => author.id !== deleteAuthor.id),
          },
        });
      },
    },
  );

  if (loading) return <p>Loading...</p>;
  // show spinner component while loading
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      {!loading &&
        !error &&
        data.authors.map(author => (
          <div key={author.id}>
            <div>{author.name}</div>
            <div>{author.email}</div>
            <button
              onClick={() =>
                // variables = arguments of the mutation funtion
                deleteAuthor({
                  variables: {
                    id: author.id,
                  },
                })
              }
            >
              delete
            </button>
          </div>
        ))}
    </>
  );
}
