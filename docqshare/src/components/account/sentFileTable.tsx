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
        <div className='pt-2 px-2 pb-10 w-full h-full'>
            <table className='inset-0 w-full border-2 border-page-bg'>
                <tr>
                    <th>File</th>
                    <th>Owner</th>
                    <th>Accessors</th>
                </tr>
            </table>
            <div className='absolute inset-x-0 bottom-0'>
                <div className='w-full h-10 flex flex-col items-center'>
                    <AddFile/>
                </div>

            </div>
        </div>
        </motion.div>
    )
}

export default SentFileTable