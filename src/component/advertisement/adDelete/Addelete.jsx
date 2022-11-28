import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { json } from 'react-router-dom';
import swal from 'sweetalert';

const Addelete = () => {

  // get advertisement api
  const [adCollection, setAdCollection]=useState([]);
  useEffect(()=>{
      fetch('http://localhost:5000/advertise',{
          headers:{
              authorization: `bearer ${localStorage.getItem('myKey')}`
          }
      })
      .then(res=>res.json())
      .then(data=>setAdCollection(data))
  },[])

    const removeAdd= async(id)=>{
        swal({
            title: "Are you sure?",
            text: "Do you want to delete the ad form the home page",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch(`http://localhost:5000/delete/${id}`,{
                    method:"DELETE",
                })
                .then(res=>res.json())
                .then(data=>{
                   
                    console.log(data)
                })
                .catch(e=>{
                    console.log(e)
                })
        
              swal("This ad has been removed from the home page", {
                icon: "success",
              });
            } else {
              swal("Not deleted. The ad is still on the home page");
            }
          });
       
       
    }

    return(
        <div className='container mx-auto mt-10'>
        <div className="overflow-x-auto">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th></th>
                        <th>img</th>
                        <th>car</th>
                        <th>uses</th>
                        <th>price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
                    {
                        adCollection.map((data, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <img className='w-32 rounded-lg' src={data?.img} alt="" />
                                    </th>
                                    <td>{data?.company ? data?.company : "E"}-{data?.series}</td>
                                    <td>{data?.introducedYear}-{data?.introduction}</td>
                                    <td>${data?.price}</td>
                                    <td>
                                          <button onClick={() =>removeAdd(data?._id)} className="btn btn-sm hover:bg-red-700 bg-red-600 border-none">remove-ad</button>
                                    </td>
                                </tr>
                        )
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default Addelete;