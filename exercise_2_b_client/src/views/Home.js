import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout/Layout";
import Table from "../components/Table/Table";
import { fetchAll, fetchSingle, removeUser } from "../features/store/reducers/userSlice";
import moment from 'moment'
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
import { toggleModal } from "../features/store/reducers/modalSlice";

const UserDetails = () => {
    const user = useSelector((state)=> state.userReducer.user)
    return (
        <div className="user-details">
            <h3>{ user.name.toUpperCase() }</h3>
            <div className="basic-info">
                <p><b>Date of Birth : </b>{moment(user.birthdate).format('LL')}</p>
            </div>
            <div className="contact">
                <p><b>Home : </b>{ user.contact.home  }</p>
                <p><b>Mobile : </b>{ user.contact.mobile  }</p>
            </div>
            <div className="address">
                <p><b>Address : </b>{ user.address.line1 } , { user.address.line2 } , { user.address.city } , { user.address.province }</p>
            </div>
        </div>
    )
}

const Content = () => {
    const users = useSelector((state) => state.userReducer.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAll())
    }, [dispatch])

    const handleView = (user) => {
        dispatch(fetchSingle(user.id)).then(() => {
            dispatch(toggleModal())
        })
    }
    
    // const handleEdit = (user) => {
    //     console.log('handleEdit', user)
    // }

    const handleDelete = (user) => {
        
        console.log('handleDelete', user)
        dispatch(removeUser(user.id))
    }

    return (
        <div className="home">
            <h3>User's List</h3>
            {users.length > 0 && <Table
                headers={['ID', 'FULL NAME','BIRTHDATE','AGE','ACTION']}
                rows={users.map(user => {
                    return {
                        ...user,
                        name: user.name.toUpperCase(),
                        birthdate: moment(user.birthdate).format('LL').toUpperCase()
                    }
                })}
                keys={['id','name','birthdate','age']}
                onView={handleView}
                // onEdit={handleEdit}
                onDelete={handleDelete}
            />}
            {
                users.length === 0 && <h4 className="no-result" style={
                    {
                        border: "1px solid #ccc",
                        padding: "5px",
                        borderRadius: "5px",
                        background: "#ccc",
                        fontWeight: "500"
                    }
                }>No Result</h4>
            }
        </div>
    )
}

const Home = () => {
    const isModalShow = useSelector((state)=> state.modalReducer.isModalShow)
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(toggleModal())
    }


    return ( 
        <Layout 
            content={<Content/>}
            modal={ isModalShow && <Modal 
                parentClass={isModalShow ? 'animated-parent' : ''} 
                childClass={isModalShow ? 'animated-child' : ''}
                onClose={handleClose}
                modalBody={<UserDetails/>}
                /> }
        />
     );
}

export default Home;
