import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ARTICLE } from "../queries/articleQueries";
import DeleteArticleButton from "../components/DeleteArticleButton";

export default function Article() {
  const { articleId } = useParams();
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id: articleId },
  });

  if (loading) return <p>Loading...</p>;
  // show spinner component while loading
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div>hello it's article {articleId}</div>
          {/* use img instead of image in react.js */}
          <img src={data.article.medium.images[0]} />
          <video controls width="640" height="360" autoPlay>
            <source
              src={data.article.medium.videoUrls[0]}
              // set as mp4 not mov
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <DeleteArticleButton articleId={articleId} />
        </>
      )}
    </>
  );
}
