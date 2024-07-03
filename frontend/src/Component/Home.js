import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('http://localhost:4000');
            // console.log(res);

            setData(res.data);
        }
        getData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:4000/delete/${id}`)
            .then(res => {
                setData(prevData => prevData.filter(val => val.id !== id));
                toast.success(res.data.message);
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <div className='bg-skyBlue vh-100'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-xl-10'>
                            <h2 className='fw-bold text-center mt-4'>Student List</h2>

                            <div className='text-end mb-4'>
                                <NavLink to='/create' className='btn btn-success px-3'>Create</NavLink>
                            </div>

                            <div className='table-responsive'>
                                <table className='table table-bordered table-striped table-hover text-center'>
                                    <thead className='table-dark'>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((val, index) => {
                                                return (
                                                    <tr key={val.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{val.name}</td>
                                                        <td>{val.email}</td>
                                                        <td>{val.phone}</td>
                                                        <td>
                                                            <NavLink to={`/update/${val.id}`}><i className='fa fa-edit text-success'></i></NavLink>
                                                            <button className='p-0 border-0 text-danger' onClick={() => handleDelete(val.id)}>
                                                                <i className='fa fa-trash ps-2' ></i
                                                                ></button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;