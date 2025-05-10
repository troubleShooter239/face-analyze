import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Header from "../../components/header";
import useAuth from "../../hooks/useAuth";

const AboutUs = () => {
  useAuth({validUrl: '', nonValidUrl: '/sign-in'})
  return (
    <>
      <Header/>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: 3}}>
        <Typography level="h1" sx={{fontSize: '3rem', fontWeight: 'bold', marginBottom: 2}}>About Us</Typography>
        <div style={{maxWidth: '700px', textAlign: 'start'}}>
          <Typography level="body-lg" sx={{marginBottom: 2}}>
            FaceAnalyze is an advanced facial recognition and analysis tool. Our mission is to provide accurate and
            insightful data about facial features, enabling users to understand more about themselves or analyze images
            for
            various purposes.
          </Typography>
          <Typography level="body-md">
            Whether you're an individual seeking to learn more about facial expressions or a company integrating face
            analysis into your solutions, FaceAnalyze is here to help. We're committed to privacy, security, and
            accuracy
            in
            every step of the analysis process.
          </Typography>
        </div>
      </Box>
    </>
  );
}

export default AboutUs;
