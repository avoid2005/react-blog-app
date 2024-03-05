import { useNavigate } from "react-router-dom";

// Components
import Button from "../components/Button";
import { useEffect } from "react";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("blogAppSessionId");
    if (sessionId) navigate(`/home/${sessionId}`);
  }, [navigate]);

  return (
    <div className="max-w-[500px] mx-auto my-10 text-center">
      <h1 className="font-bold text-2xl mb-4">Welcome</h1>
      <p className="leading-relaxed text-slate-800 mb-6 px-4">
        welcome to our blog, you can register and make any post you want, if you
        find an error on this blog, we hope you can let us know immediately.
      </p>
      <div className="w-full flex justify-center items-center">
        <Button
          color={"secondary"}
          styles={"mx-2"}
          onClick={() => navigate("/users/signup")}
        >
          Register
        </Button>
        <Button onClick={() => navigate("/users/signin")}>Login</Button>
      </div>
    </div>
  );
}
