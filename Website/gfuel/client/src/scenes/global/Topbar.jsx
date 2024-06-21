import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useNavigate } from "react-router-dom";

const Topbar = ({ setIsSidebar }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Navigate to the login page after logout
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Existing code */}
      {/* ICONS */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
      {/* Logout Button and Text */}
      <Box display="flex" alignItems="center">
        <Typography
          variant="body1"
          onClick={handleLogout}
          sx={{ cursor: "pointer" }}
        >
          Logout
        </Typography>
        <IconButton onClick={handleLogout}>
          <ExitToAppOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;

// {/* SEARCH BAR
// <Box
//   display="flex"
//   backgroundColor={colors.primary[400]}
//   borderRadius="3px"
// >
//   <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
//   <IconButton type="button" sx={{ p: 1 }}>
//     <SearchIcon />
//   </IconButton>
// </Box> */}

// {/* ICONS */}
