import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setWalletId } from 'src/redux/userSlice';
import Web3 from 'web3';
declare var window: any

export interface DeleteProps {
    fileId: string|null;
    setLoaded: (loaded: boolean) => void;
    getFiles: () => void;
}

function TransferOwnership({fileId, setLoaded, getFiles}: DeleteProps) {
    const dispatch = useDispatch<any>();
    const token = localStorage.getItem("authToken");
    let [isOpen, setIsOpen] = useState(false);
    const [newOwner, setNewOwner] = useState<string | null>(null);
    const [msg, setMsg] = useState<string | null>(null);
    const [msgColor, setMsgColor] = useState<string | null>(null);

    function closeModal() {
        getFiles();
        setIsOpen(false);
        setMsg(null);
        setMsgColor(null);
    }

    function openModal() {
        setIsOpen(true);
    };

    const transferOwnership = async (fileId: string | null, newOwner: string | null) => {
        if (fileId) {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            const requestedAccounts = await window.web3.eth.requestAccounts();
            dispatch(setWalletId(requestedAccounts));
            axios.post("http://localhost:3500/file/transferOwnership", 
            { 
                new_owner: newOwner,
                fileId: fileId
            }, 
            {
                headers: { 'Authorization': token },
            }).then(async (response) => {
                setMsgColor(response.data.color);
                setMsg(response.data.message);
                closeModal();
                return;
            }).catch((err) => {
                setMsgColor(err.response.data.color);
                setMsg(err.response.data.message);
                setTimeout(() => {
                    setMsg(null);
                    setMsgColor(null);
                }, 1000)
                return;
            });
        }
    };

    return (
        <>
            <div className='w-full'>
                <button className="rounded-md h-full w-full bg-queens-blue text-sm font-medium text-white hover:bg-blue-400" onClick={openModal}>Transfer Ownership</button>
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
                                                Enter Public Wallet Id Of New Owner:
                                            </Dialog.Title>
                                        </div>
                                        <div className='w-full h-full'>
                                            {msg 
                                                && 
                                                <div className='w-full h-full flex flex-col items-center py-2'>
                                                    <p className={`text-white px-2 w-fit ${msgColor} rounded-md text-center`}>{msg}</p>
                                                </div>
                                            }
                                            <div className='w-full h-full flex'>
                                                <input 
                                                    className="rounded-md w-2/3 h-8 bg-gray-100 text-sm font-medium text-black border-queens-blue border-2 p-1" 
                                                    type="text"
                                                    onChange={(e) => setNewOwner(e.target.value)}
                                                />
                                                <div className='w-1/3 pl-4 flex'>
                                                    <button className="rounded-md w-full h-8 bg-green-600 text-sm font-medium text-white hover:bg-green-400" onClick={() => transferOwnership(fileId, newOwner)}>Confirm</button>
                                                </div>
                                            </div>
                                            
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

export default TransferOwnership