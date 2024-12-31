import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./components/home";
import Login from "./components/Login";
import SignUp from "./components/signup";
import axios from 'axios';
import { useEffect, useState } from 'react';
import React, { useContext } from 'react';
import { MyContext } from './contexapi/globalapi.js'
import Create_post from './components/CreatePost.js';
import SinglePost from './components/SingleBlog.js';
import Newprofile from './components/createProfile.js';
import Navbar from './components/Navbar.js';
import Showprofile from './components/showprofile.js';
import UpdateProfile from './components/Update.js';
import EditProfile from './components/editprofile.js';
import Footer from './components/footer.js';
import BaseUrl from "./url.js"
function App() {
    console.log(process.env);  // Ensure this logs "development" for local dev
    console.log(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET);  // This should log the correct value

  const { state, updateState } = useContext(MyContext);
    const [isAlreadyLoggedIn, setAlreadyLoggedIn] = useState(null); // null for loading statelet 
   const[searchquery,setsearchquery]=useState('')
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(`${BaseUrl}/auth`, {
                withCredentials: true
            });

            if (response.status === 200) {
                console.log(response);
                setAlreadyLoggedIn(true);
                console.log("hello"+isAlreadyLoggedIn)
            } else {
                setAlreadyLoggedIn(false);
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            console.log("hi"+isAlreadyLoggedIn)
            setAlreadyLoggedIn(false); // If there's an error, assume not logged in
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    if (isAlreadyLoggedIn === null) {
        return (
           <>
            <div className='min-h-screen flex justify-center items-center'>

                    <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                  </div>
                  </div>
                  </>
        ) // Show loading state while checking authentication
    }


console.log(isAlreadyLoggedIn,state)

    return (

        <BrowserRouter>
        
        {isAlreadyLoggedIn || state?
        <Navbar  setsearchquery={setsearchquery}/>

        :null
      }

            <Routes>
                {isAlreadyLoggedIn || state ? (
                    <>
                    <Route path='/' element={<Home searchquery={searchquery} />} />


<Route path='/createPost' element={<Create_post/>}></Route>
             <Route path='/Blogdetail/:id' element={<SinglePost/>}></Route>
             <Route path='/createprofile' element={<Newprofile/>}></Route>
<Route path='/showprofile/:id' element={<Showprofile/>}/>
<Route path="/updateprofile" element={<UpdateProfile/>}/>
<Route path="/editprofile/:id" element={<EditProfile/>}/>

</>



                ) : (
                    <Route path='/login' element={<Login />} />
                )}
                <Route path='/signup' element={<SignUp />} />
                {/* Redirect any other path to the appropriate page */}
                <Route path='*' element={<Navigate to={isAlreadyLoggedIn ? '/' : '/login'} />} />
             
            </Routes>
            <hr className="border-0 h-0.5 bg-black " />

       <Footer/>
        </BrowserRouter>


    );
}

export default App;
