import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Header from "../../components/header";
import { Divider } from "@mui/joy";
import useAuth from "../../hooks/useAuth";

const TermsOfUse = () => {
  useAuth({ validUrl: "", nonValidUrl: "/sign-in" });

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 3,
        }}
      >
        <Typography
          level="h1"
          sx={{ fontSize: "3rem", fontWeight: "bold", marginBottom: 1 }}
        >
          Terms of Use
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <div style={{ maxWidth: "800px", textAlign: "start" }}>
          <Typography level="body-lg" sx={{ marginBottom: 2, fontSize: 22 }}>
            Welcome to FaceAnalyze. By accessing or using our platform, you
            accept and agree to be bound by these Terms of Use. Please read them
            carefully. If you do not agree, please do not use our services.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>1. User Eligibility:</strong> You must be at least 18 years
            old or have the consent of a legal guardian to use our services. You
            confirm that all information provided is accurate and truthful.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>2. Responsible Use:</strong> Users are expected to act
            responsibly and ethically. You agree not to misuse our service to
            harm others or for any illegal activity, including but not limited
            to biometric fraud, identity theft, or harassment.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>3. Data Collection and Usage:</strong> We may collect facial
            images, metadata, and usage analytics to deliver, maintain, and
            improve our service. Data is used in strict accordance with our
            Privacy Policy.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>4. Facial Recognition Technology:</strong> Our service
            includes automated analysis using machine learning. While we strive
            for high accuracy, we do not guarantee 100% correctness and results
            should not be the sole basis for legal or critical decisions.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>5. Intellectual Property:</strong> All content, models,
            code, and visualizations are the intellectual property of
            FaceAnalyze. You agree not to copy, reverse-engineer, or resell our
            software or datasets without explicit permission.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>6. Third-Party Integrations:</strong> Our platform may
            connect with third-party services. We are not responsible for their
            terms, privacy policies, or content.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>7. Availability and Downtime:</strong> We strive for 99.9%
            uptime but make no guarantees. Scheduled maintenance and unexpected
            outages may occur without prior notice.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>8. Changes to Terms:</strong> We may update these terms
            occasionally. Continued use of the service implies acceptance of any
            changes. You are encouraged to review these terms regularly.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>9. Termination of Access:</strong> FaceAnalyze reserves the
            right to suspend or terminate your access at any time, with or
            without cause, especially in cases of suspected abuse or legal
            violation.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>10. Limitation of Liability:</strong> In no event shall
            FaceAnalyze be liable for any indirect, incidental, or consequential
            damages arising from the use or inability to use the service.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>11. Commercial Licensing:</strong> We offer advanced
            features and higher API limits for commercial users. For enterprise
            solutions, SDK licensing, or custom integrations, please contact our
            sales team.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>12. Contact and Support:</strong> For any legal inquiries,
            data deletion requests, or commercial partnership discussions, email
            us at{" "}
            <a href="mailto:support@faceanalyze.ai">support@faceanalyze.ai</a>.
          </Typography>

          <Typography
            level="body-lg"
            sx={{
              marginTop: 4,
              marginBottom: 2,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            FaceAnalyze offers powerful face verification APIs, real-time
            anti-spoofing, and identity detection technology trusted by
            professionals around the world. Whether you're building fintech
            verification systems, HR onboarding tools, or smart surveillance,
            we're here to support your growth.
          </Typography>

          <Typography
            level="body-lg"
            sx={{
              marginBottom: 4,
              color: "#0B6BCB",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Interested in commercial use? Explore our Pro plans with SLA
            guarantees, custom model support, and bulk pricing. Reach out at{" "}
            <a
              href="mailto:support@faceanalyze.ai"
              style={{ color: "#0B6BCB" }}
            >
              support@faceanalyze.ai
            </a>
            .
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default TermsOfUse;
