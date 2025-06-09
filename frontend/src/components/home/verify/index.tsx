import React, { useState } from "react";
import { FaceVerificationResult } from "../../../common/types/ai";
import axios from "axios";
import { VERIFY } from "../../../utils/constants";
import Header from "../../header";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/joy";
import { UploadFile } from "@mui/icons-material";
import { Divider, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FaceIcon from "@mui/icons-material/Face";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CropFreeIcon from "@mui/icons-material/CropFree";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ImageIcon from "@mui/icons-material/Image";

const VerifyComponent = () => {
  const [image1, setImage1] = useState<File | null>(null); // Загруженное изображение
  const [image2, setImage2] = useState<File | null>(null); // Второе изображение
  const [loading, setLoading] = useState(false); // Статус загрузки
  const [results, setResults] = useState<FaceVerificationResult | null>(null); // Результаты обработки
  const [error, setError] = useState<string | null>(null); // Ошибка, если возникнет

  const [antiSpoofing, setAntiSpoofing] = useState(false); // Состояние для anti-spoofing

  // Обработчик для загрузки файла
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage1(e.target.files[0]);
      setImage2(e.target.files[1]);
      setResults(null); // Очистка результатов при новой загрузке
      setError(null); // Очистка ошибки
    }
  };

  // Обработчик для изменения состояния anti-spoofing
  const handleAntiSpoofingChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAntiSpoofing(event.target.checked);
  };

  // Отправка изображения на сервер
  const handleSubmit = async () => {
    if (!image1 || !image2) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("img1", image1);
    formData.append("img2", image2);

    try {
      const response = await axios.post(VERIFY, formData, {
        params: {
          token: localStorage.getItem("token")!,
          anti_spoofing: antiSpoofing,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResults(response.data);
      setLoading(false);
    } catch (err: any) {
      console.log(err.message);
      setError("Произошла ошибка при обработке изображения");
      setLoading(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
    },
    card: {
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    },
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {/* Заголовок и описание */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Typography
            level="h2"
            sx={{ marginBottom: 2, color: "mediumslateblue" }}
          >
            FaceAnalyze - AI processing images
          </Typography>
          <Typography level="body-lg" sx={{ marginBottom: 8 }}>
            Loved by over 1 million users
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              marginBottom: 6,
              backgroundColor: "#f0f4f8",
              borderRadius: 8,
            }}
          >
            Verify identity by comparing two facial images using advanced neural
            networks. <br />
            Our system analyzes facial features, calculates similarity distance,
            and determines whether the two images represent the same person —
            all in a matter of seconds.
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <img
            src="https://i.ibb.co/C5vZmF8j/ID-verification-2773188637.png"
            alt="face-verify"
            style={{
              height: 420,
              width: "fit-content",
            }}
          />
        </Box>
        {/* <ImageMarquee /> */}

        {/* Кнопка для загрузки изображения */}
        <Box sx={{ textAlign: "center", marginBottom: 4, marginTop: 12 }}>
          <Button component="label" variant="soft" color="primary">
            <UploadFile />
            Upload
            <input
              multiple
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        {/* Превью загруженного изображения */}
        {image1 && (
          <Box sx={{ textAlign: "center", marginBottom: 4 }}>
            <img
              src={URL.createObjectURL(image1)}
              alt="Uploaded preview"
              style={{
                maxWidth: "480px",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}
        {image2 && (
          <Box sx={{ textAlign: "center", marginBottom: 4 }}>
            <img
              src={URL.createObjectURL(image2)}
              alt="Uploaded preview"
              style={{
                maxWidth: "480px",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}

        {/* Форма для anti-spoofing */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={antiSpoofing}
                onChange={handleAntiSpoofingChange}
              />
            }
            label="Enable Anti-Spoofing"
          />
        </Box>

        {/* Кнопка для отправки изображения на сервер */}
        <Box sx={{ textAlign: "center", marginBottom: 16 }}>
          <Button
            variant="soft"
            color="neutral"
            onClick={handleSubmit}
            disabled={loading || (!image1 && !image2)}
          >
            {loading ? (
              <CircularProgress size={"md"} sx={{ color: "white" }} />
            ) : (
              "Extract Faces"
            )}
          </Button>
        </Box>

        {/* Результаты анализа */}
        {results && !loading && (
          <Box
            sx={{
              padding: 3,
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: 4,
            }}
          >
            <Typography level="h3" sx={{ marginBottom: 2 }}>
              Summary:
            </Typography>
            {results && (
              <Box
                sx={{
                  marginBottom: 3,
                  padding: 2,
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="soft">
                  <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                  Verified: {results.verified ? "Yes" : "No"}
                </Typography>

                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="soft">
                    <SecurityIcon fontSize="small" sx={{ mr: 1 }} />
                    Distance: {results.distance.toFixed(4)}
                  </Typography>

                  <Typography variant="soft">
                    <CropFreeIcon fontSize="small" sx={{ mr: 1 }} />
                    Threshold: {results.threshold}
                  </Typography>

                  <Typography variant="soft">
                    <FaceIcon fontSize="small" sx={{ mr: 1 }} />
                    Model: {results.model}
                  </Typography>

                  <Typography variant="soft">
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    Time: {results.time.toFixed(2)}s
                  </Typography>
                </Box>

                <Box sx={{ marginTop: 2 }}>
                  {Object.entries(results.facial_areas).map(
                    ([imgKey, region], idx) => (
                      <Box key={imgKey} sx={{ marginBottom: 1 }}>
                        <Typography variant="soft">
                          <ImageIcon fontSize="small" sx={{ mr: 1 }} />
                          {imgKey.toUpperCase()} Region: x={region.x}, y=
                          {region.y}, w={region.w}, h={region.h}
                        </Typography>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Ошибка */}
        {error && !loading && (
          <Box
            sx={{
              padding: 3,
              borderRadius: "8px",
              border: "1px solid red",
              backgroundColor: "#f8d7da",
              marginTop: 4,
            }}
          >
            <Typography level="h4" sx={{ color: "red" }}>
              {error}
            </Typography>
          </Box>
        )}
        {results && (
          <Box>
            <h1>Face Verification Result:</h1>
            <div style={styles.card}>
              <h3>Verification</h3>

              <p>
                <strong>Verified:</strong> {results.verified ? "Yes" : "No"}
              </p>

              <p>
                <strong>Distance:</strong> {results.distance}
              </p>

              <p>
                <strong>Threshold:</strong> {results.threshold}
              </p>

              <p>
                <strong>Model:</strong> {results.model}
              </p>

              <p>
                <strong>Time:</strong> {results.time}s
              </p>

              <div>
                <h4>Facial Areas:</h4>
                {Object.entries(results.facial_areas).map(([imgKey, area]) => (
                  <div key={imgKey} style={{ marginBottom: "1em" }}>
                    <h5>{imgKey.toUpperCase()}:</h5>
                    <p>
                      Coordinates: ({area.x}, {area.y})
                    </p>
                    <p>
                      Width: {area.w}, Height: {area.h}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Box>
        )}

        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            How Face Verification Works
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
            <li>
              <strong style={{ color: "#0B6BCB" }}>Upload Two Images:</strong>{" "}
              Select or drag and drop two facial images to compare. Supported
              formats include JPG and PNG.
            </li>
            <li>
              <strong style={{ color: "#0B6BCB" }}>Start Verification:</strong>{" "}
              Our model will extract facial embeddings and compute similarity
              using state-of-the-art metrics.
            </li>
            <li>
              <strong style={{ color: "#0B6BCB" }}>
                Get Verification Result:
              </strong>{" "}
              View whether the faces are verified as the same person, including
              confidence score, distance, and model info.
            </li>
          </ol>
          <p className="text-gray-600 text-sm leading-relaxed">
            This face verification tool uses{" "}
            <i>high-precision deep learning models</i> to compare facial
            embeddings. <br />
            All processing is done in the cloud, requiring no special hardware
            or installation. <br />
            Results are typically ready in <i>under 2 seconds</i> and include
            both raw distance scores and clear pass/fail outcomes.
          </p>
        </div>

        <Typography
          level="body-md"
          sx={{
            marginTop: 20,
            marginBottom: 10,
            backgroundColor: "#fff8e1",
            borderRadius: 8,
            padding: 3,
          }}
        >
          <strong>Use Cases:</strong>
          <br />
          <br />
          🔐 <strong>Identity Verification:</strong> Compare two facial images
          to verify if they belong to the same person.
          <br />
          🕵️‍♂️ <strong>Anti-Spoofing:</strong> Protect your platform from fake
          identities and deepfakes.
          <br />
          📸 <strong>Smart Cropping:</strong> Automatically extract and center
          faces from user photos.
          <br />
          🏫 <strong>Education & Research:</strong> Use our API for experiments
          in machine learning, biometrics, or computer vision.
          <br />
          🏢 <strong>Access Control:</strong> Seamless integration with door
          locks, security cameras, and employee monitoring systems.
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <Typography level="body-sm" sx={{ fontStyle: "italic", color: "#666" }}>
          FaceAnalyze — 2 == '2'.
        </Typography>
      </Container>
    </>
  );
};

export default VerifyComponent;
