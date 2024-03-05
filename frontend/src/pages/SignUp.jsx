import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userSignUpApi } from "../services/apis";

// components
import Input from "../components/Input";
import Button from "../components/Button";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(true);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    const newUser = { username, email, password };
    const response = await userSignUpApi(newUser);
    if (response.status === 201) {
      alert(response.message);
      localStorage.setItem("blogAppSessionId", response.id);
      navigate(`/home/${response.id}`);
    } else if (response.status === 409) alert(response.message);
  };

  useEffect(() => {
    setMatchPassword(password === repeatPassword);
  }, [password, repeatPassword]);

  return (
    <div
      style={{ backgroundImage: "url(/bg-auth.jpeg)" }}
      className="w-screen h-screen flex justify-center items-center box-border overflow-x-hidden"
    >
      <div className="w-[80%] sm:w-1/2 md:w-[40%] lg:w-[30%] px-6 shadow-lg shadow-black bg-white bg-opacity-30 backdrop-blur-md rounded-md">
        <div className="w-full py-5">
          <h1 className="font-bold text-2xl">Register</h1>
          <p>
            Register to create your first account and start exploring the blog
          </p>
        </div>
        <form
          className=" flex flex-col"
          method="POST"
          onSubmit={handleRegisterUser}
        >
          <Input
            htmlFor="username"
            labelText="Username"
            type="text"
            placeholder="Username . . ."
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            htmlFor="email"
            labelText="Email"
            type="email"
            placeholder="Email . . ."
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            htmlFor="password"
            labelText="Password"
            type="password"
            placeholder="Password . . ."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            htmlFor="repeat-password"
            labelText="Repeat Password"
            type="password"
            placeholder="Repeat Password . . ."
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          {!matchPassword && (
            <span className="font-bold text-sm text-pink-800 my-2 text-center">
              passwords do not match
            </span>
          )}

          <div className="flex flex-col justify-center items-center">
            <Button
              type={matchPassword ? "submit" : "button"}
              color={"secondary"}
              size={"large"}
              styles={"mt-4"}
            >
              Register
            </Button>
            <span className="text-sm text-black inline-block mt-2 mb-4">
              do you have an account?{" "}
              <Link className="text-black-600 underline" to="/users/signin">
                click here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
