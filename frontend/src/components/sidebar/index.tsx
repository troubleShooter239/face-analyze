import React from "react";
import Drawer from "@mui/joy/Drawer";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import {
  Box,
  DialogTitle,
  Divider,
  ListItemButton,
  ModalClose,
} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  useAuth({ validUrl: "", nonValidUrl: "/sign-in" });
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const storageItem = localStorage.getItem("token");
  if (!storageItem) {
    navigate("/sign-in");
    return null;
  }

  const token: any = jwtDecode(storageItem);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };
  return (
    <>
      <IconButton
        sx={{ mr: 1 }}
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <Menu />
      </IconButton>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        component="nav"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="soft"
        anchor="left"
      >
        <ModalClose />
        <DialogTitle>Меню</DialogTitle>

        <Box role="presentation" sx={{ p: 2 }}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate("/analyze")}>
                Анализатор
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate("/extract-faces")}>
                Экстрактор лиц
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate("/verify")}>
                Верификатор
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate("/about-us")}>
                О нас
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate("/privacy-policy")}>
                Политика конфиденциальности
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate("/terms-of-use")}>
                Правила пользования{" "}
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ListItemButton onClick={logout}>
                {token.email} - Выйти из аккаунта?
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
