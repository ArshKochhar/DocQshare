import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FileObj, User } from 'src/redux/userSlice';
import AddFile from './addFIle';

function SentFileTable() {
    const userState: User = useSelector((state: any) => state.user);
    const { files } = userState;

    return (
        <motion.div 
            className='w-full h-full bg-white rounded-t-lg shadow-xl'
            initial={{ x: -40 }}
            animate={{ x: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
        <div className='pb-4 w-full h-full overflow-auto scrollbar-hide'>
            <div className='w-full h-[40px] fixed pb-12'>
                <div className='w-full h-[40px] fixed bg-white grid grid-cols-2 place-items-center rounded-t-md'>
                    <div className='w-1/2 text-xl font-bold text-center'>File</div>
                    <div className='w-1/2 text-xl font-bold text-center'>Accessor(s)</div>
                </div>
            </div>
            <div className='w-full pt-[42px]'/>
            <table className='inset-0 w-full table-fixed pb-10 overflow-hidden'>
                <tbody className='w-full'>
                    {files.map((file: FileObj) => {
                        return (
                            <tr key={file.hash} className='w-full h-[300px] border-b-2 border-page-bg'>
                                <td className='w-1/2 h-[300px] text-black font-bold text-center text-xs p-2'>
                                    <div className='w-full h-full'>
                                        <div className='overflow-auto scrollbar-hide border-2 border-black rounded-md bg-page-bg'>
                                            <iframe className='w-full h-[300px] overflow-auto scroll-smooth scrollbar-hide' src={file.payload} title={"current file"}/>
                                            <a className='w-full h-full' href={file.payload} title={"current file"} download={file.name}>{"DOWNLOAD: " + file.name}</a>
                                        </div>
                                        <p className='text-center text-xs font-bold'>{"Owner: " + file.owner}</p>
                                    </div>
                                </td>
                                <td className='w-1/2 h-[300px] text-black font-bold text-center text-xs p-2 overflow-hidden'>
                                    {
                                        <div className='w-full h-[250px] overflow-hidden'>
                                            <ul className='w-full h-[250px] overflow-auto scroll-smooth scrollbar-hide'>
                                                {file.accessor.map((acc) => <li className='text-black font-bold text-center text-xs truncate' key={acc}>{acc}</li>)}
                                            </ul>
                                        </div>
                                    }
                                    <div className='w-full flex flex-row gap-x-2 pt-4 h-[50px]'>
                                        <button className="rounded-md py-2 w-full bg-queens-blue px-4 text-sm font-medium text-white hover:bg-blue-400 ">Edit Accessor(s)</button>
                                        <button className="rounded-md py-2 w-full bg-queens-blue px-4 text-sm font-medium text-white hover:bg-blue-400 ">Transfer Ownership</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            <div className='absolute inset-x-0 bottom-0'>
                <div className='w-full h-10 flex flex-col items-center fixed bg-white rounded-b-lg'>
                    <AddFile/>
                </div>
            </div>
        </div>
        </motion.div>
    )
}

export default SentFileTable