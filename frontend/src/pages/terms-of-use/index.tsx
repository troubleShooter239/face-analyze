import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Header from "../../components/header";
import {Divider} from "@mui/joy";
import useAuth from "../../hooks/useAuth";

const TermsOfUse = () => {
  useAuth({validUrl: '', nonValidUrl: '/sign-in'})

  return (
    <>
      <Header/>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', px: 3}}>
        <Typography level="h1" sx={{fontSize: '3rem', fontWeight: 'bold', marginBottom: 1}}>
          Terms of Use
        </Typography>
        <Divider sx={{marginBottom: 2}}/>
        <div style={{maxWidth: '700px', textAlign: 'start'}}>
          <Typography level="body-lg" sx={{marginBottom: 2}}>
            By using FaceAnalyze, you agree to the following terms and conditions. Please read them carefully before
            accessing or using our services.
          </Typography>
          <Typography level="body-md" sx={{marginBottom: 1}}>
            <strong>1. User Responsibilities:</strong> You are responsible for ensuring that the data you provide,
            including any facial images, is accurate and complies with relevant legal and ethical standards. You must
            not upload any unlawful, harmful, or inappropriate content.
          </Typography>
          <Typography level="body-md" sx={{marginBottom: 1}}>
            <strong>2. Data Usage:</strong> We collect and use your data solely for the purpose of providing our
            services. The data is processed securely and is used to improve our facial recognition algorithms and
            personalize your experience.
          </Typography>
          <Typography level="body-md" sx={{marginBottom: 1}}>
            <strong>3. Privacy and Data Security:</strong> We are committed to safeguarding your personal information.
            We utilize industry-standard encryption and other measures to protect the confidentiality and security of
            your data.
          </Typography>
          <Typography level="body-md" sx={{marginBottom: 1}}>
            <strong>4. Modifications:</strong> We reserve the right to change, update, or revise these terms at any
            time. Users will be notified of major changes via email or through a notification on the platform.
          </Typography>
          <Typography level="body-md" sx={{marginBottom: 1}}>
            <strong>5. Termination:</strong> We reserve the right to suspend or terminate your access to our services if
            we suspect any violation of these terms or any misuse of the platform.
          </Typography>
        </div>
      </Box>
    </>
  );
}
export default TermsOfUse;
