import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_AUTHORS } from "../queries/authorQueries";
import { GET_ARTICLES } from "../queries/articleQueries";
import { GET_MEDIA } from "../queries/mediaQueries";
import { ADD_ARTICLE } from "../mutations/articleMutations";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [tag, setTag] = useState("");
  const [authorId, setAuthorId] = useState("");
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const {
    loading: mediaLoading,
    error: mediaError,
    data: mediaData,
  } = useQuery(GET_MEDIA);
  const {
    loading: articlesLoading,
    error: articlesError,
    data: articlesData,
  } = useQuery(GET_ARTICLES);

  const [addArticle] = useMutation(ADD_ARTICLE, {
    variables: { content, summary, tag, title, authorId, mediaId },
    // data: {addArticle}} is the data returned when the function is called
    update(cache, { data: { addArticle } }) {
      const { articles } = cache.readQuery({ query: GET_ARTICLES });
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
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const processingMedia = async () => {
    const formData = new FormData();
    formData.append("videos", videos);
    formData.append("images", images);
    formData.append("title", title);
    try {
      const response = await fetch("http://localhost:4000/api/media", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data && data.savedMedia) {
        return data.savedMedia._id;
      } else {
        console.log("No videos to add to the article.");
        // Handle the case where videos array is empty
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const newmediaId = await processingMedia();
    if (newmediaId) {
      console.log("XXX only enter with newmediaId", newmediaId);
      // mediaId: newmediaId, key needs to match
      addArticle({
        variables: {
          content,
          summary,
          tag,
          title,
          authorId,
          mediaId: newmediaId,
        },
      });
    }

    setTitle('');
    setSummary('');
    setContent('');
    setVideos([]);
    setImages([]);
    setTag('');
    setAuthorId('');
  };

  if (loading) return null;
  if (error) return "Something Went Wrong";

  return (
    <>
      {!loading && !error && (
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <input
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select name="category" onChange={(e) => setTag(e.target.value)}>
            {/* value has to correspond with graphQL enum type */}
            <option value="art">Art</option>
            <option value="art_market">Art Market</option>
          </select>
          <div>
            <label htmlFor="authors">Author</label>
            <select
              id="authors"
              name="authors"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
            >
              {/* add default author name */}
              <option value="">Select Author</option>
              {data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="file"
            name="videos"
            // automatically display the file name
            onChange={(e) => setVideos(e.target.files[0])}
            multiple
          />
          <input
            type="file"
            name="images"
            onChange={(e) => setImages(e.target.files[0])}
            multiple
          />
          <input
            type="summary"
            placeholder={"Summary"}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <ReactQuill
            theme="snow"
            modules={modules}
            value={content}
            // react-quill can't read target.value, so just have to pass in value
            onChange={(newValue) => setContent(newValue)}
          />
          <input type="submit" value="Submit" />
        </form>
      )}
    </>
  );
}
