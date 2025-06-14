import React, { useState } from "react";
import { FaceVerificationResult } from "../../../common/types/ai";
import axios from "axios";
import { VERIFY } from "../../../utils/constants";
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
    if (!image1 || !image2) {
      setError("Недостаточное количество фотографий!");
      return;
    }
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
      setError("Произошла ошибка при обработке изображения: спуф-атака");
      setLoading(false);
    }
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
            }}
          >
            Проверьте личность, сравнив два изображения лица с помощью
            продвинутых нейронных сетей. <br />
            Наша система анализирует черты лица, вычисляет коэффициент сходства
            и определяет, изображён ли на фотографиях один и тот же человек —
            всего за несколько секунд.
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            boxShadow: "5px 5px 5px 5px gray",
            padding: 8,
          }}
        >
          <img
            src="https://i.ibb.co/C5vZmF8j/ID-verification-2773188637.png"
            alt="face-verify"
            style={{
              height: 420,
              width: "fit-content",
            }}
          />
        </Box>
        {/* Кнопка для загрузки изображения */}
        <Box sx={{ textAlign: "center", marginBottom: 4, marginTop: 12 }}>
          <Button component="label" variant="soft" color="primary">
            <UploadFile />
            Загрузить файлы
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
            disabled={loading || (!image1 && !image2)}
            sx={{ fontSize: 18 }}
          >
            {loading ? (
              <CircularProgress size={"md"} sx={{ color: "white" }} />
            ) : (
              "Верификация лиц"
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
              gap: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography level="h2">Результаты</Typography>
            {results && (
              <Box
                sx={{
                  padding: 4,
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Box sx={{ marginTop: 2, backgroundColor: "" }}>
                  <Typography fontSize="22px">
                    <CheckCircleIcon fontSize="small" sx={{ mr: 2 }} />
                    Один и тот же человек: {results.verified ? "ДА" : "НЕТ"}
                  </Typography>
                  <Typography fontSize="22px">
                    <SecurityIcon fontSize="small" sx={{ mr: 2 }} />
                    Расстояние: {results.distance.toFixed(2)}
                  </Typography>

                  <Typography fontSize="22px">
                    <CropFreeIcon fontSize="small" sx={{ mr: 2 }} />
                    Пороговое значение: {results.threshold}
                  </Typography>
                  <Typography fontSize="22px">
                    <FaceIcon fontSize="small" sx={{ mr: 2 }} />
                    Используемая модель: {results.model}
                  </Typography>

                  <Typography fontSize="22px">
                    <AccessTimeIcon fontSize="small" sx={{ mr: 2 }} />
                    Занятое время: {results.time.toFixed(2)}s
                  </Typography>
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
        <Typography gutterBottom fontWeight="bold" fontSize={24}>
          Как работает ИИ верификация лиц
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
                    Загрузите 2 изображения:
                  </Typography>{" "}
                  Выберите или перетащите два изображения лица для сравнения.
                  Поддерживаемые форматы включают JPG и PNG.
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
                    Запустите верификацию:
                  </Typography>{" "}
                  Наша модель извлечет вложения лиц и вычислит сходство,
                  используя самые современные метрики.
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
                    Просмотрите результаты верификации:
                  </Typography>{" "}
                  Посмотрите, верифицированы ли лица как один и тот же человек,
                  включая оценку достоверности, расстояние и информацию о
                  модели.
                </>
              }
            />
          </ListItem>
        </List>
        <Typography mt={3} fontSize={20}>
          Этот инструмент проверки лиц использует{" "}
          <i>высокоточные модели глубокого обучения</i> для сравнения лиц.{" "}
          <br />
          Вся обработка выполняется в облаке, не требуя специального
          оборудования или установки. <br />
          Результаты обычно готовы <i>менее чем за 2 секунды</i> и включают как
          необработанные оценки расстояния, так и четкие результаты
          прохождения/провала.
        </Typography>

        <Typography
          level="body-md"
          sx={{
            marginTop: 20,
            marginBottom: 10,
            backgroundColor: "#fff8e1",
            borderRadius: 8,
            padding: 3,
            fontSize: 20,
          }}
        >
          <strong>Сценарии использования:</strong>
          <br />
          <br />
          🔐 <strong>Проверка личности:</strong> Сравнивайте два изображения
          лиц, чтобы определить, принадлежат ли они одному человеку.
          <br />
          🕵️‍♂️ <strong>Защита от подделок:</strong> Защитите вашу платформу от
          фальшивых личностей и дипфейков.
          <br />
          📸 <strong>Умная обрезка:</strong> Автоматически извлекайте и
          центрируйте лица на пользовательских фотографиях.
          <br />
          🏫 <strong>Образование и исследования:</strong> Используйте наш API
          для экспериментов в области машинного обучения, биометрии или
          компьютерного зрения.
          <br />
          🏢 <strong>Контроль доступа:</strong> Легкая интеграция с дверными
          замками, камерами наблюдения и системами мониторинга сотрудников.
        </Typography>

        <Divider sx={{ marginBottom: 3 }} />
        <Typography level="body-sm" sx={{ fontStyle: "italic", color: "#666" }}>
          Глубокий анализ лица человека — 2 == '2'.
        </Typography>
      </Container>
    </>
  );
};

export default VerifyComponent;
