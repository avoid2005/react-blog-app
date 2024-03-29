import { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { getUserDataById } from "../services/apis";

// Components
import Button from "../components/Button";

export default function HomeLayout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataById = async () => {
      const response = await getUserDataById(id);
      if (response.status === 200) {
        setData(response.data);
      } else if (response.status === 404) alert(response.message);
    };
    fetchDataById();
  }, [id]);

  return (
    <>
      <header className="flex justify-between items-center bg-slate-200 px-4 py-4 font-inter">
        <h1 className="text-xl font-bold">Welcome {data.username}</h1>
        <nav className="flex items-center">
          <div className="mx-4 flex items-center">
            <div className="text-slate-700 text-sm mx-2">Light</div>
            <div
              className={`w-12 h-6 bg-slate-400 rounded-full cursor-pointer flex`}
            >
              <div className="w-6 h-6 rounded-full bg-slate-900"></div>
            </div>
          </div>
          <Button styles={"mx-1"} onClick={() => navigate(`/home/${data.id}`)}>
            Home
          </Button>
          <Button
            styles={"mx-1"}
            color={"secondary"}
            onClick={() => navigate(`/home/${data.id}/addposts`)}
          >
            Add Post
          </Button>
          <Button
            styles={"mx-1"}
            color={"indigo"}
            onClick={() => navigate(`/home/${data.id}/myposts`)}
          >
            My Post
          </Button>
          <Button
            styles={"mx-1"}
            color={"danger"}
            onClick={() => {
              localStorage.removeItem("blogAppSessionId");
              navigate(`/`);
            }}
          >
            Logout
          </Button>
        </nav>
      </header>

      <Outlet />
    </>
  );
}
