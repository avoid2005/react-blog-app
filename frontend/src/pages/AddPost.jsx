import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getUserDataById, sendNewPost } from "../services/apis"

// Components
import CreatePostForm from "../components/CreatePostForm"

const AddPost = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = useState([])

  const handleSubmitPost = ({ e, title, bodyText }) => {
    e.preventDefault()

    const sendPost = async () => {
      if (!title || !bodyText) return
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]

      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const currentDate = `${day < 10 ? `0${day}` : day}-${
        monthNames[month]
      }-${year}-${hour < 10 ? `0${hour}` : hour}:${
        minute < 10 ? `0${minute}` : minute
      }`

      const newPost = {
        title,
        writer: data.username,
        date: currentDate,
        bodyText,
      }

      const response = await sendNewPost(id, newPost)
      if (response.status === 201) {
        alert(response.message)
        navigate(-1)
      }
    }

    sendPost()
  }

  useEffect(() => {
    const fetchDataById = async () => {
      const response = await getUserDataById(id)
      if (response.status === 200) {
        setData(response.data)
      } else if (response.status === 404) alert(response.message)
    }
    fetchDataById()
  }, [id])

  return (
    <CreatePostForm
      onSubmitHandler={({ e, title, bodyText }) =>
        handleSubmitPost({ e, title, bodyText })
      }
      textButton={"Send Post"}
    />
  )
}

export default AddPost
