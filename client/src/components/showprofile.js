import { useState, useEffect ,useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import Cookies from 'js-cookie';
import { MyContext } from '../contexapi/globalapi'
import { useLocation } from 'react-router-dom';
import logoutIcon from "../assests/log-out-svgrepo-com.svg"
import editIcon from "../assests/edit-3-svgrepo-com.svg"
import deleteicon from "../assests/delete-svgrepo-com.svg"
import myblogicon from "../assests/my blog.svg";
import settingIcon from "../assests/setting-setting-svgrepo-com.svg"
import bullteinsIcon from "../assests/color circle.svg"
import { ToastContainer, toast,Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  bgimg from "../assests/pexels-scottwebb-532563.jpg"
import defaaultimage from"../assests/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import dargbg from "../assests/pexels-kubiceknov-924824.jpg";
import BaseUrl from "../url.js"
import { ref, deleteObject } from "firebase/storage";
import { storage } from '../firebase.js'
function Showprofile() {
    const{theme,toggletheme}=useContext(MyContext)

  const { state, updateState } = useContext(MyContext);
const[profileId,setprofileId]=useState()
    const [UserBlogs, setuserBlogs] = useState([]);
const[profiledata,setprofiledata]=useState()
    const [Deleted,setdelete]=useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [profiledetails, setprofiledetails] = useState(null);
   const[isprofiledata,setisprofiledata]=useState(false)
    // Debug: Log the entire location object to check state

   

useEffect(()=>{
setprofileId(localStorage.getItem("profileid"));
console.log(localStorage.getItem("profileid"));
if(profileId){
    profile()
console.log("profile id came")
    }   


  

},[profileId,Deleted])

console.log(profileId)
const profile=async()=>{
    
try{
    const response=await axios.get(`${BaseUrl}/getprofiledetail/${profileId}`)
    console.log(response)
    setprofiledata(response.data)
    setisprofiledata(true)
}catch(err){
console.log(err);
}

    
}



    const delteUser = async () => {








        const response = await axios.delete(`${BaseUrl}/delete/${profiledata.userProfile._id}`,  profiledata.userpost );
        if (response.status == 200) {
            localStorage.setItem("profileid", "");


            toast.success(' Profile deleted Success fully!', {
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
           setTimeout(()=>{
            navigate("/");
        
           },3000)

        }
    }
    const deleteBlog=async(_id)=>{


        console.log(_id)
        const response = await axios.delete(`${BaseUrl}/deleteblog/${_id}`,);
if(response.status==200){
    setdelete(true)


    toast.success(' blog deleted Success fully!', {
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
    }
    const deletecookie = () => {
        Cookies.remove("token", { path: "/" });
        
        // Double-check if the cookie is deleted
        if (!Cookies.get("token")) {
            updateState(false)
            console.log("Cookie deleted successfully. Redirecting to login page...");
if(!state){
    
        navigate("/login");

console.log("login page");
}
        } else {
            console.log("Failed to delete cookie.");
        }
    }
    


    return (
        <>

{
    isprofiledata?(



        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2  gap-4 min-h-screen 
            
            
        dark:bg-background-dark w-full justify-evenly bg-cover"
        style={{backgroundImage:`url(${theme=="dark"?dargbg: bgimg})`}}>
            {/* left */}
{/*    style={{backgroundImage:`url(${dargbg})`}} */}
            <div className=' flex w-[90%] sm:w-auto justify-center items-center gap-4 flex-wrap pl-4'>
                <div className='bg-white w-full sm:w-80 h-96 rounded-lg flex flex-col overflow-hidden'>
<div className='flex justify-center pt-2'>

                    <dvi className=" w-40 min-h-40">
                        <img className='w-full h-full rounded-full' src={  profiledata.userProfile.imageURL=="no-image"?defaaultimage:profiledata.userProfile.imageURL} />
                  
                  </dvi>
                  </div>

                  <div className='flex flex-col items-center pt-1'>
  <p className='text-lg font-bold p-2'>My Profile</p>
  <div className='flex w-full justify-evenly'>
    <p className='font-bold mb-1 border-b-2 pb-1 -ml-5'>Name</p>
    <h1 className='text-lg border-b-2 pb-1 '>{profiledata.userProfile.name}</h1>
  </div>
</div>

<div className='flex  w-80 justify-evenly pt-1 pr-1  scrollbar-hide'>
  <p className='text-lg font-bold border-b-2 pb-1'>About</p>
  <div className='w-40 h-10 overflow-x-auto overflow-y-hidden scrollbar-hide'>
    <p className='whitespace-nowrap border-b-2 pb-1'>{profiledata.userProfile.aboutyou}</p>
  </div>
</div>

<div className='flex w-full justify-evenly pt-1 pr-1 overflow-x-auto scrollbar-hide'>

  <p className='text-lg font-bold border-b-2 pb-1 pl-2'>Position</p>
  <div  className='w-40 h-10 overflow-x-auto overflow-y-hidden scrollbar-hide'>

  <small className='whitespace-nowrap border-b-2 pb-2'>{profiledata.userProfile.currentposition}</small>
  </div>

</div>

                </div>


            </div>
            {/* right */}
            <div className='w-[90%]  flex flex-col items-center justify-evenly pl-3 pb-5 gap-4 '>

                {/* top */}
                <div className='w-full sm:w-80 h-40 bg-white rounded-xl overflow-auto  scrollbar-hide scroll-smooth'>
                    <div className='flex justify-center  border-b-2 pb-1 '>
                        <p className='text-center  pt-1'>My Blogs</p>
                        <img className='w-10 h-10 pl-2' src={myblogicon} />
                    </div>
                    <ul>
                        {profiledata?profiledata.userpost.map((data) => {
                            return (
                                <div className='flex justify-between w-full border-b-2 items-center '>


                                    <li className=' pb-1 pl-2'>{data.title}</li>
                                    <img onClick={()=>deleteBlog(data._id)} className='w-10 h-10 cursor-pointer' src={deleteicon} />
                                </div>
                            )




                        }) : <h1>Loading...</h1>}

                    </ul>
                </div>
                {/* Bottom */}
                <div className=' w-full sm:w-80 h-56 bg-white rounded-xl overflow-scroll scrollbar-hide'>
                    <div className='flex justify-evenly items-center p-1 border-b-2  '>
                        <p>Account Settings</p>
                        <img className='w-10 h-10 pl-1' src={settingIcon} />
                    </div>

                    <div className='flex flex-col items-center  justify-center p-2'>
                        <div className='flex justify-evenly w-full'>
                            <div className='flex justify-start w-1/2'>
                                <img className='w-10 h-8' src={bullteinsIcon} />
                                <p>Edit profile</p>
                            </div>

                            <button onClick={()=>navigate(`/editprofile/${profiledata.userProfile._id}`)} type="button" class="  text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit Profile</button>

                        </div>

                        <div className='flex justify-evenly w-full'>
                            <div className='flex'>
                                <img className='w-10 h-8' src={bullteinsIcon} />
                                <p>Delete profile</p>
                            </div>

                            <button onClick={()=>delteUser(profiledata.userProfile._id)} type="button" class="  text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">delete Profile</button>

                        </div>


                        <div className='flex justify-evenly w-full'>
                            <div className='flex w-1/2 justify-start'>
                                <img className='w-10 h-8' src={bullteinsIcon} />
                                <p>logout</p>
                            </div>

                            <button onClick={deletecookie} type="button" class="  text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">logout</button>

                        </div>


                    </div>

                </div>
            </div>
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


    ):(
        <div className='min-h-screen flex justify-center items-center'>

        <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span
          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
      </div>
      </div>

    )
}


        </>

    )

}

export default Showprofile;




{/* <div  className='border-black  flex justify-center pt-10 items-center '>

         <div  className="  rounded-lg hover:shadow-2xl w-96 flex flex-col items-center h-96 justify-center">
        <dvi className="w-40 h-40">
            <img className='w-full h-full  rounded-full' src={`http://localhost:8000/UserProfile/`+profileimage}/>
        </dvi>
        <div className='flex flex-col items-center p-2'>
            <h1 className='text-xl'>{name}</h1>
<p className='text-xl' >{aboutyou}</p>
<div className='w-80 h-0.5 bg-black mt-2'></div>

        </div>
<div className='flex  justify-between items-center pt-1 w-full '>
<div className='flex rounded-lg p-1 bg-cyan-700  justify-evenly ml-2 pl-3' >
    <p className='mr-3 text-lg'>Post </p>
    <p className='text-lg'>{userpost.length}</p>
</div>
<div className='flex  bg-cyan-700 rounded-lg justify-center'>
<button className='text-white text-lg p-1 rounded-lg' onClick={()=>navigate("/editprofile",{state:profiledetails})}>Edit Profile</button>
<img className='w-10 h-7 mt-1' src={editIcon}/>
</div>
<div className='flex mr-2 bg-cyan-700 rounded-lg justify-center'>
<img className='w-10 h-7 mt-1 colo' src={logoutIcon}/>

<button className='text-white text-lg  p-1 rounded-lg bg-cyan-700'>Log out</button>

</div>
</div>
<button onClick={()=>delteUser(_id)}>DeleteME</button>

</div>
         </div>
        </>
    ); */}
