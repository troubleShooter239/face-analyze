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
          Условия использования
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <div style={{ maxWidth: "800px", textAlign: "start" }}>
          <Typography level="body-lg" sx={{ marginBottom: 2, fontSize: 22 }}>
            Добро пожаловать в Глубокий Анализ Лица Человека. Получая доступ к
            нашей платформе или используя её, вы принимаете и соглашаетесь с
            настоящими Условиями использования. Пожалуйста, внимательно
            прочитайте их. Если вы не согласны — не пользуйтесь нашими услугами.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>1. Требования к пользователю:</strong> Вам должно быть не
            менее 18 лет или вы должны иметь согласие законного представителя
            для использования наших услуг. Вы подтверждаете, что вся
            предоставленная информация является точной и достоверной.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>2. Ответственное использование:</strong> Пользователи
            обязуются действовать ответственно и этично. Вы соглашаетесь не
            использовать наш сервис во вред другим людям или для незаконной
            деятельности, включая, но не ограничиваясь, биометрическим
            мошенничеством, кражей личности или домогательствами.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>3. Сбор и использование данных:</strong> Мы можем собирать
            изображения лиц, метаданные и аналитику использования для
            предоставления, поддержки и улучшения сервиса. Использование данных
            осуществляется строго в соответствии с нашей Политикой
            конфиденциальности.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>4. Технология распознавания лиц:</strong> Наш сервис
            включает автоматизированный анализ с использованием машинного
            обучения. Хотя мы стремимся к высокой точности, мы не гарантируем
            100% правильность результатов, и они не должны быть единственным
            основанием для юридических или критически важных решений.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>5. Интеллектуальная собственность:</strong> Весь контент,
            модели, код и визуализации являются интеллектуальной собственностью
            Глубокий Анализ Лица Человека. Вы соглашаетесь не копировать, не
            декомпилировать и не перепродавать наше программное обеспечение или
            наборы данных без явного разрешения.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>6. Интеграция с третьими сторонами:</strong> Наша платформа
            может взаимодействовать с сервисами третьих сторон. Мы не несем
            ответственности за их условия, политику конфиденциальности или
            содержание.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>7. Доступность и простои:</strong> Мы стремимся к 99.9%
            времени бесперебойной работы, но не даем гарантий. Плановое
            обслуживание и неожиданные сбои могут происходить без
            предварительного уведомления.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>8. Изменения условий:</strong> Мы можем периодически
            обновлять настоящие условия. Продолжение использования сервиса
            означает принятие всех изменений. Рекомендуем регулярно
            просматривать текущие условия.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>9. Прекращение доступа:</strong> Платформа оставляет за
            собой право приостановить или прекратить ваш доступ в любое время, с
            причиной или без, особенно при подозрении на злоупотребление или
            нарушение закона.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>10. Ограничение ответственности:</strong> Ни при каких
            обстоятельствах платформа не несет ответственности за косвенные,
            случайные или сопутствующие убытки, возникшие в результате
            использования или невозможности использования сервиса.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>11. Коммерческое лицензирование:</strong> Мы предлагаем
            расширенные функции и более высокие лимиты API для коммерческих
            пользователей. Для корпоративных решений, лицензирования SDK или
            кастомных интеграций, пожалуйста, свяжитесь с нашей командой продаж.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 1, fontSize: 20 }}>
            <strong>12. Контакты и поддержка:</strong> Для юридических вопросов,
            запросов на удаление данных или коммерческого сотрудничества
            напишите нам на{" "}
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
            Глубокий анализ лица человека предлагает мощные API для верификации
            лиц, защиту от подделок в реальном времени и технологии
            идентификации, которым доверяют профессионалы по всему миру.
            Создаете ли вы системы верификации для финтеха, инструменты для
            адаптации сотрудников или умное видеонаблюдение — мы готовы
            поддержать ваш рост.
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
            Интересуетесь коммерческим использованием? Ознакомьтесь с нашими
            тарифами Pro с гарантиями SLA, поддержкой кастомных моделей и
            оптовыми ценами. Свяжитесь с нами по адресу{" "}
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
