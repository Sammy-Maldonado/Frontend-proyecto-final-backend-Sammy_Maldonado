import React, { useState, useEffect } from 'react'
import './userManagment.css'
import CancelIcon from '@mui/icons-material/Cancel'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import UsersServices from '../../services/usersService'
import SessionsService from '../../services/sessionsService'

const UserManagementView = () => {
  const [user, setUser] = useState([])
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizar una solicitud GET al servidor para obtener los datos del usuario actual
        const sessionsService = new SessionsService();
        const response = await sessionsService.currentUser();
        const currentUserData = response.data.payload;
        console.log("USER:", currentUserData);
        setUser(currentUserData)

        if (!response.data.role === "admin") {
          throw new Error('No se pudo completar la solicitud.');
        }

        const usersService = new UsersServices();
        const responseUsers = await usersService.getUsers();
        const allUsers = responseUsers.data.payload;
        console.log("CURRENT USERS:", allUsers);
        setUsers(allUsers)

      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchData();
  }, []);


  const handleRole = async (userId) => {
    const usersService = new UsersServices();
    const responseUsers = await usersService.changeRole(userId);
    const newRoleUser = responseUsers.data.payload;

    const responseUsers2 = await usersService.getUsers();
    const allUsers = responseUsers2.data.payload;
    setUsers(allUsers)
  }

  const handleRemoveUser = async (userId) => {
    const usersService = new UsersServices();
    const responseUsers = await usersService.deleteUser(userId);
    const newUsers = responseUsers.data.payload;
    console.log(newUsers);

    const responseUsers3 = await usersService.getUsers();
    const allUsers = responseUsers3.data.payload;
    setUsers(allUsers)
  }

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-5">
                <h2>
                  User <b>Management</b>
                </h2>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date Created</th>
                <th>Role</th>
{/*                 <th>Status</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user,index) => (
                  <tr key={user.email}>
                    <td>{index + 1}</td>
                    <td>
                      <a href="#">
                        {/* <img
                  src="/examples/images/avatar/2.jpg"
                  className="avatar"
                  alt="Avatar"
                /> */}{" "}
                        {user.name}
                      </a>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
{/*                     <td>
                      <span className="status text-success">•</span> Active
                    </td> */}
                    <td>
                      <a
                        href="#"
                        className="settings"
                        title="Settings"
                        data-toggle="tooltip"
                      >
                        <ChangeCircleIcon onClick={() => handleRole(user.id)} />
                      </a>
                      <a
                        href="#"
                        className="delete"
                        title="Delete"
                        data-toggle="tooltip"
                      >
                        <CancelIcon onClick={() => handleRemoveUser(user.id)}/>
                      </a>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementView;