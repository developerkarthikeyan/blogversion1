import { useState, useEffect, useContext } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { MyContext } from '../contexapi/globalapi.js';
import axios from "axios";
import Home from './home.js';
import BlogCard from './Blog_Card.js';
import { IoSunnySharp } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import logoicon from "../assests/vecteezy_ai-generated-colorful-bird-feather_41463454.png"
import BaseUrl from "../url.js"

function Navbar({setsearchquery}) {
    const{theme,toggletheme}=useContext(MyContext)
    const { profileId, updateprofileId } = useContext(MyContext);
    const [usertId, setuserId] = useState('');
    const [profileChecked, setProfileCheck] = useState(false);
    const [userData, setuserData] = useState(null);
    const navigate = useNavigate();
const[value,setvalue]=useState('')
const[menu,setmenu]=useState(false);

const searchHandler=(e)=>{
let value=e;
setsearchquery(value)
setvalue(value)
console.log(value)
}



    const getprofileId = () => {
        const userIdFromLocalStorage = localStorage.getItem("userid");
        setuserId(userIdFromLocalStorage);
    };

    const profileCheck = async (usertId) => {
        try {
            const request = await axios.get(`${BaseUrl}/getprofiledetail/${usertId}`);
            if (request.data) {
                setuserData(request.data);
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        getprofileId();

        if (localStorage.getItem("profileid")) {
            setProfileCheck(true);
        } else {
            setProfileCheck(false);
        }
    }, [profileId]); // Runs when profileId changes in the context

    useEffect(() => {
        if (usertId) {
            profileCheck(usertId); // Check profile only when usertId is available
        }
    }, [usertId]);
console.log(menu)
    return (
        <div className={`relative ${menu?`h-72`:``} shadow-xl bg-white text-xl dark:bg-background-dark dark:text-white `}>
            <div className="flex justify-between items-center p-3 pb-8">
                <div className="ml-3 w-10 h-10">
                    <img className='w-full h-full' src={logoicon} />
                </div>
                <div className="ml-3 basis-1/2 hidden   sm:block" >
                    <ul className="flex justify-between flex-initial" >
                        <Link to="/"  className='p-1  hover:bg-cyan-500 hover:text-white text-black rounded-lg  dark:text-white '>home</Link>
                        <li >
                            {profileChecked ? (
                                <button onClick={() => navigate("/showprofile/:id",)} className='  dark:text-white  hover:bg-cyan-500 hover:text-white text-black p-1 w-auto pl-2 pr-2 rounded-lg'>Profile</button>
                            ) : (
                                <button className=' hover:bg-cyan-500   dark:text-white  hover:text-white text-black p-1 w-auto pl-2 pr-2 rounded-lg' onClick={() => navigate("/createprofile")}>Create Profile</button>
                            )}
                        </li>
                        {

profileChecked &&
                        <li className=' hover:bg-cyan-500 hover:text-white  dark:text-white  text-black p-1 w-auto pl-2 pr-2 rounded-lg cursor-pointer' onClick={() => navigate("/createpost")}>Create Article</li>

                        }
                    </ul>
                </div>
                <div className='flex justify-between'>

                    <button onClick={toggletheme} className='pr-2'>


                {theme=="light"?<div className='text-yellow-400'>
                    <IoSunnySharp />


                </div>  
            :  
            <FaMoon />
        }
                    </button>

                <div className={`flex justify-start absolute ${menu && `top-[90%]`} left-[27%] top-[60%] sm:static w-1/2 sm:w-auto`} >

                    <input  onChange={(e)=>searchHandler(e.target.value)} type="text" className=" bg-bgblack w-full p-2 dark:bg-white text-white dark:text-black  rounded-2xl  border-x-navred outline-none " placeholder="Search Articles" />
                </div>
                <div className='sm:hidden'>
                    <button onClick={()=>setmenu(menu==true?false:true)}>
                    <RxHamburgerMenu/>

                    </button>
                </div>
                </div>
                
            </div>
            <div className='h-2/3'>
            {menu && (
<div className=' h-full flex flex-col items-center justify-evenly'>

<ul className="flex flex-col items-center h-full justify-evenly" onClick={()=>setmenu(false)}>
    
                        <Link  to="/"  className='  dark:text-white  rounded-lg text-black hover:bg-cyan-500 hover:text-white p-1'>home</Link>
                        <li>
                            {profileChecked ? (
                                <button onClick={() => navigate("/showprofile/:id", { state: userData })} className='  dark:text-white  text-black p-1 w-auto pl-2 pr-2 rounded-lg hover:bg-cyan-500 hover:text-white'>Profile</button>
                            ) : (
                                <button className=' hover:bg-cyan-500 hover:text-white text-black  dark:text-white  p-1 w-auto pl-2 pr-2 rounded-lg' onClick={() => navigate("/createprofile")}>Create Profile</button>
                            )}
                        </li>
                    
{profileChecked &&    <li className=' hover:bg-cyan-500  dark:text-white  hover:text-white text-black p-1 w-auto pl-2 pr-2 rounded-lg cursor-pointer' onClick={() => navigate("/createpost")}>Create Article</li>
}
 </ul>
</div>
)}
            </div>
         
        </div>

    );
}

export default Navbar;
