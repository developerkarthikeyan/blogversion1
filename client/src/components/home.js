import { useState,useEffect,useContext } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import BlogCard from './Blog_Card';
import { MyContext } from '../contexapi/globalapi.js';
import heroimg from "../assests/pexels-sebastians-750225.jpg"
import homeimage from "../assests/Collaborate.png";
import BaseUrl from "../url.js"

function Home({searchquery}){
    const{theme,toggletheme}=useContext(MyContext);
    
    console.log(searchquery)
    const[filteredArticle,setFilteredArticle]=useState([]);
    const[response,setresponse]=useState([]);
    const[isprofile,setisprofile]=useState('');
    console.log(localStorage.getItem("profileid"))
    const { profileId, updateprofileId } = useContext(MyContext);
const[isloading,setisloading]=useState(true);

const handelBlog=async()=>{
            const request=await axios.get(`${BaseUrl}/Tests`)
              setresponse(request.data);
              console.log(request.data.userid);
              setisprofile(request.data.userid);
              setisloading(false);
    }
    console.log(response);
              console.log(isprofile);
    
    useEffect(()=>{
        handelBlog();
        updateprofileId(localStorage.getItem("profileid"))
    },[])


    useEffect(() => {
        if (searchquery) {
            const filter = response.filter((data) =>
                data.title.toLowerCase().includes(searchquery.toLowerCase())
            );
            setFilteredArticle(filter);
        } else {
            setFilteredArticle(response);
        }
    }, [searchquery, response]);

 console.log(filteredArticle);
    return(
        <>


<div className='flex justify-evenly flex-wrap bg-bg object-fill dark:bg-bgblack dark:text-white '

>
{/* left */}
    <div className='pt-3 md:w-1/2 lg:w-1/2'>

        <div className='w-full 
        flex flex-col items-center justify-center h-full p-1 pt-2'> 
           <h1 className='text-2xl font-title p-2 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent'>Welcome to ThoughtSpot
           </h1>
           <p className='pt-2 text-lg text-stone-400  font-title'>
           Discover inspiring stories and fresh perspectives. Read, write, and connect with like-minded individuals. Dive into trending topics and express yourself. Start your journey today!

           </p>
        </div>
    </div>

{/* right */}
<div >
<div className='w-full  h-96'>

<img className=" w-full h-full md:1/2 lg:1/3"src={homeimage} />
</div>

</div>

</div>


        {isloading?(
                    <div className='min-h-screen flex justify-center items-center'>

                    <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                  </div>
                  </div>
        ):


        <div className=' min-h-screen flex justify-center items-center flex-wrap dark:bg-bgblack dark:text-white bg-bgcolor'>

        {
 response?filteredArticle.map((data)=>{
    
   return <BlogCard data={data}/>
   })    

:<p>No blogs</p>}
        </div>
}
        </>
       
    )
}
export default Home;



// <Link to="/createprofile">CreateProfile</Link>
// {response.map((data)=>{
// return(
//  <div data->
// {/* <img src={`http://localhost:8000/`+data.file_name} /> */}
// <button onClick={()=>handleBlogdetail(data.id)}>Go to single blog</button>
//     </div>
//     )
 
    
// })}