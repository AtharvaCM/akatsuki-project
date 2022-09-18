import React from "react";

// For Icons
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";

// assets
import Logo from "../../assets/images/logo.png";
import Flag from "../../assets/images/flag.png";

// MUI
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// react router
import { useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

// actions
import { setLogin } from "../../store/loginSlice";

// path constants
import { ROUTES } from "../../utils/constants/routingPathConstants";

const Header = () => {
  // selector
  const { isAuthenticated, username, avatar } = useSelector(
    (state) => state.login
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN_PAGE);
  };

  //for showing menu we are taking this to identify button is clicked
  const [isMenuButtonClicked, setIsMenuButtonClicked] = React.useState(null);

  const open = Boolean(isMenuButtonClicked);

  //click on arrow menu will appear
  const handleClick = (event) => {
    setIsMenuButtonClicked(event.currentTarget);
  };

  //after click on some menuItem list will disappear
  const handleClose = () => {
    setIsMenuButtonClicked(null);
  };

  // logut button clicked
  const handleLogoutClick = () => {
    // empty the login slice
    console.log("Logout clicked");
    dispatch(
      setLogin({
        isAuthenticated: null,
        username: null,
        userId: null,
        token: null,
        avatar: null,
      })
    );

    // remove isAuthenticated and token from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    localStorage.removeItem("username");

    // redirect to login page
    navigate(ROUTES.LOGIN_PAGE, { replace: true });
  };

  return (
    <AppBar color="default" position="sticky" style={{ boxShadow: "none" }}>
      <Toolbar>
        <Box
          component="img"
          alt="Img"
          src={Logo}
          style={styles.brandLogo}
          onClick={() => navigate(ROUTES.HOME)}
        />
        <Typography
          variant="h6"
          style={styles.brand}
          onClick={() => navigate(ROUTES.HOME)}
        >
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
            <Avatar style={{ marginRight: 12 }} src={avatar}></Avatar>
            <Typography>{username}</Typography>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={isMenuButtonClicked}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={styles.menuPaperProps}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutClick}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
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
  menuPaperProps: {
    elevation: 0,
    sx: {
      overflow: "visible",
      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: "''",
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  },
};

export default Header;
