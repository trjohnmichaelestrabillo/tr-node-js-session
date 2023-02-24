import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import { saveUser } from "../features/store/reducers/userSlice";
import swal from 'sweetalert2'

import "./assets/create/create.css"

const Form = () => {
    const { register,handleSubmit } = useForm() 
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        dispatch(saveUser({
            ...data,
            age: 10
        })).then(() => {
            swal.fire('Saved','User Inserted Successfully', 'success').then(() => {
                navigate('/')
            })
        })
    }

    return (
        <div className="form-parent">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="main-form">
                <div className="personal-info flex-form">

                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" {...register('name', { required: true })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Birthdate</label>
                        <input type="date" id="dob" {...register('birthdate', { required: true })} max={moment(Date.now()).format('yyyy-MM-DD')}/>
                    </div>
                </div>  
                {/* CONTACT INFORMATION */}
                <div className="contact-group">
                    <h3>Contact Details</h3>
                    <div className="contacts flex-form">
                        <div className="form-group">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="text" id="mobile" {...register('contact.mobile', { required: true })} minLength={11} maxLength={11}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="home">Home</label>
                            <input type="text" id="home" {...register('contact.home', { required: true })} maxLength={7}/>
                        </div>
                    </div>
                </div>

                {/* ADDRESS INFORMATION */}
                <div className="contact-group">
                    <h3>Address Details</h3>
                    <div className="address flex-form">
                        <div className="form-group">
                            <label htmlFor="line1">Line 1</label>
                            <input type="text" id="line1" {...register('address.line1', { required: true })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="line2">Line 2</label>
                            <input type="text" id="line2" {...register('address.line2', { required: true })} />
                        </div>
                    </div>


                    <div className="address flex-form">
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" {...register('address.city', { required: true })} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="province">Province</label>
                            <input type="text" id="province" {...register('address.province', { required: true })} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <select id="country" {...register('address.country', { required: true })}>
                                <option value="">Select Country</option>
                                <option value="australia">Australia</option>
                                <option value="india">India</option>
                                <option value="new zealand">New Zealand</option>
                                <option value="philippines">Philippines</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="btn-group">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
        
    )

}

const Create = () => {

   

    return ( 
        <Layout
            content={<Form/>}
        />
     );
}
 
export default Create;