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
          О нас
        </Typography>
        <Divider sx={{ marginBottom: 3 }} />
        <Box sx={{ maxWidth: "800px", textAlign: "start" }}>
          <Typography level="body-lg" sx={{ marginBottom: 3 }}>
            Добро пожаловать в <strong>Глубокий Анализ Лица Человека</strong> —
            место, где искусственный интеллект встречается с человеческим
            выражением. Мы — команда увлечённых инженеров ИИ, исследователей и
            новаторов, движимая одной целью: сделать анализ лица более
            доступным, надёжным и глубоким, чем когда-либо прежде.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2 }}>
            Наша платформа использует передовые модели глубокого обучения для
            анализа черт лица, выражений и эмоций — всего за считаные секунды.
            Хотите ли вы подтвердить личность, выявить подделку или создать
            более умный продукт — <strong>Глубокий Анализ Лица Человека</strong>{" "}
            предлагает вам мощные инструменты, основанные на науке и передовых
            технологиях.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2 }}>
            Мы верим в этичный ИИ. Ваши данные обрабатываются безопасно, никогда
            не передаются третьим лицам и всегда используются только в ваших
            интересах. Наша миссия — <i>строить доверие через прозрачность</i>.
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
            🌍 Кому мы помогаем
          </Typography>

          <ul style={{ marginLeft: "1rem", marginBottom: "2rem" }}>
            <li>
              <strong>Разработчики и стартапы:</strong> Легко интегрируйте
              проверку лица в свои приложения через наш быстрый и современный
              API.
            </li>
            <li>
              <strong>Предприятия:</strong> Используйте наше масштабируемое
              облачное решение для защиты и идентификации клиентов в реальном
              времени.
            </li>
            <li>
              <strong>Исследователи:</strong> Исследуйте параметры лица и
              эмоциональные данные с высокой точностью.
            </li>
            <li>
              <strong>Обычные пользователи:</strong> Интересно, что скажет ИИ о
              вашем лице? Загрузите селфи и узнайте!
            </li>
          </ul>

          <Typography
            level="h2"
            sx={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 2 }}
          >
            🚀 Инновации в основе
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2 }}>
            Глубокий Анализ Лица Человека постоянно развивается. Мы
            экспериментируем, проводим исследования и внедряем модели, обученные
            на миллионах лиц из разных слоёв общества. Наш ИИ обучен быть
            инклюзивным, справедливым и репрезентативным.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2 }}>
            Благодаря продвинутому обнаружению подделок, определению ключевых
            точек лица и отслеживанию эмоций, мы прокладываем путь для
            следующего поколения приложений на основе анализа лица.
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
            🤝 Давайте строить будущее вместе
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 3 }}>
            FaceAnalyze — это не просто инструмент, а платформа для создателей,
            мечтателей и новаторов. Наш подход с приоритетом на API, подробная
            документация и поддерживающая команда позволяют легко интегрировать
            интеллектуальный анализ лица в любые процессы.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 4 }}>
            <strong>Есть вопрос?</strong> Нужна демонстрация? Интересуетесь{" "}
            <strong>коммерческой лицензией</strong> или индивидуальным решением?
            Напишите нам на{" "}
            <a href="mailto:contact@faceanalyze.ai">contact@faceanalyze.ai</a> —
            будем рады пообщаться!
          </Typography>

          <Divider sx={{ marginBottom: 3 }} />

          <Typography
            level="body-sm"
            sx={{ fontStyle: "italic", color: "#666" }}
          >
            Глубокий Анализ Лица Человека — ИИ с человеческим лицом.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default AboutUs;
