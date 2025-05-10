import React from 'react';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import {Box, DialogTitle, Divider, ListItemButton, ModalClose} from '@mui/joy';
import IconButton from "@mui/joy/IconButton";
import Menu from '@mui/icons-material/Menu';
import {useNavigate} from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const token: any = jwtDecode(localStorage.getItem("token")!);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  }
  return (
    <>
      <IconButton sx={{mr: 1}} variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        <Menu/>
      </IconButton>
      <Drawer open={open} onClose={() => setOpen(false)}
              component='nav'
              sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: 240,
                  boxSizing: 'border-box',
                },
              }}
              variant="soft"
              anchor="left">
        <ModalClose/>
        <DialogTitle>Menu</DialogTitle>

        <Box role="presentation" sx={{p: 2}}>
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate('/analyze')}>Analyze</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/extract-faces')}>Extract faces</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/verify')}>Verify</ListItemButton>
            </ListItem>
          </List>
          <Divider/>
          <List>
            <ListItem>
              <ListItemButton onClick={() => navigate('/about-us')}>About us</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/privacy-policy')}>Privacy policy</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={() => navigate('/terms-of-use')}>Terms of use</ListItemButton>
            </ListItem>
          </List>
          <Divider/>
          <List>
            <ListItem>
              <ListItemButton onClick={logout}>{token.email} - Log out?</ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>);
};

export default Sidebar;
