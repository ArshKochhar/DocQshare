import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { FileObj, User, setWalletId, setListOfAccessedFiles } from 'src/redux/userSlice';
import { useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3';
declare var window: any

function AccessorFileTable() {
    const dispatch = useDispatch<any>();
    const userState: User = useSelector((state: any) => state.user);
    const { accessedFiles } = userState;
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
            const files = response.data.files.map((file: any) => {
                return { 
                    id: file.file_id, 
                    accessor: [],
                    name: file.file_name,
                    payload: file.file,
                    owner: file.Owner,
                    hash: file.Hash
                }
            });
            dispatch(setListOfAccessedFiles([...files]))
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
                    {accessedFiles.map((file: FileObj) => {
                        return (
                            <tr key={file.id} className='w-full h-[360px] border-b-4 border-page-bg'>
                                <td className='w-full h-[360px] text-black font-bold text-center text-xs grid grid-cols-2 gap-x-2'>
                                    <div className='w-full h-full py-2'>
                                        <iframe className='w-full h-full overflow-auto scroll-smooth scrollbar-hide border-2 border-black' src={file.payload} title={"current file"}/>
                                    </div>
                                    <div className='w-full h-full py-2'>
                                        <div className='w-full h-1/2 flex items-center gap-y-2 px-2'>
                                            <button className='w-full h-12 bg-queens-blue text-sm font-medium text-white hover:bg-blue-400 rounded-md'>
                                                <a href={file.payload} title={"current file"} download={file.name}>{"DOWNLOAD: " + file.name}</a>
                                            </button>
                                        </div>
                                        <p className='text-center text-xs font-bold w-full bg-green-500 text-white rounded-md'>{"Owner: " + file.owner}</p>
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