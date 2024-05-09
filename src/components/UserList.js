import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../api';

export default function UserList() {

    const [userList ,setUserList]=useState([]);

    useEffect(()=>{
        api.get('/users').then(response=>{
         setUserList(response?.data);

        })
        .catch(error=>{
            console.error("Error fetch data")
        });

    },[])
  return (
    <div>
      <h2>user List</h2>
      <ul>
        {userList.map(user=>(
            <li key={user.id}>
                {user.name}
            </li>
        )



        )}
      </ul>
    </div>
  )
}
