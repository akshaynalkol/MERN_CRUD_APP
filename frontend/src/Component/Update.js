import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Update = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`http://localhost:4000/${id}`);
            console.log(res);

            setData(res.data[0]);
        }
        getData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`http://localhost:4002/update/${id}`, data)
            .then(res => {
                toast.success(res.data.message);
                nav('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className='vh-100 bg-skyBlue d-flex justify-content-center align-items-center'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-xl-4 col-lg-6 col-md-8 col-sm-10'>
                            <div className='p-4 bg-light'>
                                <NavLink to='/' className='fw-bold'>Back</NavLink>

                                <h5 className='fw-bold mt-3 mb-4 text-center'>Update Student</h5>

                                <form onSubmit={handleSubmit}>
                                    <div className='mb-3'>
                                        <label className='fw-medium'>Name </label>
                                        <input type='text' className='form-control' placeholder='Enter your name'
                                            value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}
                                            required />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='fw-medium'>Email</label>
                                        <input type='mail' className='form-control' placeholder='Enter your email'
                                            value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
                                            required />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='fw-medium'>Phone</label>
                                        <input type='tel' className='form-control' placeholder='Enter your phone no.'
                                            value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })}
                                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required />
                                        <p className='form-text my-0'>Format: 123-456-7890</p>
                                    </div>
                                    <button className='btn btn-danger w-100'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Update;