import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FileObj, User, setWalletId, setListOfFiles } from 'src/redux/userSlice';
import AddFile from './addFIle';
import { useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import AddRecipient from './addRecipient';
declare var window: any

function AccessorFileTable() {
    const dispatch = useDispatch<any>();
    const userState: User = useSelector((state: any) => state.user);
    const { files } = userState;
    const token = localStorage.getItem("authToken");

    const getSentFiles = async () => {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);
        const requestedAccounts = await window.web3.eth.requestAccounts();
        dispatch(setWalletId(requestedAccounts));
    
        axios.post("http://localhost:3500/file/getSentFilesId", 
        { 
            user: requestedAccounts[0]
        }, 
        {
            headers: { 'Authorization': token }
        }).then(async (response) => {
            console.log(response);
            return;
        }).catch((err) => {
            console.log(err)
            return;
        });
    };

    useEffect(() => {
        getSentFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div 
            className='w-full h-full bg-white rounded-t-lg shadow-xl'
            initial={{ x: -40 }}
            animate={{ x: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
        >
        <div className='pb-4 w-full h-full overflow-auto scrollbar-hide'>
            <div className='w-full h-[40px] fixed pb-12'>
                <div className='w-full h-[40px] fixed bg-white flex justify-center rounded-t-md border-b-2 border-page-bg'>
                    <div className='w-1/2 text-xl font-bold text-center py-1'>File</div>
                </div>
            </div>
            <div className='w-full pt-[40px]'/>
            <table className='inset-0 w-full table-fixed pb-10 overflow-hidden border-2 border-page-bg p-1'>
                <tbody className='w-full'>
                    {[].map((file: FileObj) => {
                        return (
                            <tr key={file.id} className='w-full h-[300px] border-b-4 border-page-bg'>
                                <td className='w-1/2 h-[300px] text-black font-bold text-center text-xs py-2 px-10'>
                                    <div className='w-full h-full'>
                                        <div className='overflow-auto scrollbar-hide border-2 border-black rounded-md bg-page-bg'>
                                            <iframe className='w-full h-[300px] overflow-auto scroll-smooth scrollbar-hide' src={file.payload} title={"current file"}/>
                                            <button className='w-full h-full bg-queens-blue text-sm font-medium text-white hover:bg-blue-400'>
                                                <a href={file.payload} title={"current file"} download={file.name}>{"DOWNLOAD: " + file.name}</a>
                                            </button>
                                        </div>
                                        <p className='text-center text-xs font-bold w-full'>{"Owner: " + file.owner}</p>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
        </motion.div>
    )
}

export default AccessorFileTable;