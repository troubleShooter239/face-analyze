import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Header from "../../components/header";
import { Divider } from "@mui/joy";
import useAuth from "../../hooks/useAuth";

const PrivacyPolicy = () => {
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
          Privacy Policy
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <div style={{ maxWidth: "800px", textAlign: "start" }}>
          <Typography level="body-lg" sx={{ marginBottom: 4, fontSize: 20 }}>
            Your privacy is important to us. At FaceAnalyze, we take your data
            security seriously. This Privacy Policy outlines how we collect,
            use, store, and protect your personal information across all our
            services.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>1. Information Collection:</strong> We collect personal
            information that you provide during registration or while using our
            services. This includes but is not limited to email addresses, IP
            addresses, preferences, uploaded images, and metadata associated
            with your usage.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>2. Facial Image Processing:</strong> Facial data uploaded by
            users is processed securely and is never shared or used beyond your
            session unless explicitly permitted. Images may be temporarily
            stored for performance and analysis purposes but are automatically
            deleted after processing.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>3. Data Usage:</strong> We use your data only to improve our
            services, personalize your experience, and provide you with accurate
            facial analysis results. We may also use aggregate and anonymized
            data for research and development.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>4. Cookies and Tracking Technologies:</strong> We use
            cookies to improve functionality, remember user preferences, and
            analyze traffic patterns. You may disable cookies through your
            browser settings.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>5. Data Retention:</strong> Personal data is retained only
            as long as necessary to fulfill the purpose for which it was
            collected, or as required by applicable laws.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>6. Data Protection:</strong> We implement industry-standard
            security measures to protect your data from unauthorized access,
            alteration, or destruction. This includes encryption, firewalls, and
            secure storage practices.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>7. Third-Party Sharing:</strong> We do not sell or rent your
            data. Data may be shared with trusted service providers under strict
            confidentiality agreements and only for purposes of improving your
            experience or complying with legal obligations.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>8. User Rights:</strong> You may access, correct, or delete
            your personal information by contacting us at
            support@faceanalyze.ai. We respect your rights and provide an easy
            mechanism to control your data.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>9. Children's Privacy:</strong> Our services are not
            directed to individuals under the age of 13. We do not knowingly
            collect personal information from children. If we learn that we have
            collected data from a child, we will take steps to delete such
            information promptly.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>10. Changes to Policy:</strong> We reserve the right to
            modify this Privacy Policy at any time. Updates will be posted on
            this page with the date of revision. We encourage users to review
            this policy periodically.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>11. Contact Us:</strong> For any questions, concerns, or to
            exercise your data rights, please email us at{" "}
            <a href="mailto:support@faceanalyze.ai">support@faceanalyze.ai</a>.
            We are here to help.
          </Typography>

          <Divider sx={{ marginY: 3 }} />

          <Typography
            level="body-lg"
            sx={{ marginBottom: 2, fontWeight: 600, fontSize: 20 }}
          >
            <strong>💼 Commercial Use and API Access:</strong>
            <br />
            We offer powerful APIs and commercial-grade tools for enterprises,
            research institutions, and app developers. If you're interested in
            accessing high-volume facial analysis, real-time verification, or
            white-label solutions — contact our business team at{" "}
            <a href="mailto:business@faceanalyze.ai">business@faceanalyze.ai</a>
            .
          </Typography>

          <Typography
            level="body-lg"
            sx={{ marginBottom: 2, fontWeight: 600, fontSize: 20 }}
          >
            <strong>🔒 Our Commitment to Privacy:</strong>
            <br />
            At FaceAnalyze, your trust is everything. Our systems are audited
            regularly, and we comply with major data privacy laws including
            GDPR, CCPA, and more. We never sell your data, and we keep
            everything transparent.
          </Typography>

          <Typography
            level="body-lg"
            sx={{ marginBottom: 2, fontWeight: 600, fontSize: 20 }}
          >
            <strong>🌐 Global Reach, Local Sensitivity:</strong>
            <br />
            Whether you're based in Europe, the Americas, or Asia, our
            infrastructure is designed to comply with local legal requirements
            and deliver fast, reliable services anywhere in the world.
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
