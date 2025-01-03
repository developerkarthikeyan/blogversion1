import profiIcon from "../assests/profile-user-svgrepo-com.svg"
import positionIcon from "../assests/job-management-svgrepo-com.svg"
import AboutYouIcon from "../assests/user-question-alt-svgrepo-com.svg"
import axios from 'axios';
import NewProfileIcon from "../assests/person-svgrepo-com.svg"
import { useState } from 'react';
import { MyContext } from '../contexapi/globalapi.js'
import { useContext ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'; 

import { ToastContainer, toast,Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Newprofile(children){
   

const navigate=useNavigate();
const[imageURL, setImageURL] = useState("");

    const [position, setposition] = useState('');
    const [file, setFile] = useState(null);
const[username,setusername]=useState('');
const[AboutYou,setAboutYou]=useState('');
const[userId,setuserId]=useState('');
const[profileIdnew,setProfileIdnew]=useState('');
const[editprofileimage,seteditprofileimage]=useState(true);
const location = useLocation();
console.log(location.state);



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
          setImageURL(downloadURL);
          handleSubmit(downloadURL);
          // Send this download URL to your backend to s`ave in MongoDB
          
        });
      }
    );
}
else{
    handleSubmit("no-image");

}
}


    const handleSubmit = async (url) => {

      console.log(url)
            const formData = new FormData();
            formData.append('position', position);
            formData.append('name',username); 
            formData.append("aboutyou",AboutYou)
            formData.append('imageURL',url);

    formData.append("userid",userId)
    console.log(position)
    console.log(file)
    console.log(username)
    console.log(AboutYou)
      console.log(imageURL)
       
    
    console.log(formData)

        try {


            
                const response = await axios.post("http://localhost:8000/createProfile", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
             
             
                });

                console.log(response.status)
                if(response.status==200){
                                  
        toast.success(' Profile created Success fully!', {
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

                setProfileIdnew(response.data._id);

    
            
       
        
        } catch (error) {
            console.error("Error uploading file", error);
        }
    };
    useEffect(()=>{
localStorage.setItem("profileid",profileIdnew)
if(localStorage.getItem("profileid")){

setTimeout(()=>{
    navigate("/")

},3000)

console.log("saved")
}
    },[profileIdnew])

    console.log(profileIdnew)
    useEffect(() => {
        
         setuserId(localStorage.getItem("userid")) ;
         
       
  },[])
  console.log(userId)


  const filehandler=(e)=>{

seteditprofileimage(false)
   
console.log(e)
}
// useEffect(()=>{
//     if(editprofileimage){
//         console.log(profiledata.profileimage)
//         setprofiledata({...profiledata,profileimage:profileimage})
//     }
// },[])























                           
return(

<div className="flex justify-center items-center h-screen dark:bg-slate-800  ">
<form onSubmit={imageUpload}>
    <div className="flex flex-col items-center p-2">
        <h1 className="text-xl dark:text-white">Create Profile</h1>
        <img className="w-24 h-24 fill-white" src={NewProfileIcon} alt="Profile Icon" />
    </div> 

    <div className="flex flex-col">
        <div className="relative">
            <label className="p-3 font-bold text-xl  dark:text-white">Enter Your Name</label>
            <input 
                type="text" 
                className="border pl-14 w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl"  
                onChange={(e) => setusername(e.target.value)} 
            />
            <span>
                <img className="w-10 h-10 absolute bottom-1 pl-1 ml-1" src={profiIcon} alt="Profile Icon" />
            </span>
        </div>

        <div className="relative p-1">
            <label className="p-3 font-bold text-xl  dark:text-white">Position</label>
            <input 
                type="text" 
                className="border w-full h-12 rounded-lg focus:outline-none p-2 pl-10 focus:shadow-xl"  
                onChange={(e) => setposition(e.target.value)} 
            />
            <span className="mr-4">
                <img className="w-10 h-10 absolute bottom-7" src={positionIcon} alt="Position Icon" />
            </span>
        </div>

        <div className="relative">
            <label className="p-3 font-bold text-xl  dark:text-white">About You</label>
            <input 
                type="text" 
                className="border w-full h-12 rounded-lg focus:outline-none p-2 pl-10 focus:shadow-xl"  
                onChange={(e) => setAboutYou(e.target.value)} 
            />
            <span>
                <img className="w-10 h-10 absolute bottom-1 pl-1 ml-1" src={AboutYouIcon} alt="About You Icon" />
            </span>
        </div>

        <label className="p-3 font-bold text-xl  dark:text-white">Choose an image</label>
        <input 
            type="file" 
            className="dark:border-black border w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl" 
            onChange={(e) => setFile(e.target.files[0])} 
        />

        <button 
            type="submit" 
            className=" dark:border-none bg-navred text-white border mt-5 p-2 rounded-lg hover:bg-black hover:text-white"
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



export default Newprofile;