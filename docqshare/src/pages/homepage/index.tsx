import { motion } from 'framer-motion';
import DevSection from '../../components/homepage/dev_section';
import TopNavigationHome from '../../components/topnavigation/index_home';

const Home = () => {
  const securityLogo: string = require('../../assets/security_logo.png');
  const arsh: string = require('../../assets/arsh_pfp.jpg');
  const will: string = require('../../assets/will_pfp.jpg');
  const gav: string = require('../../assets/gav_pfp.jpg');
  const derek: string = require('../../assets/derek_pfp.jpg');




  return (
    <div className='bg-queens-blue w-screen h-screen overflow-auto scrollbar-hide scroll-smooth'>
      <div className='w-full h-28 z-10 fixed'>
        <TopNavigationHome 
          howItWorks={'/#howItWorks'}
          aboutUs={'/#aboutUs'}
          landingPage={'/#landingPage'}
        />
      </div>
      {/* LANDING PAGE */}
      <div id='landingPage' className={`w-full h-full flex flex-col items-center justify-center z-0 pt-28 transform transition-all ease-out scroll-smooth`}>
        <div className='w-full h-full grid grid-cols-2 p-4 place-items-center gap-x-12'>
          <div className='flex pl-12'>
            <div className='w-full h-full m-auto'>
              <div className='w-full h-full pl-10'>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                >
                <p className='text-4xl text-white font-bold'>Secure file sharing made easy.</p>
                <p className='text-md text-white font-bold pt-4'>
                  Start safely sharing files today with protection at every step thanks to AWS and <br></br> Ethereum Blockchain integration.
                </p>
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}>
              <div className='bg-white rounded-full  object-scale-down p-12'>
                <img alt="" src={securityLogo} className='w-60 h-60 bg-white m-2'/>
              </div>
              </motion.div>
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
                DocQshare is a file sharing platform that allows users to share files safely via the internet.
                The site leverages the security principles of the Etherum blockchain smart contracts to ensure 
                files' integrity is maintained and that files are safely and securly transferred between authenticated users.<br></br> 
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
        <div className='grid grid-cols-4 p-10 w-full h-3/4 gap-x-12 place-items-center'>
          <motion.button
            className='w-full h-full'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <DevSection
              img={will}
              name={'William Kennedy'}
              role={'Full-stack Developer'}
              description={'Generated the authentication business logic that integrates with the blockchain smart-contracts. Lead developper of overall front-end and back-end architecture. Project SCRUM master and developped test-suites for front-end and api integration.'}
              />
          </motion.button>
          <motion.button
            className='w-full h-full'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <DevSection
              img={arsh}
              name={'Arsh Kocchar'}
              role={'Blockchain Developer'}
              description={'Lead developer of the smart-contract integration and test-suite via the Ganache test-net environment.'}
              />
          </motion.button>
          <motion.button
          className='w-full h-full'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <DevSection
              img={gav}
              name={'Gavin Anderson'}
              role={'Blockchain Developer'}
              description={'Lead developer of the solidty smart contracts required for the Web3 integration. Generated a variety of unit tests to ensure the smart contracts are working as intended. '}
              />
          </motion.button>
          <motion.button
          className='w-full h-full'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <DevSection
              img={derek}
              name={'Derek Gunda'}
              role={'Cloud/Back-end developer'}
              description={'Lead developer of the AWS RDS integration. Generated business logic for a variety of the endpoints and assisted in the development of the test-suites for the back-end API endpoints.'}
              />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Home