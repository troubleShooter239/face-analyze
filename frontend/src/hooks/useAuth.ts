import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

interface Props {
  validUrl: string,
  nonValidUrl: string
}

const useAuth = ({validUrl, nonValidUrl}: Props): void => {
  const navigate = useNavigate();
  useEffect(() => {
    const isTokenValid = (token: string | null) => {
      if (!token) return false;

      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp >= currentTime;
      } catch (error) {
        console.error('Error with decoding token:', error);
        return false;
      }
    };
    if (isTokenValid(localStorage.getItem('token'))) {
      if (validUrl === '')
        return
      navigate(validUrl)
    } else {
      if (nonValidUrl === '')
        return
      navigate(nonValidUrl)
    }
    return
  }, [navigate]);
}

export default useAuth;
