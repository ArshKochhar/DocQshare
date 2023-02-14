import React from 'react'
import { motion } from 'framer-motion';
import AddFile from './addFIle';

function SentFileTable() {
    return (
        <motion.div 
            className='w-full h-full bg-white rounded-lg shadow-xl'
            initial={{ x: -40 }}
            animate={{ x: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
        <div className='fixed w-full h-12 flex justify-start items-center px-2'>
            <AddFile/>
        </div>
        </motion.div>
    )
}

export default SentFileTable