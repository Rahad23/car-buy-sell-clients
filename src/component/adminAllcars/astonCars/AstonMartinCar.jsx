import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

const AstonMartinCar = () => {
    const [data, setData]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/astonMartin',{
            headers:{
                authorization: `bearer ${localStorage.getItem('myKey')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setData(data))
    },[data]);

    const orderDataHandle=(id)=>{
        swal({
            title: "Are you sure?",
            text: `Dear admin you want to delete product`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) =>{
            if (willDelete){
                fetch(`http://localhost:5000/astonMartin/${id}`,{
                    method: "DELETE"
                })
                .then(res=>res.json())
                .then(data=>{
                   if(data?.acknowledged){
                    swal("The Product was really not good. Doing well",{
                        icon: "success",
                      });
                   }
               })
              
            } else {
              swal("The product is really good. You are doing well without deleting");
            }
          });
     }

     

    //  show advertisement function
    const showAdvertis=(id)=>{
       fetch(`http://localhost:5000/astonMartin/${id}`)
       .then(res=>res.json())
       .then(data=>{
        fetch('http://localhost:5000/advertise',{
            method: "POST",
            headers:{
                'content-type':'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.acknowledged){
                swal("Make Admin", "Admin created successfully", "success");
            }
        })
        // console.log(data)
    })
    }

    return (
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
                        <th>Advertisement</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
                    {
                        data.map((data, i) =>
                                <tr key={i}>
                                    <th>{i + 1}</th>
                                    <th>
                                        <img className='w-32 rounded-lg' src={data?.img} alt="" />
                                    </th>
                                    <td>{data?.company ? data?.company : "E"}-{data?.series}</td>
                                    <td>{data?.introducedYear}-{data?.introduction}</td>
                                    <td>${data?.price}</td>
                                    <td>
                                        <button onClick={() => orderDataHandle(data?._id)} className="btn btn-sm bg-red-600 border-none">delete</button>
                                    </td>
                                    <td>
                                          <button  onClick={() =>showAdvertis(data?._id)} className="btn btn-sm hover:bg-green-700 bg-green-600    border-none">show-ad</button>
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

export default AstonMartinCar;