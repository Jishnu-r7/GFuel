import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./scenes/LoginPage";
//import RegistrationForm from "./RegistrationFormDEL";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Settled from "./scenes/Settled";
import Pending from "./scenes/pending";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ComplaintForm from "./scenes/complaint/userindex";
import EmployeePending from "./scenes/pending/employeeIndex";
import EmployeeSettled from "./scenes/Settled/employeeIndex";
import EmployerComplaints from "./scenes/complaintsDisplay";
import RegisteredUsers from "./scenes/registeredUsers";


import RequireAuth from "./general/RequireAuth";
import PersistLogin from "./general/PersistLogin";

import useAuth from "../src/hooks/useAuth";


const ROLES = {
  'User': 2001,
  'Admin': 5150,
}

function AuthenticatedLayout({ children }) {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <div className="inner-content">{children}</div>
      </main>
    </div>
  );
}


function App() {
  const [theme, colorMode] = useMode();

  const { auth } = useAuth();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {/* Unauthenticated Routes */}
          <Route path="/" element={<LoginPage />} />

          {/* <Route path="/login" element={<LoginPage />} /> */}

          {/* <Route path="/register" element={<RegistrationForm />} /> */}

          {/* Authenticated Routes */}

          <Route element={<PersistLogin />}></Route>

          <Route
            path="/*"
            element={
              <AuthenticatedLayout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/employer/settled"
                    element={<Settled employerID={auth.EmployerId} />}
                  />
                  <Route
                    path="/employee/settled"
                    element={<EmployeeSettled empID={auth.EmployeeId} />}
                  />
                  <Route
                    path="/employer/pending"
                    element={<Pending employerID={auth.EmployerId} />}
                  />
                  <Route
                    path="/employee/pending"
                    element={<EmployeePending empID={auth.EmployeeId} />}
                  />
                  <Route path="/form" element={<Form />} />
                  <Route
                    path="/complaint"
                    element={<ComplaintForm empID={auth.EmployeeId} />}
                  />
                  <Route
                    path="/employerComplaints"
                    element={
                      <EmployerComplaints employerID={auth.EmployerId} />
                    }
                  />
                  <Route
                    path="/employerComplaints"
                    element={
                      <EmployerComplaints employerID={auth.EmployerId} />
                    }
                  />
                  <Route
                    path="/registeredUsers"
                    element={
                      <RegisteredUsers employerID={auth.EmployerId} />
                    }
                  />
                </Routes>
              </AuthenticatedLayout>
            }
          />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
