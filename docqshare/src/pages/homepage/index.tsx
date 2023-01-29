import { useState } from 'react';
import DevSection from '../../components/homepage/dev_section';
import TopNavigationHome from '../../components/topnavigation/index_home';

const Home = () => {
  const securityLogo: string = require('../../assets/security_logo.png');
  const arsh: string = require('../../assets/arsh_pfp.jpg');
  const will: string = require('../../assets/will_pfp.jpg');
  const gav: string = require('../../assets/gav_pfp.jpg');
  const derek: string = require('../../assets/derek_pfp.jpg');

  const [landed, setLanded] = useState<boolean>(false);


  return (
    <div className='bg-queens-blue w-screen h-screen overflow-auto scrollbar-hide scroll-smooth'>
      <div className='w-full h-28 z-10 fixed'>
        <TopNavigationHome 
          howItWorks={'/#howItWorks'}
          aboutUs={'/#aboutUs'}
          landingPage={'/#landingPage'}
          landing={setLanded}
        />
      </div>
      {/* LANDING PAGE */}
      <div id='landingPage' className={`w-full h-full flex flex-col items-center justify-center z-0 pt-28 transform transition-all ease-out`}>
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
              <p className='text-white text-6xl m-auto text-center font-bold'>How it works</p>
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
      <div id='aboutUs' className='w-screen h-screen pt-28 bg-queens-blue z-0'>
        <div className='grid grid-cols-4 p-4 w-full h-3/4 gap-x-4 place-items-center'>
          <DevSection
            img={will}
            name={'William Kennedy'}
            role={'Full-stack Developer'}
            description={'Generated the authentication business logic that integrates with the blockchain smart-contracts. Lead developper of overall frontend architecture. Project SCRUM master and developped test-suites and CI/CD pipeline for development cycle.'}
            />
          <DevSection
            img={arsh}
            name={'Arsh Kocchar'}
            role={'Full-stack/Blockchain Developer'}
            description={''}
            />
          <DevSection
            img={gav}
            name={'Gavin Anderson'}
            role={'Blockchain Developer'}
            description={''}
            />
          <DevSection
            img={derek}
            name={'Derek Gunda'}
            role={'Cloud/Back-end developer'}
            description={''}
            />
        </div>
      </div>
    </div>
  )
}

export default Home