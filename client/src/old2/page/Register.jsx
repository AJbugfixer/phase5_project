import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios'
// import { DataContext } from '../context/DataContext'
const Register = () => {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState(false)
  const [msg, setMsg] = useState("")

  const his = useHistory()
  const checkAuth = () => {
    if (localStorage.getItem("COLLEGE_PROJ_USER"))
      his.push("/home");
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const onSub = async (e) => {
    e.preventDefault()
    const data = {
      username: username,
      email: email,
      password: password
    }

    localStorage.setItem("COLLEGE_PROJ_USERS", JSON.stringify(data))
    setStatus(true)
    setMsg("Success")
    his.push("/")
  }

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-12 mx-auto mb-3">
              {
                status ? (
                  <>
                    <div className="alert alert-primary alert-dismissible fade show ">
                      <button type="button" className="close" data-dismiss="alert" onClick={() => setStatus(false)}>&times;</button>
                      <p>{msg}</p>
                    </div>

                  </>
                ) : null
              }
              <br />

              <h2 className="text-center">Register Now</h2>
              <form onSubmit={onSub}>
                <div className="form-group">
                  <input type="text" className="form-control" name="name" placeholder="Enter UserName" value={username} onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" name="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">

                  <input type="password" className="form-control" name="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-info">Register</button>

              </form>
              <br />
              <NavLink to="/" >Login Now</NavLink>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default Register
