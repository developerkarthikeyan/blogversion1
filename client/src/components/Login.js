import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../contexapi/globalapi.js'
import loginIcon from "../assests/person-svgrepo-com.svg"
import emailicon from "../assests/email-open-svgrepo-com.svg"
import { ToastContainer, toast,Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from "../url.js"

function Login() {

  const { state, updateState } = useContext(MyContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [crtpassword, setcrtpassword] = useState(null);
  const [checkemail, setcheckemail] = useState(null);
  const [userId, setuserId] = useState('');
  const handleUserData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BaseUrl}/login`, {
        email,
        password
      }, {
        withCredentials: true,

      });
      updateState(true);
      console.log('Response:', response.data);
      setuserId(response.data._id);
      console.log(response.data._id);
      localStorage.setItem("userid", response.data._id);

      toast.success('logged in Success fully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        });
        navigate("/");



    } catch (error) {
      console.log(error.response.status)
      if (error.response.status == 404) {
        toast.warning('email is incorrect or not found', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
          });

        setcheckemail(true);
        console.log("hi karthi")


      }
      else if(error.response.status == 401){

        toast.error('Password is incorrect', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
          });

      }
      else {
        setcrtpassword(true)
      }
    }
  };



  return (
    <>
      <div className='flex justify-center items-center h-screen bg-bgcolor p-3'>

        <form onSubmit={handleUserData} className='border bg-white p-8 rounded-xl shadow-xl'>
          <div className='flex flex-col justify-center items-center ' >
            <p className='text-2xl p-2'>Login</p>
            <img className="w-14 mt-2 h-14" src={loginIcon} />
          </div>

          <div className='flex flex-col'>


            <div className='relative'>
              <label className=' p-3 font-bold text-xl'>
                Email
                
                <input className=' pl-12 border w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <span className="absolute top-9 left-1">
                <img className='w-8 h-8' src={emailicon} />
              </span>
            </div>


            <div>
              <label className=' p-3 font-bold text-xl'>
                Password
                <input className=' pl-12 border w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
            </div>



          </div>
          <button type="submit" className=' bg-navred text-white border mt-5 p-2 rounded-lg hover:bg-black hover:text-white w-full'>Submit</button>
        
          <div className=' p-3 font-semibold text-xl'>
      <span>Dont have an account?</span>
      <Link className='hover:text-navred' to={"/signup"}>Register</Link>
      </div>
        </form>
        <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
    theme="light"
    transition={Slide} // Correct syntax for the transition prop
/>
      </div>

     

    </>
  );
}


export default Login;
