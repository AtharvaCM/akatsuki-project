import React from "react";

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

// redux
import { useSelector } from "react-redux";

// path constants
import { ROUTES } from "../../utils/constants/routingPathConstants";

const Header = () => {
  // selector
  const { isAuthenticated, username } = useSelector((state) => state.login);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN_PAGE);
  };

  return (
    <AppBar color="default" position="sticky" style={{ boxShadow: "none" }}>
      <Toolbar>
        <Box component="img" alt="Img" src={Logo} style={styles.brandLogo} />
        <Typography variant="h6" style={styles.brand}>
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
        {isAuthenticated ? (
          <>
            <Avatar style={{ marginRight: 12 }} src={Profile}></Avatar>
            <Typography>{username}</Typography>
          </>
        ) : (
          <Button variant="contained" size="medium" onClick={handleLoginClick}>
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
