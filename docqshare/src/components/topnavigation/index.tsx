import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const TopNavigation = () => {
    return (
        <div className="w-full h-20">
            <div className="w-screen fixed bg-queens-yellow">
                <div className="w-full h-20 grid grid-cols-3">
                    <div className="h-full w-fit flex flex-col justify-center pl-2">
                        <button className=" bg-queens-blue p-1 rounded-md">
                            <Link to='/' className=''>
                                <div className="flex">
                                    <div className="pt-2 pr-1"><BsArrowLeft color='white'/></div>
                                    <h1 className="text-white text-bold text-xl pr-1">Home page</h1>
                                </div>
                            </Link>
                        </button>
                    </div>
                    <div className="w-full h-full pt-3">
                        <div className="h-full w-full  flex flex-col items-center text-center">
                            <h1 className="text-queens-red text-bold text-center text-5xl shrink">*DocQshare Text*</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavigation