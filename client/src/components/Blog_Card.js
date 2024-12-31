import { useNavigate } from "react-router-dom";
import defaaultimage from"../assests/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"

function BlogCard({data}){
const navigate=useNavigate();

  let reduced_Content=data.content.slice(0,70);
  console.log(reduced_Content);



const handleNavigate=(id)=>{
    console.log(id)
    navigate(`Blogdetail/${id}`)
}


    return(
        <>
      
        <div className="flex justify-center p-3 mt-3">
<div className=" bg-white  hover:scale-105 transition-transform duration-300 ease-in-out flex justify-between w-full lg:w-96 border rounded-xl hover:shadow-xl overflow-hidden border-gray-300 dark:bg-slate-800 dark:border-none">

<div className="p-3 mr-2  lg:w-34  h-32">
    <div className=" w-full h-full border-4 rounded-xl border-navred dark:border-gray-400 overflow-hidden">
<img  className=" w-full h-full object-center scale-100 " src={data.profileid.imageURL =="no-image"?defaaultimage:data.profileid.imageURL}/>
   </div>
    
    </div>

{/* description */}
<div className="flex flex-col  pr-2 w-4/5 ease-in-out duration-500 overflow-hidden">
<h1 className="text-navred">{data.name} </h1>

<h1 className=" font-bold text-lg cursor-pointer hover:text-navred" onClick={()=>handleNavigate(data._id)}>{data.title}</h1>
<small className="p-1 text-gray-700  dark:text-white">{ reduced_Content} ...</small>
<p className="p-1 text-gray-700">{data.currentposition}</p>
</div>
</div>
</div>

        </>
    )
}
export default BlogCard