import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../redux/userSlice';
import AddRecipientButton from '../buttons/addRecipientButton';
import Web3 from "web3";


export interface MsgObject {
    message: string;
    color: string;
}

export default function AddFile() {
    const dispatch = useDispatch();
    const userState: User = useSelector((state: any) => state.user);
    const fileState: File = useSelector((state: any) => state.file);

    let [isOpen, setIsOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState<any>(null);
    const [nextPage, setNextPage] = useState<boolean>(true);
    const [currRecipient, setCurrRecipient] = useState<string>("");
    const [listOfRecipients, setListOfRecipients] = useState<string[]>([]);
    const [msg, setMsg] = useState<MsgObject | null>(null);
    const token = localStorage.getItem("authToken");
    const changeMessage = (color: string, content: string) => {
        setMsg({...msg, color: color, message: content})
    }


    function closeModal() {
        setIsOpen(false);
        setCurrentFile(null);
    }

    function openModal() {
        setIsOpen(true)
    }

    const hashFile = (event: any) => {
        // var file = event.target.files[0];
        // var reader = new FileReader();
        // reader.onload = function (event) {
        //     var data = event?.target?.result;
        //     console.log('Data: ' + data);
        // };
        // reader.readAsBinaryString(file);
        const x = Web3.utils.keccak256(JSON.stringify(event.target.files[0]));
        console.log(x)
    }

    const handleUploadFile = (event: any) => {
        // if (file) {
        //     if (file[0].type === 'application/pdf') {
        //         dispatch(addFile(file[0]));
        //         setCurrentFile(URL.createObjectURL(file[0]))
        //     }
        //     else {
        //         changeMessage('bg-red-600', "Incorrect File type");
        //     }
        // }
        // console.log(file[0].type, file[0].name)
        if (event.target.files) {
            setCurrentFile(URL.createObjectURL(event.target.files[0]))
            hashFile(event)
        }
    }

    const handleSubmit = () => {
        // add file to user list
        closeModal();
    }

    const handleAddRecipient = async(): Promise<void> => {
            // check if wallet is of a valid DocQshare user
            if (currRecipient && listOfRecipients.find((val) => val === currRecipient) === undefined) {
            axios.post("http://localhost:3500/auth/checkWallet", 
            { walletId: currRecipient,
            }, {
                headers: {
                'Authorization': token,
                }
            }).then((response: any) => {
                changeMessage(response.data.color, response.data.message);
                setListOfRecipients([...listOfRecipients, currRecipient]);
                setCurrRecipient("");
                setTimeout(() => {
                    setMsg(null);
                }, 1000)
            }).catch((error: any) => {
                changeMessage(error.response.data.color, error.response.data.message);
                setTimeout(() => {
                    setMsg(null);
                }, 1000)
            });
        }
    }

    const handleRemoveRecipient = (recipient: string) => {
        setListOfRecipients([...listOfRecipients.filter((r: string) => r !== recipient)]);
        changeMessage("bg-green-600", "Succesfully Removed");
        setTimeout(() => {
            setMsg(null);
        }, 1000)
    }

    return (
    <>
        <div className="fixed">
            <button
            type="button"
            onClick={openModal}
            className="w-32 rounded-md bg-queens-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 "
            >
            Add File
            </button>
        </div>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-black bg-opacity-25"/>
            </Transition.Child>
            { nextPage 
                ?
                <div className="fixed inset-0 overflow-y-auto">
                    <div className={`flex ${currentFile ? 'h-full w-full': 'min-h-full'} items-center justify-center p-4 text-center`}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`${currentFile ? 'w-3/4' :'w-1/2'} h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                                <div className="w-full h-full">
                                    <div className="w-full h-full">
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                                            ADD FILE
                                        </Dialog.Title>
                                        <div className="w-full rounded-md flex flex-col items-center">
                                            {msg && <p className={`${msg.color} text-center py-1 text-white rounded-md w-1/3`}>{msg.message}</p>}
                                        </div>
                                        <div className="mt-2 w-full h-full">
                                            {currentFile && <iframe className='w-full h-3/4 border-8 border-blue-400 rounded-md' src={currentFile} title={"current file"}/>}
                                            <div className={`w-full flex flex-col items-center ${currentFile && 'pt-2'}`}>
                                                <input 
                                                    className='focus:outline-0 flex items-center input:w-full w-1/2 file:w-32 file:h-full bg-page-bg text-black rounded-md file:rounded-l-md file:bg-queens-blue file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-blue-400'
                                                    type='file'
                                                    onChange={(e) => handleUploadFile(e)}
                                                />
                                            </div>
                                            {currentFile &&
                                            <div className='w-full flex flex-col items-center pt-4'>
                                                <button 
                                                    className="rounded-md py-2 w-1/4 h-full bg-queens-blue px-4 text-sm font-medium text-white hover:bg-blue-400 "
                                                    onClick={() => {setNextPage(false)}}>
                                                    Next
                                                </button>
                                            </div>
                                        }
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
                : 
                <div className="fixed inset-0 overflow-y-auto">
                    <div className={`flex min-h-full w-full items-center justify-center p-4 text-center`}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-1/2 h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className='w-full h-full'>
                                    <div className='w-full h-full'>
                                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                                            ADD {listOfRecipients.length} RECIPIENT(S)
                                        </Dialog.Title>
                                        <div className="w-full rounded-md flex flex-col items-center">
                                            {msg && <p className={`${msg.color} text-center py-1 text-white rounded-md w-1/3`}>{msg.message}</p>}
                                        </div>
                                        <div className="w-full flex flex-col items-center">
                                            <AddRecipientButton currentRecipient={currRecipient} setCurrentRecipient={setCurrRecipient} handleAddRecipient={handleAddRecipient}/>
                                            { 
                                            listOfRecipients.length !==0 && 
                                                <div className="w-3/4 h-40 overflow-hidden border-2 border-page-bg rounded-md">
                                                    <div className='text-center py-2 text-white overflow-y-scroll w-full h-full scrollbar-hide scroll-smooth p-1'>
                                                        {listOfRecipients.map((recipient) => 
                                                        {
                                                            return (
                                                                <div className="grid grid-cols-12 gap-x-2 pb-1">
                                                                    <button className="text-white bg-red-300 hover:bg-red-600 col-span-1 rounded-full" onClick={() => handleRemoveRecipient(recipient)}>X</button> 
                                                                    <p className='text-black col-span-9'>{recipient}</p>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            }
                                            <div className='w-1/2 pt-4'>
                                                <div className={`pt-4 ${listOfRecipients.length !== 0 ? 'grid grid-cols-2 gap-x-4' : 'w-full'}`}>
                                                    <button 
                                                        className="rounded-md py-2 w-full h-full bg-queens-blue px-4 text-sm font-medium text-white hover:bg-blue-400 "
                                                        onClick={() => {setNextPage(true)}}>
                                                        Back
                                                    </button>
                                                    {
                                                    listOfRecipients.length !==0 && 
                                                        <button 
                                                            className="rounded-md py-2 w-full h-full bg-queens-blue px-4 text-sm font-medium text-white hover:bg-blue-400 "
                                                            onClick={() => {handleSubmit()}}>
                                                            Submit
                                                        </button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            }
            </Dialog>
        </Transition>
    </>
    )
}