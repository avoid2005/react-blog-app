import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Clear() {
  const navigate = useNavigate();
  useEffect(() => {
    const clearAllData = async () => {
      const url = "http://localhost:5000/api";
      const request = await fetch(`${url}/clear`);
      const response = await request.json();
      if (response.status === 200) {
        localStorage.removeItem("blogAppSessionId");
        navigate("/");
      }
    };
    clearAllData();
  });
}
