import { useState } from 'react';
import profiIcon from "../assests/profile-user-svgrepo-com.svg"
import positionIcon from "../assests/job-management-svgrepo-com.svg"
import AboutYouIcon from "../assests/user-question-alt-svgrepo-com.svg"
import axios from 'axios';
import NewProfileIcon from "../assests/person-svgrepo-com.svg"
import { MyContext } from '../contexapi/globalapi.js'
import { useContext ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate ,Link} from 'react-router-dom';
import { ToastContainer, toast,Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'; 


import BaseUrl from "../url.js"

function EditProfile(){
const [imageURL, setimageURL] = useState("");
const[file,setfile]=useState();
const navigate=useNavigate();
const{id}=useParams();
 const[isuploaded,setisuploaded]=useState(false)
// const data=location.state;

const[profiledata,setprofiledata]=useState({
})
// console.log(profiledata)
const getprofiledetail=async()=>{
    try{
        const response=await axios.get(`${BaseUrl}/getprofiledetail/${id}`)
        console.log(response)
        setprofiledata(response.data.userProfile
        )
       
    }catch(err){
    console.log(err);
    }
    
        
    }
    

useEffect(()=>{
    getprofiledetail();
},[])
console.log(
profiledata

)




const imageUpload=async(e)=>{

    e.preventDefault();
    if(!file==""){

    
    const storageRef = ref(storage, `profileimages/${file.name + new Date()}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optional: Track progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        // Get the download URL once upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setprofiledata({...profiledata,imageURL:downloadURL})
          setimageURL(downloadURL);
          setisuploaded(true);
          handlesubmit(downloadURL);
          // Send this download URL to your backend to s`ave in MongoDB
        
        });
      }
    );
  
}
else{
    handlesubmit(profiledata.imageURL)
}
}


