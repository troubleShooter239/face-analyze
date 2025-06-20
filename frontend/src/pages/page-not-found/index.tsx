import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Header from "../../components/header";
import Sad from "../../assets/Sad";
import useAuth from "../../hooks/useAuth";

const PageNotFound = () => {
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
          404 - Страница не найдена
        </Typography>
        <Sad />
        <div style={{ maxWidth: "700px", textAlign: "start" }}>
          <Typography level="body-lg" sx={{ my: 2 }}>
            ОЙ-ей. Страница не найдена!
          </Typography>
          <Typography level="body-md" sx={{ marginBottom: 1 }}>
            Возможно, страница больше не доступна.
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default PageNotFound;
