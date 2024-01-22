/* eslint-disable react/prop-types */

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CreatePostForm({
  onSubmitHandler,
  defaultTitle,
  defaultBodyText,
  textButton,
}) {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [bodyText, setBodyText] = useState("")

  useEffect(() => {
    setTitle(defaultTitle)
    setBodyText(defaultBodyText)
  }, [defaultTitle, defaultBodyText])

  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <form
        className="flex flex-col px-6 py-3 w-[90%]"
        onSubmit={(e) => onSubmitHandler({ e, title, bodyText })}
      >
        <div className="flex flex-col mb-4">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="outline-none px-3 py-2 text-sm w-full border"
            name="title"
            id="title"
            placeholder="Title"
            required
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <textarea
            onChange={(e) => setBodyText(e.target.value)}
            value={bodyText}
            name="body-text"
            id="body-text"
            cols="30"
            rows="20"
            className="outline-none px-3 py-2 text-sm w-full border resize-none"
            placeholder="Input Your Text , Whatever You Want . . ."
            required
          ></textarea>
        </div>

        <div>
          <button
            type="button"
            className="text-sm mx-1 font-bold px-6 py-2 rounded bg-red-800 text-white inline-block my-4 hover:bg-red-600 transition-all duration-300"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-sm mx-1 font-bold px-6 py-2 rounded bg-sky-800 text-white inline-block my-4 hover:bg-sky-600 transition-all duration-300"
          >
            {textButton}
          </button>
        </div>
      </form>
    </div>
  )
}

CreatePostForm.defaultProps = {
  defaultTitle: "",
  defaultBodyText: "",
}
