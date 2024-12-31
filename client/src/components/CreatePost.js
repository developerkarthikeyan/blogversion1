import profiIcon from "../assests/profile-user-svgrepo-com.svg"
import BlogIcon from "../assests/blog-svgrepo-com.svg"
import TitleIcon from "../assests/title-svgrepo-com.svg"
import axios from 'axios';
import { useState } from 'react';
import { MyContext } from '../contexapi/globalapi.js'
import { useContext ,useEffect} from 'react';

import { ToastContainer, toast,Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import BaseUrl from "../url.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase.js'; 

function CreatePost() {
const navigate=useNavigate()
const [imageURL, setImageURL] = useState("");
    const[userid,setuserid]=useState('');
const[profileid,setprofileid]=useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
const[name,setname]=useState('');
useEffect(() => {
    setuserid(localStorage.getItem("userid"));
    setprofileid(localStorage.getItem("profileid"))
    console.log(userid)
  }, []);

  console.log(userid)

const imageUpload=async(e)=>{
    e.preventDefault();
    
    const storageRef = ref(storage, `images/${file.name}`);

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
          handleSubmit();
          // Send this download URL to your backend to save in MongoDB
        });
      }
    );
  
}




    const handleSubmit = async (e) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('imageURL',imageURL);
        formData.append('name',name);
        formData.append('userid',userid);
        formData.append("profileid",profileid)
        


     
try {


    const response = await axios.post(`${BaseUrl}/createPost`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    console.log(response.status);
    if (response.status === 201) {


        toast.success('🦄 Blog created Success fully!', {
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
    
        // Delay navigation to ensure toast is visible
        setTimeout(() => {
            navigate("/");
        }, 3000); // 2 seconds delay
    }
   
} catch (error) {
    console.error("Error uploading file", error);
    if(error.response.status==500){

        toast.error('🦄 Server Error try again later', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress:undefined ,
            theme: "light",
            transition:Slide
            });
    
    

}

    
    };
}

    return (
        <div className='flex justify-center items-center min-h-screen  dark:bg-bgblack ' >

        <form onSubmit={imageUpload} >
            <div className="flex flex-col items-center p-2">
            <h1 className="text-2xl p-2 font-bold text-slate-700  dark:bg-slate-800   dark:text-white">New Blog</h1>
            <img className="w-20 h-20 mt-2 dark:fill-white" src={BlogIcon}/>
          </div>
        <div className='flex flex-col '>
<div className="relative">
            <label className='p-3 font-bold text-xl  dark:text-white'>Title</label>
            <input type="text" required className='border pl-14 w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' onChange={(e) => setTitle(e.target.value)} />
            <span>
    <img  className=" w-10 h-10 absolute bottom-1 pl-1 ml-1"src={TitleIcon} />
</span>
</div>

<div className="pt-2 ">
<label className='p-3  font-bold text-xl  dark:text-white'>Content</label>
    <textarea type="text"  required className='border pl-14 w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-xl' onChange={(e) => setContent(e.target.value)} />

</div>
          <div className="relative" >
            
          <label  className='p-3 font-bold text-xl  dark:text-white'>Aurthor</label>
            <input type="text" required className="border pl-14 w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-x" onChange={(e) => setname(e.target.value)} />
          <span>
<img  className=" w-10 h-10 absolute bottom-1 pl-1 ml-1"src={profiIcon} />

          </span>
          </div> 
          <div>
          <label  className='p-3 font-bold text-xl  dark:text-white'>File</label>
            <input type="file" required  className="border dark:border-black pl-14 w-full h-12 rounded-lg focus:outline-none p-2 focus:shadow-x" onChange={(e) => setFile(e.target.files[0])} />

          </div>
          
            <button type="submit"  className='  bg-navred text-white mt-5 p-2 rounded-lg hover:bg-black hover:text-white'>Create Post</button>
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

    );
}

export default CreatePost;
