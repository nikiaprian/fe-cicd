import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/AuthStore";

function GoogleAuthCallback() {
  //   const [auth, setAuth] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  useEffect(() => {
    const { search } = location;
    axios
      .get(`http://docker-alb-be-641740679.us-west-2.elb.amazonaws.com:9090/auth/callback/google${search}`, {
        withCredentials: false,
      })
      .then((res) => {
        // setAuth(res?.data.data);
        setIsLoggedIn(true);
        window.localStorage.setItem("ACCESS_KEY", res?.data?.data?.token);
        window.localStorage.setItem("idUser", res?.data?.data?.user?.id);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
    //eslint-disable-next-line
  }, []);
}

export default GoogleAuthCallback;
