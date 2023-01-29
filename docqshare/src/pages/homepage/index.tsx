import React from 'react'
import TopNavigationHome from '../../components/topnavigation/index_home';

const Home = () => {
  const securityLogo = require('../../assets/security_logo.png');
  const arsh = require('../../assets/arsh_pfp.jpg');
  const will = require('../../assets/will_pfp.jpg');
  const gav = require('../../assets/gav_pfp.jpg')

  return (
    <div className='bg-queens-blue w-screen h-screen overflow-auto scrollbar-hide scroll-smooth'>
      <div className='w-full h-28 z-10 fixed'>
        <TopNavigationHome 
          howItWorks={'/#howItWorks'}
          aboutUs={'/#aboutUs'}
        />
      </div>
      {/* LANDING PAGE */}
      <div id='landingPage' className='w-full h-full flex flex-col items-center justify-center z-0 pt-28'>
        <div className='w-full h-full grid grid-cols-2 p-4 place-items-center gap-x-12'>
          <div className='flex pl-12'>
            <div className='w-full h-full m-auto'>
              <div className='w-full h-full pl-10'>
                <p className='text-4xl text-white font-bold'>Secure file sharing made easy.</p>
                <p className='text-md text-white font-bold pt-4'>
                  Start sending and requesting files today with security 
                  and integrity protection at every step thanks to AWS and Ethereum Blockchain integration.
                </p>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-full  object-scale-down p-12'>
            <img alt="" src={securityLogo} className='w-60 h-60 bg-white m-2'/>
          </div>
        </div>
      </div>
      {/* HOW IT WORKS */}
      <div id='howItWorks' className='w-full h-full flex flex-col items-center justify-center z-0 pt-28 bg-page-bg'>
        <div className='w-full h-full flex flex-col items-center px-10'>
          <div className='grid grid-cols-2 bg-queens-blue m-auto rounded-lg p-10 gap-x-10'>
            <div className='flex'>
              <p className='text-white text-5xl m-auto text-center'>How it works</p>
            </div>
            <div>
              <p className='text-white text-lg'>
                DocQshare is a file sharing platform that allows users to request and send files safely via the internet.
                The site leverages the security principles of the Etherum blockchain smart contracts to ensure 
                files' integrity is maintained and that files are safely and securly transferred between authenticated users. 
                Files are stored in AWS's RDS platform which ensures they are protected via encryption at every stage of management.
                The platform requires metamask extension with site-dedicated authentication to add an extra layer of security to users
                interacting with the site.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ABOUT US */}
      <div id='aboutUs' className='w-screen h-screen pt-28 bg-queens-blue'>
        <div className='grid grid-cols-4 p-4 w-full h-full gap-x-4'>
          <div className='w-full h-full bg-white p-6 rounded-lg'>
            <div className='w-full h-full'>
              <img src={will} alt={''} className='w-40 h-40 relative mx-auto rounded-lg overflow-hidden bg-white'/>
              <p className='text-center w-full text-black text-2xl'>William Kennedy</p>
              <p className='text-center w-full text-black text-lg'>Full-stack Developer</p>
              <p className=' w-full text-black text-md pt-10'>
                Generated the authentication buisiness logic that integrates with the blockchain smart-contracts. 
                Lead developper of overall frontend architecture. Project SCRUM master and developped test-suites and CI/CD pipeline for development cycle.
              </p>
            </div>
          </div>
          <div className='w-full h-full bg-white p-6 rounded-lg'>
            <div className='w-full h-full'>
              <img src={arsh} alt={''} className='w-40 h-40 relative mx-auto rounded-lg overflow-hidden bg-white'/>
              <p className='text-center w-full text-black text-2xl'>Arsh Kocchar</p>
              <p className='text-center w-full text-black text-lg'>Full-stack/Blockchain Developer</p>
            </div>
          </div>
          <div className='w-full h-full bg-white p-6 rounded-lg'>
            <div className='w-full h-full'>
              <img src={gav} alt={''} className='w-40 h-40 relative mx-auto rounded-lg overflow-hidden bg-white'/>
              <p className='text-center w-full text-black text-2xl'>Gavin Anderson</p>
              <p className='text-center w-full text-black text-lg'>Blockchain Developer</p>
            </div>
          </div>
          <div className='w-full h-full bg-white p-6 rounded-lg'>
            <div className='w-full h-full'>
              <img src={securityLogo} alt={''} className='w-40 h-40 relative mx-auto rounded-lg overflow-hidden bg-white'/>
              <p className='text-center w-full text-black text-2xl'>Derek Gunda</p>
              <p className='text-center w-full text-black text-lg'>Cloud/Back-end developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home