import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const TopNavigation = () => {
    var Banner = require('../../assets/DocuShareBanner.jpg');
    return (
        <div className="w-full h-full">
            <div className="w-screen fixed bg-white shadow-2xl rounded-lg py-2">
                <div className="w-full h-full grid grid-cols-3">
                    <div className="h-full w-fit flex flex-col justify-center pl-2">
                        <button className=" bg-queens-blue p-2 rounded-md hover:bg-blue-400">
                            <Link to='/' className=''>
                                <div className="flex">
                                    <div className="pt-2 pr-1"><BsArrowLeft color='white'/></div>
                                    <h1 className="text-white text-bold text-xl pr-1">Home page</h1>
                                </div>
                            </Link>
                        </button>
                    </div>
                    <div className="w-full h-full py-2">
                        <div className="h-full w-full  flex flex-col items-center text-center">
                            <img className='h-20 shrink' src={Banner} alt={""} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavigation