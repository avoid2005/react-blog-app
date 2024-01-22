import { Link, useNavigate } from "react-router-dom"
import { deletePost } from "../services/apis"

const PostList = ({ posts, title, loading, data, typePost }) => {
  const navigate = useNavigate()

  const handleDeletePost = (id, postId) => {
    const seriously = confirm("Are You Sure ?")
    if (!seriously) return
    else {
      const deletePostNow = async () => {
        await deletePost(id, postId)
        navigate(0)
      }
      deletePostNow()
    }
  }

  if (loading === false && posts?.length === 0)
    return (
      <h2 className="text-2xl font-bold text-slate-700 text-center my-4">
        {title} is Empty
      </h2>
    )

  return (
    <>
      {loading ? (
        <h2 className="text-2xl font-bold text-slate-700 text-center my-4">
          Loading . . .
        </h2>
      ) : (
        <div className="mx-4 my-6">
          <h2 className="text-2xl font-bold text-slate-700 text-center my-4">
            {title}
          </h2>
          {posts?.map((post) => (
            <div
              className={`border border-slate-300 rounded-md w-[95%] flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 mx-auto my-2`}
              key={post.postId}
            >
              <div
                className={`px-4 flex flex-col justify-center items-center ${
                  typePost === "myPosts"
                    ? "sm:items-start"
                    : "sm:items-center mx-auto"
                }`}
              >
                <Link
                  className={`font-bold hover:underline`}
                  to={`/home/${data.id}/${post.postId}/postdetail/`}
                >
                  {post.title}
                </Link>
                <span className="text-sm text-slate-600">
                  by {post.writer} | {post.date}
                </span>
              </div>
              {typePost === "myPosts" && (
                <div className="px-4 my-4 mx-auto sm:mx-0">
                  <span>
                    <Link
                      className="text-sm px-3 py-2 bg-green-800 hover:bg-green-600 text-white rounded"
                      to={`/home/${data.id}/${post.postId}/edit`}
                    >
                      Edit
                    </Link>
                    <Link
                      className="text-sm px-3 py-2 bg-red-800 hover:bg-red-600 text-white rounded ml-1"
                      onClick={() => handleDeletePost(data.id, post.postId)}
                    >
                      Delete
                    </Link>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default PostList
