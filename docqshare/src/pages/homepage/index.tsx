import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  var Logo = require('../../assets/Homepage.JPG');
  return (
    <div className='bg-white  w-screen h-screen overflow-hidden'>
      <div className='w-full h-full flex flex-col items-center justify-center'>
        <img src={Logo} alt={'background'}/>
        <button className=" bg-queens-blue p-2 rounded-md hover:bg-blue-400">
            <Link to='/signup' className=''>
                <div className="flex text-white">
                    Get Started
                </div>
            </Link>
        </button>
      </div>

    </div>
  )
}

export default Home