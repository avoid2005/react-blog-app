import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignInApi } from "../services/apis";

// components
import Input from "../components/Input";
import Button from "../components/Button";

export default function SignIn() {
  const navigate = useNavigate();
  const [usernameoremail, setUsernameoremail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginUser = async (e) => {
    e.preventDefault();

    const user = { usernameoremail, password };
    const response = await userSignInApi(user);
    if (response.status === 200) {
      alert(response.message);
      if (rememberMe) localStorage.setItem("blogAppSessionId", response.id);
      navigate(`/home/${response.id}`);
    } else if (response.status === 401 || response.status === 404)
      alert(response.message);
  };

  return (
    <div
      style={{ backgroundImage: "url(/bg-auth.jpeg)" }}
      className="w-screen h-screen flex box-border justify-center items-center overflow-x-hidden"
    >
      <div className="w-[80%] sm:w-1/2 md:w-[40%] lg:w-[30%] px-6 shadow-lg shadow-black bg-white bg-opacity-30 backdrop-blur-md rounded-md">
        <div className="w-full py-5">
          <h1 className="font-bold text-2xl">Login</h1>
          <p>Hello again! please enter your details</p>
        </div>
        <form
          className=" flex flex-col"
          method="POST"
          onSubmit={handleLoginUser}
        >
          <Input
            htmlFor="usernameoremail"
            labelText="Username or Email"
            type="text"
            placeholder="Username or Email . . ."
            onChange={(e) => setUsernameoremail(e.target.value)}
          />
          <Input
            htmlFor="password"
            labelText="Password"
            type="password"
            placeholder="Password . . ."
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center py-2">
            <input
              name="rememberMe"
              id="rememberMe"
              type="checkbox"
              defaultChecked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="cursor-pointer text-slate-400 inline-block"
            />
            <label
              htmlFor="rememberMe"
              className="ml-1 cursor-pointer text-black inline-block"
            >
              remember me
            </label>
          </div>

          <div className="flex flex-col justify-center items-center">
            <Button type={"submit"} size={"large"} styles={"mt-4"}>
              Login
            </Button>
            <span className="text-sm text-black inline-block mt-2 mb-4">
              dont have an account yet?{" "}
              <Link className="text-black underline" to="/users/signup">
                click here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
