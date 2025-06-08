import React, { useState } from "react";
import { AnalyzeProcessedFace } from "../../../common/types/ai";
import axios from "axios";
import { ANALYZE } from "../../../utils/constants";
import Header from "../../header";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/joy";
import { UploadFile } from "@mui/icons-material";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/joy/Checkbox";

const AnalyzeComponent = () => {
  const [image, setImage] = useState<File | null>(null); // Загруженное изображение
  const [loading, setLoading] = useState(false); // Статус загрузки
  const [results, setResults] = useState<AnalyzeProcessedFace[] | null>(null); // Результаты обработки
  const [error, setError] = useState<string | null>(null); // Ошибка, если возникнет
  const [selectedActions, setSelectedActions] = useState({
    emotion: true,
    age: true,
    gender: true,
    race: true,
  });

  const [antiSpoofing, setAntiSpoofing] = useState(false); // Состояние для anti-spoofing

  // Обработчик для загрузки файла
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setResults(null); // Очистка результатов при новой загрузке
      setError(null); // Очистка ошибки
    }
  };

  // Обработчик для изменений в чекбоксах
  const handleActionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedActions({
      ...selectedActions,
      [event.target.name]: event.target.checked,
    });
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

    const actions: [string, string, string, string] = [
      selectedActions.emotion ? "emotion" : "",
      selectedActions.age ? "age" : "",
      selectedActions.gender ? "gender" : "",
      selectedActions.race ? "race" : "",
    ].filter(Boolean) as [string, string, string, string];

    try {
      const response = await axios.post(ANALYZE, formData, {
        params: {
          actions,
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
          <Typography level="body-lg" sx={{ marginBottom: 10 }}>
            Loved by over 1 million users
          </Typography>
          <Typography level="body-lg" sx={{ marginBottom: 16 }}>
            Instantly decode visual content with our intelligent technology that
            analyzes, identifies, and extracts valuable insights from any image
            with remarkable accuracy.
          </Typography>
        </Box>

        {/* Кнопка для загрузки изображения */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
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
                maxWidth: "420px",
                height: "300px",
                borderRadius: "8px",
              }}
            />
          </Box>
        )}

        {/* Форма для выбора метрик и anti-spoofing */}
        <Box
          sx={{
            textAlign: "center",
            marginBottom: 4,
            // display: "flex",
            // flexDirection: "column",
            // alignItems: "start",
          }}
        >
          <Typography level="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
            Select metrcis for analysis:
          </Typography>
          <div>
            <FormControlLabel
              sx={{ gap: 1 }}
              control={
                <Checkbox
                  checked={selectedActions.emotion}
                  onChange={handleActionChange}
                  name="emotion"
                />
              }
              label="Emotion"
            />
            <FormControlLabel
              sx={{ gap: 1 }}
              control={
                <Checkbox
                  checked={selectedActions.age}
                  onChange={handleActionChange}
                  name="age"
                />
              }
              label="Age"
            />
            <FormControlLabel
              sx={{ gap: 1 }}
              control={
                <Checkbox
                  checked={selectedActions.gender}
                  onChange={handleActionChange}
                  name="gender"
                />
              }
              label="Gender"
            />
            <FormControlLabel
              sx={{ gap: 1 }}
              control={
                <Checkbox
                  checked={selectedActions.race}
                  onChange={handleActionChange}
                  name="race"
                />
              }
              label="Race"
            />
          </div>
        </Box>

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
              "Analyze"
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
              Result:
            </Typography>
            {results.map((face, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: 3,
                  padding: 2,
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="soft">Лицо {index + 1}</Typography>
                <Box sx={{ marginTop: 2 }}>
                  {/* Отображение возраста */}
                  {selectedActions.age && (
                    <Typography variant="soft">Age: {face.age}</Typography>
                  )}
                  {selectedActions.age && (
                    <Typography variant="soft">
                      Age confidence: {face.face_confidence.toFixed(2)}
                    </Typography>
                  )}

                  {/* Отображение пола */}
                  {selectedActions.gender && (
                    <Typography variant="soft">
                      Gender: {face.dominant_gender} (Gender confidence:{" "}
                      {face.gender[face.dominant_gender].toFixed(2)})
                    </Typography>
                  )}

                  {/* Эмоции */}
                  {selectedActions.emotion && (
                    <Typography variant="soft">
                      Emotion: {face.dominant_emotion} (Confidence:{" "}
                      {face.emotion[face.dominant_emotion].toFixed(2)})
                    </Typography>
                  )}

                  {/* Раса */}
                  {selectedActions.race && (
                    <Typography variant="soft">
                      Race: {face.dominant_race} (Confidence:{" "}
                      {face.race[face.dominant_race].toFixed(2)})
                    </Typography>
                  )}
                </Box>
                {/* Отображение региона лица (координаты) */}
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="soft">
                    Face region: x={face.region.x}, y={face.region.y}, w=
                    {face.region.w}, h={face.region.h}
                  </Typography>
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
            <h1>Received Data:</h1>
            {results.map((result, index) => (
              <div key={index} style={styles.card}>
                <h3>Face #{index + 1}</h3>
                <p>
                  <strong>Age:</strong> {result.age}
                </p>
                <p>
                  <strong>Gender:</strong> {result.dominant_gender}
                </p>
                <p>
                  <strong>Emotion:</strong> {result.dominant_emotion}
                </p>
                <p>
                  <strong>Race:</strong> {result.dominant_race}
                </p>
                <p>
                  <strong>Face Confidence:</strong> {result.face_confidence}
                </p>

                <div>
                  <h4>Gender Breakdown:</h4>
                  <ul>
                    {Object.entries(result.gender).map(
                      ([gender, confidence], idx) => (
                        <li key={idx}>
                          {gender}: {confidence}%
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4>Emotion Breakdown:</h4>
                  <ul>
                    {Object.entries(result.emotion).map(
                      ([emotion, confidence], idx) => (
                        <li key={idx}>
                          {emotion}: {confidence}%
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4>Race Breakdown:</h4>
                  <ul>
                    {Object.entries(result.race).map(
                      ([race, confidence], idx) => (
                        <li key={idx}>
                          {race}: {confidence}%
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4>Region:</h4>
                  <p>
                    ({result.region.x}, {result.region.y})
                  </p>
                  <p>
                    Width: {result.region.w}, Height: {result.region.h}
                  </p>
                </div>
              </div>
            ))}
          </Box>
        )}
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            How AI Image Analyzer Works
          </h3>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-6">
            <li>
              <strong style={{ color: "#0B6BCB" }}>Upload Your Image:</strong>{" "}
              Simply drag and drop your JPG, PNG, or other image formats into
              our secure interface.
            </li>
            <li>
              <strong style={{ color: "#0B6BCB" }}>
                Select Analysis Metrics:
              </strong>{" "}
              Choose between a lot of different metrics for your purpose.
            </li>
            <li>
              <strong style={{ color: "#0B6BCB" }}>Review Results:</strong>{" "}
              Within seconds, receive detailed insights about your image's
              content.
            </li>
          </ol>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our image analyzer AI <i>free version</i> processes everything in
            the cloud, eliminating the need for powerful local hardware or
            specialized software installations. The system uses{" "}
            <i>multiple neural networks</i> working in parallel to ensure both
            accuracy and speed, with results typically delivered in{" "}
            <i>under 2 seconds per image</i>.
          </p>
        </div>
      </Container>
    </>
  );
};

export default AnalyzeComponent;
