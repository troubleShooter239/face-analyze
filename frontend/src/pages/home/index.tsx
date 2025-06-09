import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import AnalyzeComponent from "../../components/home/analyze";
import ExtractFacesComponent from "../../components/home/extract-faces";
import VerifyComponent from "../../components/home/verify";

const HomePage = () => {
  useAuth({ validUrl: "", nonValidUrl: "/sign-in" });

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  if (pathname === "/analyze" || pathname === "/") {
    return <AnalyzeComponent />;
  } else if (pathname === "/extract-faces") {
    return <ExtractFacesComponent />;
  } else if (pathname === "/verify") {
    return <VerifyComponent />;
  } else {
    navigate("/page-not-found");
    return <></>;
  }
};

export default HomePage;
