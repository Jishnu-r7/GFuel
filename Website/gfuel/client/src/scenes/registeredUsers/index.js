import React, { useState, useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";
import Header from "../../components/Header";
import { mockDataEmployees } from "../../data/mockData";
import { mirage } from "ldrs";
mirage.register();

const RegisteredUsers = ({ employerID }) => {
  const [loading, setLoading] = useState(true); // State for loading
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = () => {
      // Simulate a delay to mimic fetching data
      setTimeout(() => {
        // Filter employees based on employerID
        const employees = mockDataEmployees.filter(
          (employee) => employee.EmployerId === employerID
        );
        setFilteredEmployees(employees);
        setLoading(false); // Set loading to false after data is fetched
      }, 1000); // Simulated delay of 1 second
    };

    fetchEmployees();
  }, [employerID]);

  return (
    <Box m="20px">
      <Header
        title="Registered Users"
        subtitle={`Employees of ${employerID}`}
      />
      {loading ? ( // Show loading indicator if data is being fetched
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "75vh", // Adjust the height as needed
          }}
        >
          <l-mirage
            size="60"
            speed="2.5"
            color="secondary"
          ></l-mirage>
        </div>
      ) : (
        <Box>
          {filteredEmployees.map((employee, index) => (
            <Box
              key={employee._id.$oid}
              p="16px"
              mb="16px"
              border="1px solid #ccc"
            >
              <Typography variant="h5" marginBottom="5px" color="secondary">
                {employee.EmployeeName}
              </Typography>
              <Typography>ID: {employee.EmployeeId}</Typography>
              <Typography>Email: {employee.EmployeeEmail}</Typography>
              <Typography>Phone: {employee.EmployeePhone}</Typography>
              <Typography>Position: {employee.EmployeePosition}</Typography>
              <Typography>
                Monthly Allowance: {employee.EmployeeMonthlyAllowance}
              </Typography>
              {index !== filteredEmployees.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RegisteredUsers;