const handlesubmit=async(url)=>{
    const formData = new FormData();
    formData.append('name', profiledata.name);
    formData.append('currentposition', profiledata.currentposition);
    formData.append('aboutyou', profiledata.aboutyou);
    formData.append('file', profiledata.profileimage);
    formData.append('userid', profiledata.userid);
    formData.append('_id', profiledata._id);
    formData.append('imageURL',url);
    
    // Add the file to FormData
try{

    const response=await axios.put(`${BaseUrl}/updateprofile/${profiledata._id}`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
 
    })
if(response.status==201){


    toast.success(' Profile edited Success fully!', {
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
console.log(response);

}catch(err){
    console.log(err)
    
}
}


    return(
<div className="flex justify-center items-center h-screen">
<form onSubmit={imageUpload}>
    <div className="flex flex-col items-center p-2">
        <h1 className="text-xl">Edit Profile</h1>
        <img className="w-24 h-24" src={NewProfileIcon} alt="Profile Icon" />
    </div>

    <div className="flex flex-col">
        <div className="relative">
            <label className="p-3 font-bold text-xl">Enter Your Name</label>
            <input 
                type="text" 
                className="border pl-14 w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl"  
             value={profiledata.name}   onChange={(e) => setprofiledata({...profiledata,name:e.target.value})} 
            />
            <span>
                <img className="w-10 h-10 absolute bottom-1 pl-1 ml-1" src={profiIcon} alt="Profile Icon" />
            </span>
        </div>

        <div className="relative p-1">
            <label className="p-3 font-bold text-xl">Position</label>
            <input 
                type="text" 
                className="border w-full h-12 rounded-lg focus:outline-none p-2 pl-10 focus:shadow-xl"  
                value={profiledata.currentposition
                }    onChange={(e) => setprofiledata({...profiledata,currentposition:e.target.value})} 
            />
            <span className="mr-4">
                <img className="w-10 h-10 absolute bottom-7" src={positionIcon} alt="Position Icon" />
            </span>
        </div>

        <div className="relative">
            <label className="p-3 font-bold text-xl">About You</label>
            <input 
                type="text" 
                className="border w-full h-12 rounded-lg focus:outline-none p-2 pl-10 focus:shadow-xl"  
                value={profiledata.aboutyou}   onChange={(e) => setprofiledata({...profiledata,aboutyou:e.target.value})} 
            />
            <span>
                <img className="w-10 h-10 absolute bottom-1 pl-1 ml-1" src={AboutYouIcon} alt="About You Icon" />
            </span>
        </div>

        <label className="p-3 font-bold text-xl">Choose an image</label>
        <input 
            type="file" 
            className="border w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl" 
            onChange={(e) =>setfile(e.target.files[0])} 
        />

       <button 
            type="submit" 
            className="bg-navred text-white border mt-5 p-2 rounded-lg hover:bg-black hover:text-white"
        >
            Create Profile
        </button>
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
)
}
export default EditProfile;









// else{
//     console.log("putrequestg is working")
    
//             

// return (
//     <div className='flex justify-center items-center h-screen'>


//     <form onSubmit={handleSubmit}>
//     <div className="flex flex-col items-center p-2">
//       </h1>:<h1 className="text-xl">Create Profile</h1>
//         <img className="w-24 h-24" src={NewProfileIcon} />
//     </div>

//         <div className='flex flex-col '>

// <div className="relative">
// <label  className='p-3 font-bold text-xl'>Enter Your Name</label>
// <input type="text" value={profiledata.name} className='border pl-14 w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' onChange={(e) => setprofiledata({...profiledata,name:e.target.value})}/>



// <input type="text" className='border pl-14 w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl'  onChange={(e) => setusername(e.target.value)} />

// )}


// {console.log(username)}

// <span>
// <img  className=" w-10 h-10 absolute bottom-1 pl-1 ml-1"src={profiIcon} />
// </span>
// </div>


// <div className="relative p-1">
     
// <label className=' p-3 font-bold text-xl'>position</label>
    
//     {isedit?( 
//         <input type="text" value={profiledata.currentposition} className='border   w-full h-12 rounded-lg focus:outline-none p-2 pl-10 focus:shadow-xl'  onChange={(e) => setprofiledata({...profiledata,currentposition:e.target.value})} />

//     ):(
//         <input type="text" className='border   w-full h-12 rounded-lg focus:outline-none p-2 pl-10 focus:shadow-xl'  onChange={(e) => setposition(e.target.value)} />

//     )}
    
    
//  <span className="mr-4">
//  <img className="w-10 h-10 absolute bottom-7" src={positionIcon}/>

//  </span>
// </div>         


// <div className="relative">
// <label className=' p-3 font-bold text-xl'>About You</label>
    
//      {isedit?( 
//         <input type="text"value={profiledata.aboutyou} className='border   w-full h-12 rounded-lg focus:outline-none p-2 pl-10 focus:shadow-xl'  onChange={(e) => setprofiledata({...profiledata,aboutyou:e.target.value})} />

//     ):(
//         <input type="text" className='border   w-full h-12 rounded-lg focus:outline-none p-2 pl-10 focus:shadow-xl'  onChange={(e) => setAboutYou(e.target.value)} />

//     )}
// <span>
// <img  className=" w-10 h-10 absolute bottom-1 pl-1 ml-1"src={AboutYouIcon} />

// </span>

// </div>

   
//         <label className=' p-3 font-bold text-xl'>Choose an image</label>
 
       
    


//     {isedit?(
//         <input type="file"   className='border w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' onChange={(e)=> setprofiledata({...profiledata,profileimage:e.target.files[0]})} />

//     ):(
//         <input type="file" className='border w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' onChange={(e) => setFile(e.target.files[0])} />

//     )}




//         <button type="submit" className=' bg-navred text-white border mt-5 p-2 rounded-lg hover:bg-black hover:text-white' >CreateProfile</button>
//     </div>

//     </form>
//     </div> 

// );
// }



// export default Newprofile;