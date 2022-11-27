import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { swal } from 'sweetalert';

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

    const removeAdd=(id)=>{
        const confirms = window.confirm('Dear admin you want to remove this ad')
        if(!confirms){
            return;
        }

        axios.post(`http://localhost:5000/advertise/delete`,{
            id
        },{
            headers:{
                'Content-Type':'application/json',
                'Cross-Origin':'*',
                "Access-Control-Allow-Origin":" http://localhost:5000"
            }
        })
        .then(res=>console.log(res))
        .catch(e=>{
            console.log(e);
        })

    //    if(confirms){
    //     fetch(`http://localhost:5000/advertise/${id}`,{
    //         method: "DELETE",
    //         headers:{
    //            'Access-Control-Allow-Origin':'*'
    //         }
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         if(data?.acknowledged){
    //             swal("Delete", "Advertisement delete successfully", "success");
    //         }
    //         console.log(data)
    //     })
    //     .catch(e=>{
    //         console.log(e);
    //     })
    //    }
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