import { React, useState } from "react";

// For Icons
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import Logo from "../../Image/logo.png";
import Flag from "../../Image/flag.png";
import Profile from "../../Image/user.png";

// For Custom UI
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Avatar,
  Divider,
  Button,
} from "@mui/material";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const onChangeHandler = () => {
    setIsLogin(true);
  };
  return (
    <AppBar color="default" style={{ boxShadow: "none" }}>
      <Toolbar>
        <Box component="img" alt="Img" src={Logo} style={{ marginRight: 10 }} />
        <Typography variant="h6">Hotel Guide</Typography>
        <Typography
          color="text.secondary"
          style={{ fontSize: 13, marginLeft: "auto", marginRight: 12 }}
        >
          EURO
        </Typography>
        <Box component="img" alt="Img" src={Flag} style={{ marginRight: 10 }} />
        <NotificationsActiveOutlinedIcon />
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        {isLogin ? (
          <>
            <Avatar style={{ marginRight: 12 }} src={Profile}></Avatar>
            <Typography>Adam Grant</Typography>
          </>
        ) : (
          <Button variant="contained" size="medium" onClick={onChangeHandler}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
