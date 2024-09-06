import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputBase,
  TableFooter,
  TablePagination,
  Icon,
} from "@mui/material";
import { MoreVert, SearchOutlined, PersonAdd } from "@mui/icons-material";
import {
  addUser,
  deleteUserById,
  getUsers,
  UpdateProfile,
  updateUser,
} from "../../util/ApiFunction";
import FlexBetween from "../../components/FlexBetween";
import useDebounce from "../../util/Debounce";
import { SnackBar } from "../../components/Snackbar";
import UsersModal from "./UserModal";

const { styled } = require("@mui/system");

const formatDate = (dateString) => {
  if (!dateString) return "";
  const [month, day, year] = dateString.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const GreenTableCell = styled(TableCell)`
  color: green;
  font-size: 16px;
`;

const UserActionsMenu = ({ user, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

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
        <MenuItem
          onClick={() => {
            onEdit(user);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(user.id);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const TitleTableCell = styled(TableCell)`
  color: #535C91;
  font-size: 18px;
`;
const ItemTableCell = styled(TableCell)`
  font-size: 12px;
`;

const Users = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "",
  });
  const [data, setData] = useState({ users: [], totalPage: 0 });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  const [dialog, setDialog] = useState({ open: false, userId: null });
  const [inputSearch, setInputSearch] = useState("");

  const inputSearchDebounced = useDebounce(inputSearch, 300);

  const fetchUsers = useCallback(async () => {
    try {
      const result = await getUsers(
        pagination.currentPage,
        pagination.rowsPerPage,
        inputSearchDebounced
      );
      if (result) {
        setData({ users: result.users, totalPage: result.totalPage });
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message, type: "error" });
    }
  }, [pagination.currentPage, pagination.rowsPerPage, inputSearchDebounced]);

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

  const handleSaveUser = async (event) => {
    console.log(currentUser)
    event.preventDefault();
    try {
      console.log( 
        currentUser.userName,
        currentUser.email,
        currentUser.passwordHash,
        currentUser.phoneNumber,
        currentUser.name,
        currentUser.dateOfBirth,
        currentUser.role,
        currentUser.image)
      const result = isEditMode
        ? await UpdateProfile(
          currentUser.id,
          currentUser.userName,
          currentUser.email,
          currentUser.phoneNumber,
          currentUser.name,
          currentUser.dateOfBirth,
          currentUser.image,
        )
        : await addUser( 
          currentUser.userName,
          currentUser.email,
          currentUser.passwordHash,
          currentUser.phoneNumber,
          currentUser.name,
          currentUser.dateOfBirth,
          currentUser.role,
          currentUser.image);

      if (result.status === 200) {
        console.log(result)
        fetchUsers();
        setSnackbar({
          open: true,
          message: isEditMode
            ? "User updated successfully."
            : "User added successfully.",
          type: "success",
        });
        handleCloseModal();
      }
      console.log(result)
    } catch (error) {
      // More detailed error handling
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "An error occurred!",
        type: "error",
      });
    }
  };


  const handleDelete = async () => {
    try {
      const result = await deleteUserById(dialog.userId);
      if (result) {
        fetchUsers();
        handleCloseDialog();
        setSnackbar({
          open: true,
          message: `User ${dialog.userId} deleted successfully.`,
          type: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error deleting user!",
        type: "error",
      });
    }
  };

  const handleCloseDialog = () => {
    setDialog({ open: false, userId: null });
  };

  const handleOpenDialog = (userId) => {
    setDialog({ open: true, userId }); // Open dialog with userId
  };

  return (
    <Box sx={{ height: "auto", padding: 2 }}>
      <Box
        sx={{
          padding: 2,
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
        }}
      >
        <SnackBar
          open={snackbar.open}
          type={snackbar.type}
          message={snackbar.message}
          handleClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        />

        <FlexBetween
          sx={{
            mb: "10px"
          }}
        >
          <Typography variant="h4" gutterBottom
            sx={{ m: "auto 0" }}
          >
            Manage Users
          </Typography>
          <Box
            sx={{
              display: "inline-flex",
              gap: "10px"
            }}>
            <Button
              variant="contained"
              onClick={() => handleOpenModal()}
              sx={{
                color: "black",
                backgroundColor: "inherit",
                border: "1px solid black",
                boxShadow: "none",
                fontWeight: "bold",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                "&:hover": {
                  backgroundColor: "#535C91",
                  color: "#ddd",
                },
              }}
            />
            <IconButton sx={{ p: 1 }}>
              <SearchOutlined />
            </IconButton>
          </Box>
        </FlexBetween>

        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead sx={{ height: "46px" }}>
              <TableRow>
                <TitleTableCell>Id</TitleTableCell>
                <TitleTableCell>Name</TitleTableCell>
                <TitleTableCell>User Name</TitleTableCell>
                <TitleTableCell>Email</TitleTableCell>
                <TitleTableCell>Phone Number</TitleTableCell>
                {/* <TitleTableCell>Date Of Number</TitleTableCell> */}
                <TitleTableCell>Roles</TitleTableCell>
                <TitleTableCell>Actions</TitleTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.length > 0 ? (
                data.users.map((user, index) => (
                  <TableRow key={user.id} // Ensure this key is unique
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#eee' : '#fff',
                      '&:hover': {
                        backgroundColor: '#f1f1f1',
                      },
                    }}
                  >
                    <ItemTableCell sx={{ fontWeight: "bold" }}>
                      {user.id}
                    </ItemTableCell>
                    <ItemTableCell sx={{ fontWeight: "bold" }}>
                      {user.name}
                    </ItemTableCell>
                    <ItemTableCell>
                      {user.userName}
                    </ItemTableCell>
                    <ItemTableCell>
                      {user.email}
                    </ItemTableCell>
                    <ItemTableCell>
                      {user.phoneNumber}
                    </ItemTableCell>
                    <ItemTableCell sx={{ fontWeight: "bold" }}>
                      {user.roles.join(", ")}
                    </ItemTableCell>
                    <ItemTableCell>
                      <UserActionsMenu
                        onEdit={handleOpenModal}
                        onDelete={handleOpenDialog}
                        user={user}
                      />
                    </ItemTableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <ItemTableCell colSpan={10} align="center">
                    No users available.
                  </ItemTableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={data.totalPage * pagination.rowsPerPage}
                  rowsPerPage={pagination.rowsPerPage}
                  page={pagination.currentPage - 1}
                  onPageChange={(e, newPage) => {
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: newPage + 1,
                    }));
                  }}
                  onRowsPerPageChange={(e) => {
                    setPagination((prev) => ({
                      ...prev,
                      rowsPerPage: parseInt(e.target.value, 10),
                      currentPage: 1,
                    }));
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

        <UsersModal
          isModalVisible={isModalVisible}
          handleCloseModal={handleCloseModal}
          handleSaveUser={handleSaveUser}
          handleChange={handleChange}
          currentUser={currentUser}
          isEditMode={isEditMode}
        />

        <Dialog open={dialog.open} onClose={handleCloseDialog}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete user with id: {dialog.userId}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleDelete}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </Box>

      <UsersModal
        isModalVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        handleSaveUser={handleSaveUser}
        handleChange={handleChange}
        currentUser={currentUser}
        isEditMode={isEditMode}
      />

      <Dialog open={dialog.open} onClose={handleCloseDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user with id: {dialog.userId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
