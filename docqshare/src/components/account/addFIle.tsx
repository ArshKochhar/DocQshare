import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addFile, User } from '../../redux/userSlice';

export interface MsgObject {
    message: string;
    color: string;
}

export default function AddFile() {
    const dispatch = useDispatch();
    const userState: User = useSelector((state: any) => state.user);

    const token = localStorage.getItem("authToken");

    let [isOpen, setIsOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState<any>(null);
    const [currRecipient, setCurrRecipient] = useState<string>();
    const [listOfRecipients, setListOfRecipients] = useState<string[]>([]);
    const [msg, setMsg] = useState<MsgObject | null>(null);
    const changeMessage = (color: string, content: string) => {
        setMsg({...msg, color: color, message: content})
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleUploadFile = (file: any) => {
        if (file) {
            dispatch(addFile(file[0]));
            setCurrentFile(URL.createObjectURL(file[0]))
        }
        console.log(userState.files)
    }

    const handleAddRecipient = async() => {
        // check if wallet is of a valid DocQshare user
        if (currRecipient) {
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
        }).catch((error: any) => {
            changeMessage(error.data.color, error.data.message);
        });
    }
}

    return (
        <>
        <div className="fixed">
            <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-queens-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
            Add File
            </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

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
                    <Dialog.Panel className="w-3/4 h-3/4 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 text-center"
                    >
                        ADD FILE
                    </Dialog.Title>
                    <div className="mt-2 w-full h-full">
                            {currentFile && <iframe className='w-full h-3/4 overflow-auto border-8 border-blue-400 rounded-md' src={currentFile} title={"current file"}/>}
                        <div className="w-full pt-4">
                        <input 
                            className='w-full py-2 file:bg-queens-blue file:text-white file:rounded-md bg-page-bg text-black rounded-md p-1'
                            type='file'
                            onChange={(e) => handleUploadFile(e.target.files)}
                        />
                        </div>
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 text-center pt-4"
                            >
                                ADD RECIPIENT(S) 
                            </Dialog.Title>
                        <div className="mt-2 w-full flex">
                            <input
                                className='w-full py-2 bg-page-bg text-black rounded-l-md p-1'
                                value={currRecipient}
                                onChange={(e) => setCurrRecipient(e.target.value)}
                            />
                            <button 
                            className="rounded-r-md bg-queens-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            onClick={() => handleAddRecipient()}>Add</button>
                        </div>
                        <div className='text-center py-2 text-white'>
                            <div className="w-full rounded-md flex flex-col items-center">
                                {msg && <p className={`${msg.color} text-center py-1 text-white rounded-md w-1/3`}>{msg.message}</p>}
                            </div>
                            {listOfRecipients.map((recipient) => {return <p className='text-black'>{recipient}</p>})}
                        </div>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </>
    )
}