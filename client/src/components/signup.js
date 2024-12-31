import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profiIcon from "../assests/profile-user-svgrepo-com.svg"
import emailicon from "../assests/email-open-svgrepo-com.svg"
import profileicon from "../assests/person-svgrepo-com.svg"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseUrl from "../url.js"

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userexists, setuserexists] = useState();
  const [emailexists, setemailexists] = useState("");
  const[errmsg,seterrmg]=useState('');
  const[iserror,setierro]=useState(false);
  const handleUserData = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BaseUrl}/signup`, {
        username,
        email,
        password
      });
      console.log('Response:', response.data);
      navigate("/login")
    } catch (error) {
      seterrmg(error.response.data.error)

      if (error.response.status == 400) {
        setuserexists(userexists?false:true);
        
setuserexists(error.response.data.error)

setierro(iserror?false:true);




        console.log(error.response.data.error)
      }
      else if(error.response.status == 409){
        setemailexists(error.response.data.error);
        setierro(iserror?false:true);
      }
      console.error('Error:', error);
    }
  };
  useEffect(() => {

    if (userexists || emailexists) {
      toast.error(`${errmsg}`, {
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
      console.log("hello")
    }

  }, [iserror])
  return (
    <>
      <div className='flex justify-center items-center h-screen bg-bgcolor p-3'>

        <form onSubmit={handleUserData} className='bg-white p-7 rounded-xl shadow-xl' >
          <div className='flex flex-col justify-center items-center'>
            <p className='text-2xl p-2'>Register</p>
            <img className="w-10 mt-2 h-10" src={profiIcon} />
          </div>
          <div className='flex flex-col'>

            <div className='relative'>
              <label className=' p-3 font-bold text-xl'>User name</label>
              <input className=' pl-12 border w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <span className=''>
                <img src={profileicon} className='absolute top-9 left-4 w-8 h-8' />
              </span>
            </div>

            <div className='relative'>
              <label className=' p-3 font-bold text-xl'> Email
                <input className=' pl-12 border w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <img className='absolute top-9 left-3 w-8 h-8' src={emailicon} />
            </div>

            <div>
              <label className=' p-3 font-bold text-xl'>
                Password
                <input className=' pl-12 border w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
            </div>

            <div>
              <button type="submit" className=' bg-navred text-white border mt-5 p-2 rounded-lg hover:bg-black hover:text-white w-full'>Submit</button>

            </div>
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

export default SignUp;
