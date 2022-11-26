import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

const AllUsers = () => {
    const [alluser, setAllUser]=useState([]);
    useEffect(()=>{
         fetch('http://localhost:5000/userss',{
          headers:{
            authorization: `bearer ${localStorage.getItem('myKey')}`
        }
         })
        .then(res=>res.json())
        .then(data=>setAllUser(data))
    },[alluser])

    // make admin api call
    const makeAdmin=(id)=>{
        // console.log(id);
            fetch(`http://localhost:5000/adminCreate/${id}`,{
                method: "PUT",
                headers:{
                    authorization: `bearer ${localStorage.getItem('myKey')}`
                }
            })
            .then(res=>res.json())
            .then(data=>{
                if(data?.acknowledged){
                    swal("Create Admin!", "Admin add successfully!", "success");
                }
                // console.log(data)
            })
    }

    // delete admin
    const dltAdmin=(id)=>{
        swal({
            title: "Are you sure?",
            text: "you want to delete this admin",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Deleting is doing well", {
                icon: "success",
              });
              fetch(`http://localhost:5000/userss/${id}`,{
            method: "DELETE"
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })

            } else {
              swal("Your admin is save!");
            }
          });
}

    return (
        <div className='container mx-auto mt-12'>
           <div className="overflow-x-auto">
  <table className="table w-full">
    {/* <!-- head --> */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Account-type</th>
        <th>Make-Admin</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* <!-- row 1 --> */}
      {
        alluser.map((data, i)=>
            <tr key={i}>
        <th>{i+1}</th>
        <td>{data?.fullName}</td>
        <td>{!data?.addmin ?  data?.select : data?.addmin}</td>
        <td><button disabled={data?.role === "admin"} onClick={()=>makeAdmin(data?._id)} className="btn btn-sm bg-green-600 hover:bg-green-700 border-none">admin</button></td>
        <td><button onClick={()=>dltAdmin(data?._id)} className="btn btn-sm bg-red-600 hover:bg-red-700 border-none">delete</button></td>
      </tr>
            )
      }
   
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllUsers;