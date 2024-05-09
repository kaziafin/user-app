import React, { useState } from 'react'

export default function Login({onLogin}) { 
    const [username ,setuserName]=useState();
    const [password ,setpassword]=useState();


    const handleSubmit=(e)=>{
      e.preventDefault();
      onLogin(username, password)
      
    }

  return (
    <div>
        <h2>Login from</h2>
     <form onSubmit={handleSubmit}>
     <input type='text' placeholder='username' value={username} onChange={(e)=> setuserName(e.target.value)}/>

     <input type='password' placeholder='password' value={password} onChange={(e)=> setpassword(e.target.value)}/>  
     <button type='submit'> Login </button>
     </form>
    </div>
  )
}
