import React, { useState } from "react";
import { AnalyzeProcessedFace } from "../../../common/types/ai";
import axios from "axios";
import { ANALYZE } from "../../../utils/constants";
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
import ImageMarquee from "../../img-marquee";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SecurityIcon from "@mui/icons-material/Security";
import WcIcon from "@mui/icons-material/Wc";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PublicIcon from "@mui/icons-material/Public";

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
    let response: any;
    try {
      response = await axios.post(ANALYZE, formData, {
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
            sx={{ marginBottom: 2, color: "mediumslateblue", fontSize: 40 }}
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
            Мгновенно распознавайте визуальный контент с помощью нашей
            интеллектуальной технологии, которая анализирует, идентифицирует и
            извлекает ценные сведения из любого изображения с поразительной
            точностью.
          </Typography>
        </Box>
        <ImageMarquee />

        <Typography sx={{ marginTop: 4, marginBottom: 6, fontSize: 20 }}>
          Анализатор позволяет предсказывать возраст, пол, выражение лица
          (включая злость, страх, спокойствие, грусть, отвращение, радость и
          удивление), а также расу (включая азиатскую, белую, ближневосточную,
          индийскую, латиноамериканскую и афро-американскую).
        </Typography>
        <Typography sx={{ marginTop: 4, marginBottom: 6, fontSize: 20 }}>
          Модель определения возраста имеет среднюю абсолютную ошибку (MAE) ±
          4.65; модель определения пола показывает точность 97.44%, точность по
          положительным классам (precision) — 96.29%, полноту (recall) — 95.05%.
        </Typography>

        {/* Кнопка для загрузки изображения */}
        <Box sx={{ textAlign: "center", marginBottom: 4, marginTop: 12 }}>
          <Button component="label" variant="soft" color="primary">
            <UploadFile />
            Загрузить фото
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
            Выберите метрики для анализа:
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
              label="Эмоции"
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
              label="Возраст"
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
              label="Пол"
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
              label="Раса"
            />
          </div>
        </Box>

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
              "Анализировать"
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
            {results.map((face, index) => (
              <Box
                key={index}
                sx={{
                  padding: 4,
                  borderRadius: "8px",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Typography fontWeight={"bold"} fontSize="24px">
                  Лицо: №{index + 1}
                  <Divider />
                </Typography>
                <Box sx={{ marginTop: 2, backgroundColor: "" }}>
                  {selectedActions.age && (
                    <Typography fontSize="22px">
                      <CalendarTodayIcon fontSize="small" sx={{ mr: 2 }} />
                      Возраст: {face.age} (уверенность:{" "}
                      {(face.face_confidence * 100).toFixed(2)}%)
                    </Typography>
                  )}

                  {selectedActions.gender && (
                    <Typography fontSize="22px">
                      <WcIcon fontSize="small" sx={{ mr: 2 }} />
                      Пол: {face.dominant_gender.toUpperCase()} (уверенность:{" "}
                      {face.gender[face.dominant_gender].toFixed(2)}%)
                    </Typography>
                  )}

                  {selectedActions.emotion && (
                    <Typography fontSize="22px">
                      <EmojiEmotionsIcon fontSize="small" sx={{ mr: 2 }} />
                      Эмоция: {face.dominant_emotion.toUpperCase()}{" "}
                      (уверенность:{" "}
                      {face.emotion[face.dominant_emotion].toFixed(2)}%)
                    </Typography>
                  )}

                  {selectedActions.race && (
                    <Typography fontSize="22px">
                      <PublicIcon fontSize="small" sx={{ mr: 2 }} />
                      Пол: {face.dominant_race.toUpperCase()} (уверенность:{" "}
                      {face.race[face.dominant_race].toFixed(2)}%)
                    </Typography>
                  )}
                </Box>
                {/* Отображение региона лица (координаты) */}
                <Box sx={{ marginTop: 2 }}>
                  <Typography fontSize="22px">
                    Регион лица(координаты): X: {face.region.x}, Y:{" "}
                    {face.region.y}, W: {face.region.w}, H: {face.region.h}
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
        <Box
          sx={{
            fontSize: 20,
            color: "text.primary",
          }}
        >
          <Typography gutterBottom fontWeight="bold" fontSize={24}>
            Как работает ИИ Анализатор
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
                      Выберите метрики анализа:
                    </Typography>{" "}
                    Выберите из множества доступных метрик под вашу задачу.
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
                      Просмотрите результаты:
                    </Typography>{" "}
                    Через несколько секунд получите подробную информацию о
                    содержимом изображения.
                  </>
                }
              />
            </ListItem>
          </List>

          <Typography mt={3} fontSize={20}>
            Наш анализатор изображений в{" "}
            <Typography component="span" fontStyle="italic">
              бесплатной версии
            </Typography>{" "}
            работает в облаке, устраняя необходимость в мощном локальном
            оборудовании или установке специализированного ПО. Система
            использует{" "}
            <Typography component="span" fontStyle="italic">
              несколько нейронных сетей
            </Typography>
            , работающих параллельно, чтобы обеспечить точность и скорость.
            Обычно результаты выдаются{" "}
            <Typography component="span" fontStyle="italic">
              менее чем за 2 секунды на изображение
            </Typography>
            .
          </Typography>
        </Box>
        <Typography
          level="body-md"
          sx={{
            marginTop: 6,
            backgroundColor: "rgb(252, 228, 251)",
            borderRadius: 8,
            padding: 3,
            fontSize: 18,
          }}
        >
          <strong>
            Присоединяйтесь к сотням разработчиков и компаний, уже использующих
            нашу платформу:
          </strong>
          <br />
          <br />
          "Быстро, надежно и невероятно просто интегрировать." –{" "}
          <em>технический директор финтех-стартапа "Криптан"</em>
          <br />
          "Мы заменили три разных модели одним этим API." –{" "}
          <em>руководитель AI-отдела компании "Феста"</em>
          <br />
          "Впечатлены точностью защиты от подделок. Это действительно усилило
          наш KYC-процесс." –{" "}
          <em>Инженер по внедрению инноваций компании "НОВА"</em>
        </Typography>
        <Typography
          level="body-md"
          sx={{
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: "#e8f5e9",
            borderRadius: 8,
            padding: 3,
            fontSize: 18,
          }}
        >
          <strong>
            Почему стоит выбрать нашу технологию распознавания лиц?
          </strong>
          <br />
          <br />
          ✅ Лидерская точность, протестированная на реальных датасетах.
          <br />
          ✅ Молниеносная обработка — менее 0.5 секунды на анализ лица.
          <br />
          ✅ Встроенное обнаружение подделок для предотвращения мошенничества.
          <br />
          ✅ Готовность к масштабированию — от стартапов до крупных компаний.
          <br />
          ✅ Соответствие требованиям GDPR и строгие политики
          конфиденциальности.
          <br />
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <Typography level="body-sm" sx={{ fontStyle: "italic", color: "#666" }}>
          Глубокий анализ лица человека — ИИ, который приносит радость.
        </Typography>
      </Container>
    </>
  );
};

export default AnalyzeComponent;
