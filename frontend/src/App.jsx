import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Pages
import Home from "./pages/Home"
import Welcome from "./pages/Welcome"
import AddPost from "./pages/AddPost"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import MyPosts from "./pages/MyPosts"
import Clear from "./Clear"
import PostDetail from "./pages/PostDetail"
import EditPost from "./pages/EditPost"
import HomeLayout from "./layouts/HomeLayout"

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/clear" element={<Clear />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/users/signup" element={<SignUp />} />
          <Route path="/users/signin" element={<SignIn />} />
          <Route path="/home/:id" element={<HomeLayout />}>
            <Route path="" element={<Home />} />
            <Route path="addposts" element={<AddPost />} />
            <Route path="myposts" element={<MyPosts />} />
            <Route path=":postId/postdetail" element={<PostDetail />} />
            <Route path=":postId/edit" element={<EditPost />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
