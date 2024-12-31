import { FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
function Footer(){
    return(
        <>
        
        <div className="flex justify-center flex-col items-center overflow-hidden ">
            <div className=" pt-3 flex flex-col items-center justify-center w-full h-full  dark:bg-bgblack dark:text-white ">
                <p className="p-1 text-3xl font-bold border-b">User Blogs</p>
                <p className="p-1 leading-loose "> Our blog is dedicated to providing insightful articles, expert advice, and the latest trends in <br></br> We aim to inspire, educate, and engage our readers with high-quality content."</p>
            
            <div className="flex justify-evenly w-full sm:w-2/3 pt-2 pb-2">
               <a className="h-10"><FaLinkedin  size="2x"/></a>
               <a><RiTwitterXLine className="text-3xl"/></a>
               <a><FaFacebook className="text-3xl" />
               </a>
            </div>
            <div className="flex justify-between w-full p-4 pb-4 sm:pb-0 dark:bg-black flex-wrap">
                <div >
                    <p>
                        Copy Rights @KarthikeyanDev
                    </p>

                </div>
                <div className="flex justify-evenly w-full sm:w-1/3 pt-2 pb-2 sm:pt-0">
                    <p>Home</p>
                    <p>About</p>
                    <p>Profile</p>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}
export default Footer