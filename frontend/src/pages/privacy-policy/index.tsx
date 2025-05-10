import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Header from "../../components/header";
import {Divider} from "@mui/joy";
import useAuth from "../../hooks/useAuth";

const PrivacyPolicy = () => {
  useAuth({validUrl: '', nonValidUrl: '/sign-in'})

  return (
    <>
      <Header/>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: 3}}>
        <Typography level="h1" sx={{fontSize: '3rem', fontWeight: 'bold', marginBottom: 1}}>Privacy Policy</Typography>
        <Divider sx={{marginBottom: 2}}/>
        <div style={{maxWidth: '700px', textAlign: 'start'}}>
          <Typography level="body-lg" sx={{marginBottom: 2}}>
            Your privacy is important to us. At FaceAnalyze, we take your data security seriously. This Privacy Policy
            outlines how we collect, use, and protect your personal information.
          </Typography>
          <Typography level="body-md" sx={{marginBottom: 1}}>
            <strong>1. Information Collection:</strong> We collect personal information that you provide during
            registration or while using our services. This includes email addresses and preferences, as well as data
            from your facial analysis.
          </Typography>
          <Typography level="body-md" sx={{marginBottom: 1}}>
            <strong>2. Data Usage:</strong> We use your data only to improve our services, personalize your experience,
            and provide you with accurate facial analysis results.
          </Typography>
          <Typography level="body-md" sx={{marginBottom: 1}}>
            <strong>3. Data Protection:</strong> We implement industry-standard security measures to protect your data
            from unauthorized access, alteration, or destruction.
          </Typography>
          <Typography level="body-md">
            <strong>4. Third-Party Sharing:</strong> We do not share your personal data with third parties except where
            required by law or with trusted partners to improve our service.
          </Typography>
        </div>

      </Box>
    </>
  );
}

export default PrivacyPolicy;
