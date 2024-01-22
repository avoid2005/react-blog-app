import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUserDataById } from "../services/apis"

// components
import PostList from "../components/PostList"

const MyPosts = () => {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [myPosts, setMyPosts] = useState([])

  useEffect(() => {
    const fetchDataById = async () => {
      const response = await getUserDataById(id)
      if (response.status === 200) {
        setData(response.data)
        setMyPosts(response.data.posts)
        setLoading(false)
      } else if (response.status === 404) alert(response.message)
    }

    fetchDataById()
  }, [])

  return (
    <>
      <PostList
        data={data}
        title="Your Posts"
        loading={loading}
        posts={myPosts}
        typePost={"myPosts"}
      />
    </>
  )
}

export default MyPosts
