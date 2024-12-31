import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import BaseUrl from "../url.js"
import defaaultimage from"../assests/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"

function SinglePost() {
    const [data, setData] = useState('');
    const [date, setDate] = useState('');
    const [final, setFinal] = useState('');
    const [summary, setSummary] = useState('');
    const { id } = useParams();

    const getDetailBlog = async () => {
        const request = await axios.get(`${BaseUrl}/Blogdetails/${id}`);
        console.log(request.data);
        setData(request.data);
        setDate(request.data.createdAt);
    };

    function handleDate(date, data) {
        console.log(date);
        let content = String(data.content);
        let summaryLength = content.length / 10;
        let reducedContent = content.slice(0, summaryLength);
        setSummary(reducedContent);
        if (date) {
            let finalDate = date.split(":")[0].slice(0, -3);
            setFinal(finalDate);
            console.log("final date is", finalDate);
        }
    }

    useEffect(() => {
        handleDate(date, data);
    }, [date, data]);

    useEffect(() => {
        getDetailBlog();
    }, []);

    return (
        <>
            <div className="flex flex-wrap pb-7 dark:text-white text-black justify-between bg-white dark:bg-gradient-to-r from-slate-900 to-slate-700">
                {/* Main Blog Content */}
                <div className='w-full lg:w-2/3 p-4'>
                    <div className='flex flex-col items-start w-full h-full'>
                        <div className=''>

                            <p className='text-xl p-2'>{data.name} Posted at {final}</p>
                            <h1 className="text-3xl bg-gradient-to-r from-green-300 to-yellow-300 bg-clip-text text-transparent">
                                {data.title}
                            </h1>
                            <p className='text-2xl font-bold p-1'>Summary</p>
                            <p className='p-2 leading-loose'>
                                <span className='text-navred font-bold text-xl mr-3'>{summary}</span>
                            </p>
                        </div>
                        <div className='border-t p-5 mt-2 border-black h-2 w-full'></div>
                        <div className='w-full h-80'>
                            <img
                                src={data.imageURL}
                                alt="Blog Image"
                                className='w-full h-full object-cover'
                            />
                        </div>
                        <div className='mt-10 p-3 rounded leading-loose h-80 overflow-y-scroll  scrollbar-hide'>
                            <p className='text-lg p-2'>{data.content}</p>
                        </div>
                    </div>
                </div>

                {/* Author Info */}
             
    

<div className='min-h-full w-full lg:w-1/3  flex  items-center  justify-center pt-4'>
{/* outer dicv */}
<div className='h-96  lg:w-2/3 w-3/4 sm:w-80 dark:bg-white rounded-3xl relative bg-red-500 overflow-y-auto scrollbar-hide' >
    
{/* inner div */}
<div className='h-1/2  bg-red-950 rounded-3xl'>

</div>

<div  className='h-32 w-32 absolute left-12 top-28 bg-gray-200 rounded-full '>
<img
                className=" w-full h-full rounded-full"
                src={data?.profileid?.imageURL === "no-image" ? defaaultimage : data?.profileid?.imageURL}

                alt="Profile"
            />
</div>
<div className='absolute left-14 top-60 pl-2 '>
<p className='text-3xl bg-gradient-to-r from-green-300 to-yellow-300 bg-clip-text text-transparent p-2'>
            {data?.profileid?.name || 'Loading'}
        </p>
        <hr></hr>
        <p className='text-2xl bg-gradient-to-r from-green-300 to-yellow-300 bg-clip-text text-transparent pl-1 pt-1'>
            {data?.profileid?.aboutyou || 'Loading'}
        </p>
</div>
</div>
</div>

</div>


        </>
    );
}

export default SinglePost;
{/* <div className='w-full lg:w-1/3 p-4 bg-red-400'>
<div className='flex flex-col items-center'>
    <div className="p-3 w-40 h-40 mb-4">
        <div className="border-4 rounded-xl border-navred overflow-hidden">
            <img
                className="object-cover object-center w-full h-full"
                src={data?.profileid?.profileimage ? `http://localhost:8000/UserProfile/${data.profileid.profileimage}` : 'default-image.jpg'}
                alt="Profile"
            />
        </div>
    </div>
    <div className='text-center'>
        <h1 className='text-xl'>About the Author</h1>
        <h1 className='text-3xl bg-gradient-to-r from-green-300 to-yellow-300 bg-clip-text text-transparent p-2'>
            {data?.profileid?.name || 'Loading'}
        </h1>
        <p className='text-lg'>
            {data?.profileid?.aboutyou || 'Loading'}
        </p>
    </div>
</div>
</div> */}