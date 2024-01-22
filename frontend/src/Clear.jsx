import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Clear = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const clearAllData = async () => {
      const url = import.meta.env.VITE_BASEURL
      const request = await fetch(`${url}/clear`)
      const response = await request.json()
      if (response.status === 200) {
        localStorage.removeItem("blogAppSessionId")
        navigate("/")
      }
    }
    clearAllData()
  })
}

export default Clear
