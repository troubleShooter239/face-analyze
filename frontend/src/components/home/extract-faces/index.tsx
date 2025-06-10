import React, { useState } from "react";
import { ExtractFacesResult } from "../../../common/types/ai";
import axios from "axios";
import { EXTRACT } from "../../../utils/constants";
import Header from "../../header";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/joy";
import { UploadFile } from "@mui/icons-material";
import { Divider, FormControlLabel } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";
import FaceIcon from "@mui/icons-material/Face";
import SecurityIcon from "@mui/icons-material/Security";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CropFreeIcon from "@mui/icons-material/CropFree";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const ExtractFacesComponent = () => {
  const [image, setImage] = useState<File | null>(null); // Загруженное изображение
  const [loading, setLoading] = useState(false); // Статус загрузки
  const [results, setResults] = useState<ExtractFacesResult[] | null>(null); // Результаты обработки
  const [error, setError] = useState<string | null>(null); // Ошибка, если возникнет

  const [antiSpoofing, setAntiSpoofing] = useState(false); // Состояние для anti-spoofing

  // Обработчик для загрузки файла
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
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
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("img", image);

    try {
      const response = await axios.post(EXTRACT, formData, {
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
      setError("Произошла ошибка при обработке изображения: спуф-атака");
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
            Detect and extract faces from any image with high precision. <br />
            Our advanced face extraction engine locates facial regions,
            pinpoints eye positions and anti-spoofing! <br />
            <br />
            Perfect for integration into security systems, attendance
            monitoring, user authentication, and AI-powered photography
            solutions.
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <img
            src="https://i.ibb.co/23Y2nyQv/detector-outputs-20240414.jpg"
            alt="extract-faces"
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
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
        </Box>

        {/* Превью загруженного изображения */}
        {image && (
          <Box sx={{ textAlign: "center", marginBottom: 4 }}>
            <img
              src={URL.createObjectURL(image)}
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
            disabled={loading || !image}
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
            {results.map((face: ExtractFacesResult, index: number) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 3,
                  padding: 2,
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="soft">
                  <FaceIcon fontSize="small" sx={{ mr: 1 }} />
                  Face {index + 1}
                </Typography>

                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="soft">
                    <SecurityIcon fontSize="small" sx={{ mr: 1 }} />
                    Confidence: {face.confidence.toFixed(2)}
                  </Typography>

                  {typeof face.is_real === "boolean" && (
                    <Typography variant="soft">
                      <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                      Is Real: {face.is_real ? "Yes" : "No"}
                    </Typography>
                  )}

                  {typeof face.antispoof_score === "number" && (
                    <Typography variant="soft">
                      <HelpOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                      Antispoof Score: {face.antispoof_score.toFixed(2)}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="soft">
                    <CropFreeIcon fontSize="small" sx={{ mr: 1 }} />
                    Facial area: x={face.facial_area.x}, y={face.facial_area.y},
                    w={face.facial_area.w}, h={face.facial_area.h}
                  </Typography>

                  {face.facial_area.left_eye && (
                    <Typography variant="soft">
                      <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} />
                      Left eye: x={face.facial_area.left_eye[0]}, y=
                      {face.facial_area.left_eye[1]}
                    </Typography>
                  )}

                  {face.facial_area.right_eye && (
                    <Typography variant="soft">
                      <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} />
                      Right eye: x={face.facial_area.right_eye[0]}, y=
                      {face.facial_area.right_eye[1]}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
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
            <h1>All extracted faces:</h1>
            {results.map((result, index) => (
              <div key={index} style={styles.card}>
                <h3>Face #{index + 1}</h3>

                <p>
                  <strong>Confidence:</strong> {result.confidence}
                </p>

                {typeof result.is_real === "boolean" && (
                  <p>
                    <strong>Is Real:</strong> {result.is_real ? "Yes" : "No"}
                  </p>
                )}

                {typeof result.antispoof_score === "number" && (
                  <p>
                    <strong>Antispoof Score:</strong> {result.antispoof_score}
                  </p>
                )}

                <div>
                  <h4>Facial Area:</h4>
                  <p>
                    Coordinates: ({result.facial_area.x}, {result.facial_area.y}
                    )
                  </p>
                  <p>
                    Width: {result.facial_area.w}, Height:{" "}
                    {result.facial_area.h}
                  </p>
                </div>

                {result.facial_area.left_eye && (
                  <div>
                    <h4>Left Eye:</h4>
                    <p>
                      x: {result.facial_area.left_eye[0]}, y:{" "}
                      {result.facial_area.left_eye[1]}
                    </p>
                  </div>
                )}

                {result.facial_area.right_eye && (
                  <div>
                    <h4>Right Eye:</h4>
                    <p>
                      x: {result.facial_area.right_eye[0]}, y:{" "}
                      {result.facial_area.right_eye[1]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </Box>
        )}

        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            How AI Face Extractor Works
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
            <li>
              <strong style={{ color: "#0B6BCB" }}>Upload Your Image:</strong>{" "}
              Drag and drop a photo (JPG, PNG, etc.) into our secure interface.
            </li>
            <li>
              <strong style={{ color: "#0B6BCB" }}>Run Face Detection:</strong>{" "}
              Our system identifies all faces in the image and captures detailed
              region coordinates, including optional eye positions.
            </li>
            <li>
              <strong style={{ color: "#0B6BCB" }}>
                Review Detection Results:
              </strong>{" "}
              Instantly see detected face areas, detection confidence, and
              optional anti-spoofing indicators.
            </li>
          </ol>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our face extraction AI runs securely in the cloud and uses multiple
            deep learning models to detect facial regions with precision. <br />
            When enabled, it can also verify face authenticity using
            anti-spoofing techniques and provide confidence metrics, ensuring
            reliable real-time <br />
            face data — all within <i>under 2 seconds per image</i>.
          </p>
        </div>
        <Typography
          level="body-md"
          sx={{
            marginTop: 20,
            marginBottom: 10,
            backgroundColor: "#f9fafb",
            borderRadius: 8,
            padding: 3,
            textAlign: "center",
          }}
        >
          <strong>Looking for commercial use or API integration?</strong> <br />
          <br />
          We offer scalable <strong>enterprise plans</strong> and
          high-performance APIs for businesses, startups, and research
          institutions. Whether you need to process thousands of images daily or
          require priority support, we’ve got you covered. <br />
          <br />
          For pricing, API keys, service-level agreements, or technical
          integration questions — please reach out to us at{" "}
          <a href="mailto:contact@yourdomain.com" style={{ color: "#0B6BCB" }}>
            morgun2282@gmail.com
          </a>{" "}
          and we’ll be happy to assist you.
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <Typography level="body-sm" sx={{ fontStyle: "italic", color: "#666" }}>
          FaceAnalyze — we gonna find all of you.
        </Typography>
      </Container>
    </>
  );
};

export default ExtractFacesComponent;
