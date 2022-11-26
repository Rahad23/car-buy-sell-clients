import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

const AudiCars = () => {
    const [data, setData]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/audi',{
            headers:{
                authorization: `bearer ${localStorage.getItem('myKey')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setData(data))
    },[data])
    const orderDataHandle=(id)=>{
        swal({
            title: "Are you sure?",
            text: `Dear admin you want to delete product`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete){

                fetch(`http://localhost:5000/audi/${id}`,{
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
                                        <td><button onClick={() => orderDataHandle(data?._id)} className="btn btn-sm bg-red-600 border-none">delete</button></td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AudiCars;