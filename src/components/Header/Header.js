import { React, useState } from "react";

// For Icons
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

// assets
import Logo from "../../assets/images/logo.png";
import Flag from "../../assets/images/flag.png";
import Profile from "../../assets/images/user.png";

// MUI
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

// react router
import { useNavigate } from "react-router-dom";

// path constants
import { ROUTES } from "../../utils/constants/routingPathConstants";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = () => {
    setIsLogin(true);
  };

  const redirectToHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <AppBar color="default" style={{ boxShadow: "none" }} position="static">
      <Toolbar>
        <Box
          component="img"
          alt="Img"
          src={Logo}
          style={styles.brandLogo}
          onClick={redirectToHome}
        />
        <Typography variant="h6" style={styles.brand} onClick={redirectToHome}>
          Hotel Guide
        </Typography>
        <Typography color="text.secondary" style={styles.appRegion}>
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

const styles = {
  brandLogo: {
    cursor: "pointer",
    marginRight: "10px",
  },
  brand: {
    cursor: "pointer",
  },
  appRegion: { fontSize: 13, marginLeft: "auto", marginRight: 12 },
};

export default Header;
