import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { MoreVert, SearchOutlined } from "@mui/icons-material";
import {
  addUser,
  deleteUserById,
  getUsers,
  updateUser,
} from "../../util/ApiFunction";
import FlexBetween from "../../components/FlexBetween";
import useDebounce from "../../util/Debounce";
import { SnackbarError, SnackbarSuccess } from "../../components/Snackbar";
import UsersModal from "./UserModal";

const { styled } = require("@mui/system");

const formatDate = (dateString) => {
  if (!dateString) return ""; // Handle empty or undefined date
  const [month, day, year] = dateString.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const UserActionsMenu = ({ user, handleOpenModal, handleOpenDialog }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOpenModal(user)}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenDialog(user);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const GreenTableCell = styled(TableCell)`
  color: green;
  font-size: 16px;
`;

const Users = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [data, setData] = useState({
    users: [],
    totalPage: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [inputSearch, setInputSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const inputSearchDebounced = useDebounce(inputSearch, 300);

  const fetchUsers = useCallback(async () => {
    try {
      const result = await getUsers(
        currentPage,
        rowsPerPage,
        inputSearchDebounced
      );
      if (result !== undefined) {
        setData({
          users: result.users,
          totalPage: result.totalPage,
        });
      }
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarType("error");
    }
  }, [currentPage, rowsPerPage, inputSearchDebounced]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenModal = (user = null) => {
    setIsEditMode(!!user);
    setCurrentUser(
      user
        ? {
            ...user,
            dateOfBirth: formatDate(user.dateOfBirth),
          }
        : {
            id: "",
            userName: "",
            email: "",
            passwordHash: "",
            phoneNumber: "",
            name: "",
            dateOfBirth: "",
            role: "",
            image: "",
          }
    );
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOpenDialog = (user) => {
    setUserToDelete(user.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const handleSaveCustomer = async (event) => {
    event.preventDefault();
    try {
      if (isEditMode) {
        // Update existing customer
        console.log(currentUser);
        const result = await updateUser(currentUser);
        if (result.message !== undefined) {
          fetchUsers();
          setSnackbarMessage("User Edited successfully.");
          setSnackbarType("success");
          handleCloseModal();
        }
      } else {
        console.log(currentUser);
        const result = await addUser(currentUser);
        if (result.message !== undefined) {
          fetchUsers();
          setSnackbarMessage("User added successfully.");
          setSnackbarType("success");
          handleCloseModal();
        }
      }
    } catch (error) {
      setSnackbarMessage(
        isEditMode ? "Error Update User!!" : "Error Add User!!"
      );
      setSnackbarType("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleDelete = async () => {
    try {
      const result = await deleteUserById(userToDelete);
      if (result !== undefined) {
        fetchUsers();
        handleCloseDialog();
        setSnackbarMessage(`User ${userToDelete} deleted successfully.`);
        setSnackbarType("success");
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage("Error Delete User!!!");
      setSnackbarType("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Box style={{ height: "94vh", padding: 0 }}>
      <Box
        style={{
          padding: 24,
          // margin: "24px auto",
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "8px",
        }}
      >
        <SnackbarSuccess
          open={snackbarOpen && snackbarType === "success"}
          message={snackbarMessage}
          handleClose={handleCloseSnackbar}
        />

        <SnackbarError
          open={snackbarOpen && snackbarType === "error"}
          message={snackbarMessage}
          handleClose={handleCloseSnackbar}
        />

        <Typography variant="h4" align="center" gutterBottom>
          Manage Users
        </Typography>

        <FlexBetween>
          <Button
            variant="contained"
            onClick={() => handleOpenModal()}
            sx={{
              mb: 1,
              color: "black",
              backgroundColor: "#2ECBFF",
              fontWeight: "bold",
              borderRadius: "99px",
            }}
          >
            Add User
          </Button>
          <Box
            display="flex"
            width="20%"
            border="1px solid black"
            borderRadius="30px"
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              onChange={(e) => {
                setInputSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchOutlined />
            </IconButton>
          </Box>
        </FlexBetween>

        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <GreenTableCell>Id</GreenTableCell>
                <GreenTableCell>Name</GreenTableCell>
                <GreenTableCell>User Name</GreenTableCell>
                <GreenTableCell>Email</GreenTableCell>
                <GreenTableCell>Phone Number</GreenTableCell>
                {/* <GreenTableCell>Date Of Number</GreenTableCell> */}
                <GreenTableCell>Roles</GreenTableCell>
                <GreenTableCell>Actions</GreenTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.length > 0 ? (
                data.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {user.id}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>
                      {user.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {user.userName}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {user.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: "12px" }}>
                      {user.phoneNumber}
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "12px" }}>
                      {user.roles.map((role) => role).join(", ")}
                    </TableCell>
                    <TableCell>
                      <UserActionsMenu
                        handleOpenDialog={handleOpenDialog}
                        handleOpenModal={handleOpenModal}
                        user={user}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No users available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={10}
                  count={data.totalPage * rowsPerPage}
                  page={currentPage - 1}
                  rowsPerPage={rowsPerPage}
                  onPageChange={(event, newPage) => {
                    setCurrentPage(newPage + 1); // Convert back to one-based index
                  }}
                  onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setCurrentPage(1);
                  }}
                  labelRowsPerPage="Rows per page"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} of ${
                      count !== -1 ? count : `more than ${to}`
                    }`
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <UsersModal
          isModalVisible={isModalVisible}
          handleCloseModal={handleCloseModal}
          isEditMode={isEditMode}
          currentUser={currentUser}
          handleSaveCustomer={handleSaveCustomer}
          handleChange={handleChange}
        />

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDelete}
              color="secondary"
              autoFocus
              variant="contained"
            >
              Delete
            </Button>
            <Button
              onClick={handleCloseDialog}
              color="primary"
              variant="contained"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Users;