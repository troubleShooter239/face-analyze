import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Logo from "../../assets/Logo";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar";
import { Sheet } from "@mui/joy";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Sheet
      component="header"
      variant="outlined"
      sx={{ p: 3, display: "flex", justifyContent: "space-between" }}
    >
      <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
        <Sidebar />
        <IconButton
          variant="soft"
          color="primary"
          size="sm"
          onClick={() => navigate("/")}
        >
          <Logo />
        </IconButton>
        <Typography level="title-lg">Глубокий анализ лица человека</Typography>
      </Box>
    </Sheet>
  );
};

export default Header;
