import React from 'react';
import useAuth from "../../hooks/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import AnalyzeComponent from "../../components/home/analyze";

const HomePage = () => {
  useAuth({validUrl: '', nonValidUrl: '/sign-in'})

  const navigate = useNavigate();
  const pathname = useLocation().pathname
  if (pathname === '/analyze' || pathname === '/') {
    return <AnalyzeComponent/>
  } else if (pathname === '/extract-faces') {
    return <></>
  } else if (pathname === '/verify') {
    return <></>
  } else {
    navigate('/page-not-found')
    return <></>
  }
}

export default HomePage;
