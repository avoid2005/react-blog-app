/* eslint-disable react/prop-types */

export default function PostListSkeleton({ count, typePost }) {
  const posts = Array(count).fill(null);

  return (
    <div className="mx-4 my-6">
      <h2 className="text-2xl font-bold text-slate-400 px-10 text-center my-4 bg-slate-400 w-max mx-auto rounded-md">
        Posts
      </h2>
      {posts?.map((_, i) => (
        <div
          className={`border border-slate-300 rounded-md w-[95%] flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 mx-auto my-2`}
          key={i}
        >
          <div
            className={`px-4 flex flex-col justify-center items-center ${typePost === "myPosts"
                ? "sm:items-start"
                : "sm:items-center mx-auto"
              }`}
          >
            <button
              className={`font-bold hover:underline bg-slate-400 px-10 py-2 inline-block`}
            ></button>
            <span className="text-sm bg-slate-400 px-20 py-2 mt-1 inline-block"></span>
          </div>
          {typePost === "myPosts" && (
            <div className="px-4 my-4 mx-auto sm:mx-0">
              <span>
                <button className="text-sm px-3 py-2 bg-slate-400 text-slate-400 rounded">
                  Edit
                </button>
                <button className="text-sm px-3 py-2 bg-slate-400 text-slate-400 rounded ml-1">
                  Delete
                </button>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
