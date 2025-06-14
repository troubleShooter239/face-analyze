import React, { useState } from "react";
import { ExtractFacesResult } from "../../../common/types/ai";
import axios from "axios";
import { EXTRACT } from "../../../utils/constants";
import Header from "../../header";
import { Box, Button, CircularProgress, Container, Typography } from "@mui/joy";
import { UploadFile } from "@mui/icons-material";
import {
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
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
            Обработка изображений с помощью ИИ{" "}
          </Typography>
          <Typography level="body-lg" sx={{ marginBottom: 8 }}>
            Любимец огромного количества пользователей!{" "}
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              marginBottom: 6,
              backgroundColor: "#f0f4f8",
              borderRadius: 8,
              fontSize: 20,
            }}
          >
            Обнаруживайте и извлекайте лица с изображений с высокой точностью.{" "}
            <br />
            Наш продвинутый движок определения лиц находит области лиц,
            определяет положение глаз и поддерживает антиспуфинг! <br />
            <br />
            Идеально подходит для интеграции в системы безопасности, учёта
            посещаемости, аутентификации пользователей и решений на основе ИИ.
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center", boxShadow: "5px 5px 5px 5px gray" }}>
          <img
            src="https://i.ibb.co/23Y2nyQv/detector-outputs-20240414.jpg"
            alt="extract-faces"
            style={{
              height: 500,
              width: "fit-content",
            }}
          />
        </Box>
        <Typography sx={{ marginTop: 4, marginBottom: 6, fontSize: 20 }}>
          Распознавание и выравнивание лиц являются важными ранними этапами
          современного конвейера распознавания лиц. Эксперименты показывают, что
          обнаружение повышает точность распознавания лиц до 42%, а выравнивание
          — до 6%. Детекторы OpenCV, Ssd, Dlib, MtCnn, Faster MtCnn, RetinaFace,
          MediaPipe, Yolo, YuNet и CenterFace обернуты в "Глубокий Анализ Лица
          Человека".
        </Typography>

        {/* Кнопка для загрузки изображения */}
        <Box sx={{ textAlign: "center", marginBottom: 4, marginTop: 12 }}>
          <Button component="label" variant="soft" color="primary">
            <UploadFile />
            Загрузить файл
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
            sx={{ gap: 1 }}
            control={
              <Checkbox
                checked={antiSpoofing}
                onChange={handleAntiSpoofingChange}
              />
            }
            label="Защита от спуф-атак"
          />
        </Box>

        {/* Кнопка для отправки изображения на сервер */}
        <Box sx={{ textAlign: "center", marginBottom: 16 }}>
          <Button
            onClick={handleSubmit}
            disabled={loading || !image}
            sx={{ fontSize: 18 }}
          >
            {loading ? (
              <CircularProgress size={"md"} sx={{ color: "white" }} />
            ) : (
              "Найти лица"
            )}
          </Button>
        </Box>
        {results && !loading && (
          <Box
            sx={{
              padding: 3,
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: 4,
              gap: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography level="h2">Результаты</Typography>
            {results.map((face, index) => (
              <Box
                key={index}
                sx={{
                  padding: 4,
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography fontSize="22px">
                  <FaceIcon fontSize="small" sx={{ mr: 1 }} />
                  Лицо: № {index + 1}
                </Typography>

                <Box sx={{ marginTop: 2 }}>
                  <Typography fontSize="22px">
                    <SecurityIcon fontSize="small" sx={{ mr: 1 }} />
                    Уверенность: {face.confidence.toFixed(2)}
                  </Typography>

                  {typeof face.is_real === "boolean" && (
                    <Typography fontSize="22px">
                      <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                      Реальное лицо: {face.is_real ? "Yes" : "No"}
                    </Typography>
                  )}

                  {typeof face.antispoof_score === "number" && (
                    <Typography fontSize="22px">
                      <HelpOutlineIcon fontSize="small" sx={{ mr: 1 }} />
                      Оценка анти-спуфа: {face.antispoof_score.toFixed(2)}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ marginTop: 2 }}>
                  <Typography fontSize="22px">
                    <CropFreeIcon fontSize="small" sx={{ mr: 1 }} />
                    Регион лица(координаты): X: {face.facial_area.x}, Y:{" "}
                    {face.facial_area.y}, W: {face.facial_area.w}, H:{" "}
                    {face.facial_area.h}
                  </Typography>

                  {face.facial_area.left_eye && (
                    <Typography fontSize="22px">
                      <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} />
                      Левый глаз: X: {face.facial_area.left_eye[0]}, Y:{" "}
                      {face.facial_area.left_eye[1]}
                    </Typography>
                  )}

                  {face.facial_area.right_eye && (
                    <Typography fontSize="22px">
                      <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} />
                      Правый глаз: X: {face.facial_area.right_eye[0]}, Y:{" "}
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
        <Box
          sx={{
            fontSize: 20,
            color: "text.primary",
          }}
        >
          <Typography gutterBottom fontWeight="bold" fontSize={24}>
            Как работает ИИ экстрактор лиц
          </Typography>

          <List sx={{ listStyleType: "decimal", pl: 2 }}>
            <ListItem sx={{ display: "list-item", py: 1 }}>
              <ListItemText
                primary={
                  <>
                    <Typography
                      component="span"
                      fontWeight="bold"
                      color="primary"
                      fontSize={20}
                    >
                      Загрузите изображение:
                    </Typography>{" "}
                    Просто перетащите JPG, PNG или другие форматы изображений в
                    наш защищённый интерфейс.
                  </>
                }
              />
            </ListItem>
            <ListItem sx={{ display: "list-item", py: 1 }}>
              <ListItemText
                primary={
                  <>
                    <Typography
                      component="span"
                      fontWeight="bold"
                      color="primary"
                      fontSize={20}
                    >
                      Запустите распознавание лиц:
                    </Typography>{" "}
                    Наша система определит все лица на изображении и зафиксирует
                    точные координаты.
                  </>
                }
              />
            </ListItem>
            <ListItem sx={{ display: "list-item", py: 1 }}>
              <ListItemText
                primary={
                  <>
                    <Typography
                      component="span"
                      fontWeight="bold"
                      color="primary"
                      fontSize={20}
                    >
                      Оцените результаты:
                    </Typography>{" "}
                    Мгновенно получите области обнаруженных лиц, уровень
                    уверенности и (опционально) показатели защиты от подделок.
                  </>
                }
              />
            </ListItem>
          </List>

          <Typography mt={3} fontSize={20}>
            Наш ИИ для извлечения лиц безопасно работает в облаке и использует
            несколько моделей глубокого обучения для точного определения
            областей лиц. При включении также осуществляется проверка
            подлинности лица с помощью методов антиспуфинга и предоставляются
            метрики уверенности, обеспечивая надёжные данные в реальном времени.
          </Typography>
        </Box>
        <Typography
          level="body-md"
          sx={{
            marginTop: 20,
            marginBottom: 10,
            backgroundColor: "#f9fafb",
            borderRadius: 8,
            padding: 3,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          <strong>Нужна коммерческая версия или интеграция с API?</strong>{" "}
          <br />
          <br />
          Мы предлагаем масштабируемые <strong>корпоративные тарифы</strong> и
          высокопроизводительные API для бизнеса, стартапов и исследовательских
          организаций. Независимо от того, нужно ли вам обрабатывать тысячи
          изображений в день или требуется приоритетная поддержка — мы поможем.{" "}
          <br />
          <br />
          По вопросам цен, получения API-ключей, соглашений об уровне
          обслуживания (SLA) или технической интеграции — свяжитесь с нами по
          адресу{" "}
          <a href="mailto:morgun2282@gmail.com" style={{ color: "#0B6BCB" }}>
            morgun2282@gmail.com
          </a>
          , и мы с радостью вам поможем.
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />

        <Typography level="body-sm" sx={{ fontStyle: "italic", color: "#666" }}>
          Глубокий анализ лица человека — мы найдём всех.
        </Typography>
      </Container>
    </>
  );
};

export default ExtractFacesComponent;
