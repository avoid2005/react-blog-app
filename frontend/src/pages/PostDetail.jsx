import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail } from "../services/apis";

export default function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [postDetail, setPostDetail] = useState({});

  useEffect(() => {
    const getPostDetailNow = async () => {
      const response = await getPostDetail(postId);
      if (response.status === 200) {
        setPostDetail(response.detailPost);
        setLoading(false);
      }
    };
    getPostDetailNow();
  }, [postId]);

  return (
    <>
      {loading ? (
        <h2 className="text-2xl font-bold text-slate-700 text-center my-4">
          Loading . . .
        </h2>
      ) : (
        <div className="mt-10 px-10">
          <h2 className="text-2xl font-bold font-inter">{postDetail.title}</h2>
          <small className="text-slate-500">
            write by {postDetail.writer} on {postDetail.date}
          </small>
          <p className="leading-relaxed font-sm text-slate-700 mt-4">
            {postDetail.bodyText}
          </p>
          <div
            className="text-xl mt-6 text-slate-700 cursor-pointer hover:text-slate-900"
            onClick={() => navigate(-1)}
          >
            &laquo; Kembali
          </div>
        </div>
      )}
    </>
  );
}
