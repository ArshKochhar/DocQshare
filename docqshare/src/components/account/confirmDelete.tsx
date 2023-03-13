import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import { Fragment, useState } from 'react'
import Web3 from 'web3';
declare var window: any

export interface DeleteProps {
    fileId: string|null;
    fileName: string|null;
    fileOwner: string|null;
    setLoaded: (loaded: boolean) => void;
    getFiles: () => void;
}

function ConfirmDelete({fileId, fileName, fileOwner, setLoaded, getFiles}: DeleteProps) {
    
    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        getFiles();
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    };

    const deleteFile = async (fileId: string | null) => {
        if (fileId) {
            setLoaded(false);
            await window.ethereum.request({method: 'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            const token = localStorage.getItem("authToken");
            axios.post("http://localhost:3500/file/deleteFile", 
            { 
                file_id: fileId,
                owner: fileOwner
            }, 
            {
                headers: { 'authorization': token }
            }).then(async (response) => {
                closeModal();
                return;
            }).catch((err) => {
                console.log(err)
                return;
            });
        }
    }

    return (
        <>
            <div className='w-full'>
                <button className="rounded-md w-full bg-red-600 text-sm font-medium text-white hover:bg-red-400" onClick={openModal}>Delete File</button>
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
                                                Are you sure you want to delete: {fileName}?
                                            </Dialog.Title>
                                        </div>
                                        <div className='w-full h-full flex justify-center items-center pt-10'>
                                            <button className="rounded-md w-1/2 h-12 bg-red-600 text-sm font-medium text-white hover:bg-red-400" onClick={() => deleteFile(fileId)}>Confirm Delete</button>
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

export default ConfirmDelete