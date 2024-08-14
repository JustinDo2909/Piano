import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  TextField,
  Snackbar,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Box,
} from "@mui/material";
import { Close, MoreVert } from "@mui/icons-material";
import customerData from "../../Data/Customer.json";
import styled from "styled-components";

const Customer = () => {
  const [customers, setCustomers] = useState(customerData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const GreenTableCell = styled(TableCell)`
  color: green;
  font-size: 16px;
`;

const CustomTableCell = ({ children, ...props }) => (
  <TableCell
    sx={{
      padding: "2px 4px", // Reduce padding to make cells smaller
      fontSize: "0.75rem", // Optional: Reduce font size for smaller appearance
      whiteSpace: "nowrap", // Prevent text from wrapping
      overflow: "hidden", // Hide overflow text
      textOverflow: "ellipsis", // Add ellipsis for overflow text
    }}
    {...props}
  >
    {children}
  </TableCell>
);
  const handleOpenModal = (customer = null) => {
    setIsEditMode(!!customer);
    setCurrentCustomer(
      customer || {
        idCustomer: "",
        nameCustomer: "",
        NumberOfPlayed: "",
        HourPlayed: "",
        CreateDate: "",
        favorite_artists: [],
      }
    );
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentCustomer(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveCustomer = (event) => {
    event.preventDefault();
    if (isEditMode) {
      // Update existing customer
      setCustomers(
        customers.map((customer) =>
          customer.idCustomer === currentCustomer.idCustomer
            ? currentCustomer
            : customer
        )
      );
      setSnackbarMessage("Customer updated successfully.");
    } else {

      setCustomers([
        ...customers,
        { ...currentCustomer, idCustomer: customers.length + 1 },
      ]);
      setSnackbarMessage("Customer added successfully.");
    }
    setSnackbarOpen(true);
    handleCloseModal();
  };

  const handleDeleteCustomer = (idCustomer) => {
    setCustomers(
      customers.filter((customer) => customer.idCustomer !== idCustomer)
    );
    setSnackbarMessage("Customer deleted successfully.");
    setSnackbarOpen(true);
  };

  const handleClick = (event, customer) => {
    setAnchorEl(event.currentTarget);
    setCurrentCustomer(customer);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentCustomer(null);
  };

  return (
    <Box style={{ minHeight: "92vh", padding: 0 }}>
      <Box style={{ padding: 24, margin: "24px auto", background: "rgba(255, 255, 255, 0.8)", borderRadius: "8px", maxWidth: 1200 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Manage Customers
        </Typography>

        <Button
          variant="contained"
          onClick={() => handleOpenModal()}
          sx={{ mb: 2, color: 'black' , backgroundColor: '#2ECBFF', fontWeight: 'bold' }}
        >
          Add Customer
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <GreenTableCell>Name</GreenTableCell>
                <GreenTableCell>Number of Plays</GreenTableCell>
                <GreenTableCell>Hours Played</GreenTableCell>
                <GreenTableCell>Create Date</GreenTableCell>
                <GreenTableCell>Favorite Artists</GreenTableCell>
                <GreenTableCell>Actions</GreenTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.idCustomer}>
                  <CustomTableCell sx={{fontWeight: 'bold' , fontSize: '15px'}}>{customer.nameCustomer}</CustomTableCell>
                  <CustomTableCell sx={{ fontSize: '15px'}}>{customer.NumberOfPlayed}</CustomTableCell>
                  <CustomTableCell sx={{ fontSize: '15px'}}>{customer.HourPlayed}</CustomTableCell>
                  <CustomTableCell sx={{ fontSize: '15px'}}>{customer.CreateDate}</CustomTableCell>
                  <CustomTableCell sx={{fontWeight: 'bold' , fontSize: '15px'}}>
                    {customer.favorite_artists
                      .map((artist) => artist.nameArtist)
                      .join(", ")}
                  </CustomTableCell>
                  <CustomTableCell>
                    <IconButton onClick={(event) => handleClick(event, customer)}>
                      <MoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && currentCustomer?.idCustomer === customer.idCustomer}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleOpenModal(customer)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDeleteCustomer(customer.idCustomer)}>Delete</MenuItem>
                    </Menu>
                  </CustomTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={isModalVisible}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 600,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {isEditMode ? "Edit Customer" : "Add New Customer"}
            </Typography>
            <form onSubmit={handleSaveCustomer}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Customer Name"
                  name="nameCustomer"
                  value={currentCustomer?.nameCustomer || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Number of Plays"
                  name="NumberOfPlayed"
                  type="number"
                  value={currentCustomer?.NumberOfPlayed || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Hours Played"
                  name="HourPlayed"
                  type="number"
                  value={currentCustomer?.HourPlayed || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Create Date"
                  name="CreateDate"
                  type="date"
                  value={currentCustomer?.CreateDate || ""}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Favorite Artists (Comma Separated)"
                  name="favorite_artists"
                  value={
                    currentCustomer?.favorite_artists
                      .map((artist) => artist.nameArtist)
                      .join(", ") || ""
                  }
                  onChange={(event) => {
                    const names = event.target.value
                      .split(",")
                      .map((name) => name.trim());
                    setCurrentCustomer((prevState) => ({
                      ...prevState,
                      favorite_artists: names.map((name, index) => ({
                        idArtist: (index + 1).toString().padStart(3, "0"),
                        nameArtist: name,
                      })),
                    }));
                  }}
                  fullWidth
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                {isEditMode ? "Update Customer" : "Add Customer"}
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Customer;
