import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutline";
import { mockDataEmployer } from "../../data/mockData";

import useAuth from "../../hooks/useAuth";

const Item = ({ title, to, icon, selected, setSelected, auth }) => {
  const handleClick = () => {
    setSelected(title);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={handleClick}
      icon={icon}
    >
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography>{title}</Typography>
      </Link>
    </MenuItem>
  );
};

const Sidebar = () => {
  const { auth } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const employer = mockDataEmployer.find(
    (employer) => employer.EmployerId === auth.EmployerId
  );

  const employerName = employer ? employer.EmployerName : "";

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-inner-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  G - FUEL
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {auth.roles.includes(5150) ? employerName : auth.EmployeeName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {auth.roles.includes(5150) ? "Employer" : "Employee"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/Dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              auth={auth}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Logs
            </Typography>
            <Item
              title="Settled"
              to={
                auth.roles.includes(5150)
                  ? "/employer/settled"
                  : "/employee/settled"
              }
              icon={<CheckCircleOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
              auth={auth}
            />
            <Item
              title="Pending"
              to={
                auth.roles.includes(5150)
                  ? "/employer/pending"
                  : "/employee/pending"
              }
              icon={<PendingActionsIcon />}
              selected={selected}
              setSelected={setSelected}
              auth={auth}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Forms
            </Typography>
            {auth.roles.includes(5150) && (
            <Item
              title="Registered Employees"
              to="/registeredUsers"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              auth={auth}
            />
            )}
            {!auth.roles.includes(5150) && (
              <Item
                title="Complaint Form"
                to="/complaint"
                icon={<FeedbackIcon />}
                selected={selected}
                setSelected={setSelected}
                auth={auth}
              />
            )}
            {auth.roles.includes(5150) && (
              <Item
                title="Complaints"
                to="/employerComplaints"
                icon={<FeedOutlinedIcon/>}
                selected={selected}
                setSelected={setSelected}
                auth={auth}
              />
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;



// <Item
//   title="Profile Form"
//   to="/form"
//   icon={<PersonOutlinedIcon />}
//   selected={selected}
//   setSelected={setSelected}
//   auth={auth}
// />;