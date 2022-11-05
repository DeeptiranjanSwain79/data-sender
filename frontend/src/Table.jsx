import React, { useEffect } from 'react';//eslint-disable-next-line
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAllUsers, register, deleteUser, sendEMail } from "./actions/userActions";
import "./Table.css";
import { Link } from 'react-router-dom';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import { useState } from 'react';

const Table = () => {
  const dispatch = useDispatch();

  const { error, users } = useSelector(
    (state) => state.allUsers
  );

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hobbies, setHobbies] = useState("");

  const userData = [];
  const dataAdder = (u) => {
    userData.push(u);
  }

  let message = 'Here is the requested Data\n\n';
  const sendMailHandler = () => {
    // console.log(message)
    
    userData.forEach(U => {
      message += `ID: ${U._id}\nName: ${U.name}\nE-mail ID: ${U.email}\nPhone Number: ${U.phone}\nHobbies: ${U.hobbies[0]}\n\n`;
    })
    // console.log(message);
    dispatch(sendEMail(message));
  }

  const createUserToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const deleteUserHandler = id => {
    dispatch(deleteUser(id));
    window.location.reload();
  }

  const createUserHandler = () => {
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("phone", phone);
    myForm.set("hobbies", hobbies);

    dispatch(register(myForm))

    setOpen(false);
    window.location.reload();
  }

  useEffect(() => {
    if (error) {
      // console.log(error);
      dispatch(clearErrors);
    }
    dispatch(getAllUsers());
  }, [dispatch, error]);

  return (
    <div>
      <table id='table' align='center' border='5' width='100%'>
        <tr>
          <th>Select</th>
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Hobbies</th>
          <th>Action</th>
        </tr>

        {users && users.map(user => (
          <tr className='table-rows'>
            <td className='rows-data'><input type="checkbox" name="select" value={user} onChange={e => dataAdder(user)} /></td>
            <td className='rows-data'>{user._id}</td>
            <td className='rows-data'>{user.name}</td>
            <td className='rows-data'>{user.phone}</td>
            <td className='rows-data'>{user.email}</td>
            <td className='rows-data'>{user.hobbies[0]}</td>
            <td className='rows-data'>
              <Link className='btn btn-primary m-2' to={`/user/${user._id}`}>Update</Link>
              <button className='btn btn-danger m-2' onClick={() => deleteUserHandler(user._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>

      <button onClick={createUserToggle} className='create-user-btn btn btn-primary container m-4'>Register User</button>
      <button onClick={sendMailHandler} className='create-user-btn btn btn-success container m-4'>Send Data</button>


      <Dialog
        aria-labelledby='simple-dialog-title'
        open={open}
        onClose={createUserToggle}
      >
        <DialogTitle>Register User</DialogTitle>
        <DialogContent className='submitDialog'>
          <input className='m-1 rounded-4 p-2' placeholder='Name' type="text" value={name} onChange={e => setName(e.target.value)} /><br />
          <input className='m-1 rounded-4 p-2' placeholder='E-mail ID' type="text" value={email} onChange={e => setEmail(e.target.value)} /><br />
          <input className='m-1 rounded-4 p-2' placeholder='Phone Number' type="number" value={phone} onChange={e => setPhone(e.target.value)} /><br />
          <input className='m-1 rounded-4 p-2' placeholder='Hobbies' type="text" value={hobbies} onChange={e => setHobbies(e.target.value)} /><br />

          <DialogActions>
            <Button color="secondary" onClick={createUserToggle} >Cancel</Button>
            <Button color="primary" onClick={createUserHandler}>Submit</Button>
          </DialogActions>
        </DialogContent>

      </Dialog>

    </div>
  )
}

export default Table
