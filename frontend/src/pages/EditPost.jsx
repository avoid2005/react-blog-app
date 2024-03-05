import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail, sendUpdatedPost } from "../services/apis";

// Components
import CreatePostForm from "../components/CreatePostForm";

export default function EditPost() {
  const navigate = useNavigate();
  const { id, postId } = useParams();
  const [defaultTitle, setDefaultTitle] = useState("");
  const [defaultBodyText, setDefaultBodyText] = useState("");
  const [post, setPost] = useState({});

  const handleSubmitPost = ({ e, title, bodyText }) => {
    e.preventDefault();

    const sendUpdatedPostNow = async () => {
      console.log(title, bodyText);
      if (!title || !bodyText) return;

      const updatedPost = { ...post, title, bodyText };

      const response = await sendUpdatedPost(id, postId, updatedPost);
      if (response.status === 200) {
        alert(response.message);
        navigate(-1);
      }
    };

    sendUpdatedPostNow();
  };

  useEffect(() => {
    const getPostDetailForDefaultValue = async () => {
      const response = await getPostDetail(postId);
      if (response.status === 200) {
        setDefaultTitle(response.detailPost.title);
        setDefaultBodyText(response.detailPost.bodyText);
        setPost(response.detailPost);
      }
    };

    getPostDetailForDefaultValue();
  }, [postId]);

  return (
    <CreatePostForm
      onSubmitHandler={({ e, title, bodyText }) =>
        handleSubmitPost({ e, title, bodyText })
      }
      defaultTitle={defaultTitle}
      defaultBodyText={defaultBodyText}
      textButton={"Update Post"}
    />
  );
}
