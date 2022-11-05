import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser, getUserDetails } from "./actions/userActions";
import { UPDATE_USER_RESET } from './constants/userConstants';
import "./Table.css";

const Updater = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    const { error, user } = useSelector(
        (state) => state.userDetails
    );

    const { isUpdated } = useSelector(state => state.profile)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [hobbies, setHobbies] = useState("");

    useEffect(() => {
        //eslint-disable-next-line
        if (user && user._id != id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone);
            setHobbies(user.hobbies);
        }

        if (error) {
            return (
                <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        {error}
                    </div>
                </div>
            )
            // dispatch(clearErrors());
        }

        if (isUpdated) {
            window.alert("User updated successfully");
            navigate("/");
            dispatch({ type: UPDATE_USER_RESET })
        }
        // dispatch(getUserDetails(id));
    }, [dispatch, error, navigate, id, user, isUpdated]);

    const updateUserHandler = e => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("phone", phone);
        myForm.set("hobbies", hobbies);

        dispatch(updateUser(id, myForm));
    }

    return (
        <div className='updater-form container'>

            <form action="">
                <div>
                    <label htmlFor="ID">ID</label>
                    <input className='m-1 rounded-4 p-2' type="number" value={id} readOnly />
                </div>

                <div>
                    <label htmlFor="Name">Name</label>
                    <input className='m-1 rounded-4 p-2' placeholder='Name' type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="Name">Email-ID</label>
                    <input className='m-1 rounded-4 p-2' placeholder='E-mail ID' type="text" value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="Name">Phone</label>
                    <input className='m-1 rounded-4 p-2' placeholder='Phone Number' type="number" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="Name">Hobbies</label>
                    <input className='m-1 rounded-4 p-2' placeholder='Hobbies' type="text" value={hobbies} onChange={e => setHobbies(e.target.value)} />
                </div>

                <button className='btn btn-primary container' onClick={updateUserHandler}>Update</button>
            </form>

        </div>
    )
}

export default Updater
