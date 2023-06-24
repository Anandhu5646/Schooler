import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ClassIcon from "@mui/icons-material/Class";
import SubjectIcon from "@mui/icons-material/Subject";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from 'react-router-dom';

const drawerWidth = 330;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const drawerItems = [
    { text: "Dashboard", icon: <DashboardIcon />, to: "/" },
    { text: "Faculty", icon: <GroupIcon />, to: "/faculty" },
    { text: "Students", icon: <GroupIcon />, to: "/students" },
    { text: "Clubs", icon: <LocalLibraryIcon />, to: "/clubs" },
    { text: "Club-request", icon: <SchoolIcon />, to: "/club-requests" },
    { text: "Notice", icon: <WarningAmberIcon />, to: "/notice" },
    { text: "Classes", icon: <ClassIcon />, to: "/classes" },
    { text: "Subjects", icon: <SubjectIcon />, to: "/subjects" },
    { text: "Check complain", icon: <NotificationImportantIcon />, to: "/complain" },
    { text: "Verify email", icon: <EmailIcon />, to: "/verify-email" },
    { text: "Logout", icon: <LogoutIcon />, to: "/logout" },
  ];
  

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ background: "#212A3E", color: "white" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="white"
            style={{ color: "white" }}
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color={"white"} noWrap component="div">
            SCHOOL MANAGEMENT SYSTEM-ADMIN PANEL
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          className="d-flex justify-content-between w-100 ps-4"
          style={{ background: "#212A3E", color: "#fff" }}
        >
          <h5>Schooler</h5>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ color: "white" }} color="white" />
            ) : (
              <ChevronLeftIcon style={{ color: "white" }} color="white" />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List style={{ background: "#F1F6F9", height: "100%" }}>
          {drawerItems.map((item, index) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                display: "block",
                borderRadius: "5px",
                marginBottom: "20px",
                marginTop: "20px",
                width: "95%",
                marginLeft: "10px",

                backgroundColor:
                  selectedItem === index ? "#212A3E" : "transparent",
                color: selectedItem === index ? "#fff" : "transparent",
                "&:hover": {
                  backgroundColor: "#212A3E",
                  color: "white",
                },
              }}
            >
              <ListItemButton
                className={`listItem an-list-item ${
                  selectedItem === index && "active"
                }`}
                selected={selectedItem === index}
                onClick={() => handleItemClick(index)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  backgroundColor:
                    selectedItem === index ? "#fff" : "transparent",
                  color: selectedItem === index ? "#fff" : "transparent",
                  "&:hover": {
                    backgroundColor: "#212A3E",
                    color: "white",
                  },
                }}
              >
                <ListItemIcon
                  className="icon"
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography></Typography>
      </Box>
    </Box>
  );
}
export default Sidebar;
