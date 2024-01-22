import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserDataById, getAllPosts } from "../services/apis"

// components
import PostList from "../components/PostList"

const Home = () => {
  const { id } = useParams()
  const [allPosts, setAllPosts] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await getAllPosts()
      if (response.status === 200) setAllPosts(response.allPosts)
    }

    const fetchDataById = async () => {
      const response = await getUserDataById(id)
      if (response.status === 200) {
        setData(response.data)
        setLoading(false)
      } else if (response.status === 404) alert(response.message)
    }

    fetchDataById()
    fetchAllPosts()
  }, [id])

  return (
    <>
      <PostList
        data={data}
        title="All Posts"
        posts={allPosts}
        loading={loading}
      />
    </>
  )
}

export default Home
