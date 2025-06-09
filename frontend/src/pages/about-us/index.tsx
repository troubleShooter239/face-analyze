import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Header from "../../components/header";
import { Divider } from "@mui/joy";
import useAuth from "../../hooks/useAuth";

const AboutUs = () => {
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
          sx={{ fontSize: "3rem", fontWeight: "bold", marginBottom: 2 }}
        >
          About Us
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <Box sx={{ maxWidth: "800px", textAlign: "start" }}>
          <Typography level="body-lg" sx={{ marginBottom: 3 }}>
            Welcome to <strong>FaceAnalyze</strong> — where artificial
            intelligence meets human expression. We are a team of passionate AI
            engineers, researchers, and visionaries driven by a single goal:
            making facial analysis more accessible, reliable, and insightful
            than ever before.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2 }}>
            Our platform uses state-of-the-art deep learning models to analyze
            facial features, expressions, and emotions — all within seconds.
            Whether you're verifying identity, detecting spoofing, or building a
            smarter product, <strong>FaceAnalyze</strong> offers you powerful
            tools backed by science and cutting-edge tech.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2 }}>
            We believe in ethical AI. Your data is processed securely, never
            shared with third parties, and always used to serve your interests.
            Our mission is to build <i>trust through transparency</i>.
          </Typography>

          <Typography
            level="h2"
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginTop: 4,
              marginBottom: 2,
            }}
          >
            🌍 Who We Help
          </Typography>

          <ul style={{ marginLeft: "1rem", marginBottom: "2rem" }}>
            <li>
              <strong>Developers & Startups:</strong> Easily integrate facial
              verification into your apps via our fast, modern API.
            </li>
            <li>
              <strong>Enterprises:</strong> Use our scalable cloud engine to
              protect and identify customers in real time.
            </li>
            <li>
              <strong>Researchers:</strong> Explore facial metrics and emotional
              data with precision and accuracy.
            </li>
            <li>
              <strong>Everyday Users:</strong> Curious about your own face?
              Upload a selfie and discover what AI sees.
            </li>
          </ul>

          <Typography
            level="h2"
            sx={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 2 }}
          >
            🚀 Innovation at Our Core
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2 }}>
            FaceAnalyze continuously improves. We experiment, research, and
            deploy models trained on millions of faces from diverse backgrounds.
            Our AI is trained to be inclusive, fair, and representative.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2 }}>
            With advanced spoofing detection, facial landmark mapping, and
            emotion tracking, we’re paving the way for the next generation of
            face-based applications.
          </Typography>

          <Typography
            level="h2"
            sx={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginTop: 4,
              marginBottom: 2,
            }}
          >
            🤝 Let’s Build the Future Together
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 3 }}>
            FaceAnalyze is not just a tool — it’s a platform for builders,
            dreamers, and creators. Our API-first approach, robust
            documentation, and supportive team make it easy for anyone to
            integrate facial intelligence into their workflows.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 4 }}>
            <strong>Have a question?</strong> Need a demo? Interested in our{" "}
            <strong>commercial license</strong> or custom solution? Reach out to
            us at{" "}
            <a href="mailto:contact@faceanalyze.ai">contact@faceanalyze.ai</a> —
            we’d love to hear from you!
          </Typography>

          <Divider sx={{ marginBottom: 3 }} />

          <Typography
            level="body-sm"
            sx={{ fontStyle: "italic", color: "#666" }}
          >
            FaceAnalyze — AI with a human face.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AboutUs;
