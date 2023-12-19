import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
   
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })

    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth toke to local storage and redirecthh
      localStorage.setItem('authtoken', json.authToken)
      navigate("/login")

    }
    else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
   
<>
        <div className='container' >
          <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
            <div className="m-3">
              <label htmlFor="name" className="form-label text-white">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
            </div>
            <div className="m-3">
              <label htmlFor="exampleInputEmail" className="form-label text-white">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id= "exampleInputEmail"  aria-describedby="emailHelp" />
              <div id="emailHelp" className="from-text text-white">We'll never share your email with anyone else.</div>
              </div>
            <div className="m-3">
              <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <div className="m-3">
              <label htmlFor="address" className="form-label text-white">Address</label>
              <fieldset>
                <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id= "exampleInputEmail"  aria-describedby="emailHelp" />
              </fieldset>
            </div>
            <button type="submit" className="m-3 btn btn-success ">Submit</button>
            <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
          </form>
        </div>
        </>
  )
}