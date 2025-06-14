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
          Политика конфиденциальности
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <div style={{ maxWidth: "800px", textAlign: "start" }}>
          <Typography level="body-lg" sx={{ marginBottom: 4, fontSize: 20 }}>
            Ваша конфиденциальность важна для нас. В нашей платформе мы серьезно
            относимся к безопасности ваших данных. Настоящая Политика
            конфиденциальности описывает, как мы собираем, используем, храним и
            защищаем вашу личную информацию во всех наших сервисах.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>1. Сбор информации:</strong> Мы собираем личные данные,
            которые вы предоставляете при регистрации или использовании наших
            сервисов. Это включает, но не ограничивается, адресами электронной
            почты, IP-адресами, предпочтениями, загруженными изображениями и
            метаданными, связанными с использованием.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>2. Обработка изображений лиц:</strong> Загружаемые
            пользователями данные обрабатываются безопасно и не передаются
            третьим лицам и не используются за пределами вашей сессии без вашего
            разрешения. Изображения могут временно храниться для целей
            производительности и анализа, но автоматически удаляются после
            обработки.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>3. Использование данных:</strong> Мы используем ваши данные
            только для улучшения наших сервисов, персонализации вашего опыта и
            предоставления точных результатов анализа. Мы также можем
            использовать агрегированные и анонимные данные в исследовательских и
            разработческих целях.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>4. Файлы cookie и технологии отслеживания:</strong> Мы
            используем cookie-файлы для улучшения функциональности, запоминания
            пользовательских предпочтений и анализа трафика. Вы можете отключить
            cookie в настройках браузера.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>5. Хранение данных:</strong> Личные данные хранятся только
            столько, сколько необходимо для достижения целей их сбора или в
            соответствии с требованиями законодательства.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>6. Защита данных:</strong> Мы применяем отраслевые меры
            безопасности для защиты ваших данных от несанкционированного
            доступа, изменения или уничтожения. Это включает шифрование,
            брандмауэры и безопасное хранение.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>7. Передача третьим лицам:</strong> Мы не продаем и не сдаем
            ваши данные в аренду. Данные могут быть переданы надежным
            поставщикам услуг по строгим соглашениям о конфиденциальности
            исключительно для улучшения ваших впечатлений или выполнения
            юридических обязательств.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>8. Права пользователя:</strong> Вы можете получить доступ,
            исправить или удалить свою личную информацию, связавшись с нами по
            адресу support@faceanalyze.ai. Мы уважаем ваши права и предоставляем
            простой механизм управления данными.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>9. Конфиденциальность детей:</strong> Наши сервисы не
            предназначены для лиц младше 13 лет. Мы не собираем сознательно
            личную информацию от детей. Если станет известно, что такие данные
            были собраны, мы немедленно удалим их.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>10. Изменения политики:</strong> Мы оставляем за собой право
            вносить изменения в настоящую Политику конфиденциальности в любое
            время. Обновления публикуются на этой странице с указанием даты
            изменения. Мы рекомендуем регулярно просматривать политику.
          </Typography>

          <Typography level="body-md" sx={{ marginBottom: 2, fontSize: 20 }}>
            <strong>11. Связь с нами:</strong> По всем вопросам, замечаниям или
            для реализации своих прав в отношении данных напишите нам на адрес{" "}
            <a href="mailto:support@faceanalyze.ai">support@faceanalyze.ai</a>.
            Мы всегда готовы помочь.
          </Typography>

          <Divider sx={{ marginY: 3 }} />

          <Typography
            level="body-lg"
            sx={{ marginBottom: 2, fontWeight: 600, fontSize: 20 }}
          >
            <strong>💼 Коммерческое использование и доступ к API:</strong>
            <br />
            Мы предлагаем мощные API и инструменты корпоративного уровня для
            предприятий, исследовательских учреждений и разработчиков. Если вы
            заинтересованы в высокообъемном анализе лиц, проверке в реальном
            времени или white-label решениях — свяжитесь с нашей бизнес-командой
            по адресу{" "}
            <a href="mailto:business@faceanalyze.ai">business@faceanalyze.ai</a>
            .
          </Typography>

          <Typography
            level="body-lg"
            sx={{ marginBottom: 2, fontWeight: 600, fontSize: 20 }}
          >
            <strong>🔒 Наша приверженность конфиденциальности:</strong>
            <br />В нашем деле ваше доверие — главное. Наши системы регулярно
            проходят аудит и соответствуют основным законам о защите данных,
            включая GDPR, CCPA и другие. Мы никогда не продаем ваши данные и
            сохраняем прозрачность.
          </Typography>

          <Typography
            level="body-lg"
            sx={{ marginBottom: 2, fontWeight: 600, fontSize: 20 }}
          >
            <strong>🌐 Глобальный охват, локальная чувствительность:</strong>
            <br />
            Независимо от того, находитесь ли вы в Европе, Америке или Азии,
            наша инфраструктура соответствует местным юридическим требованиям и
            обеспечивает быструю и надежную работу по всему миру.
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
