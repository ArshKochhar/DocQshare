import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentFileAccessor, FileObj, setCurrentFile, setCurrentFileAccessorList, User } from "src/redux/userSlice";
import AddRecipientButton from "../buttons/addRecipientButton";
import abi from "../../contracts/abi.json";
import { ethers } from "ethers";
import { deployedContract } from "src/config";
declare var window: any;

export interface MsgObject {
    message: string;
    color: string;
}

function AddRecipient({ file, getFiles }: { file: FileObj; getFiles: () => void }) {
    const dispatch = useDispatch<any>();
    const userState: User = useSelector((state: any) => state.user);
    const { currentFile, walletId } = userState;
    const contract_abi = abi;

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        getFiles();
        dispatch(setCurrentFileAccessorList([]));
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
        dispatch(setCurrentFile(file));
    }

    const [currRecipient, setCurrRecipient] = useState<string | null>("");
    const [msg, setMsg] = useState<MsgObject | null>(null);

    const token = localStorage.getItem("authToken");
    const changeMessage = (color: string, content: string) => {
        setMsg({ ...msg, color: color, message: content });
    };

    const handleAddRecipient = async (): Promise<void> => {
        // check if wallet is of a valid DocQshare user
        if (walletId && currRecipient === walletId[0]) {
            changeMessage("bg-red-600", "Cannot Add Yourself.");
            setTimeout(() => {
                setMsg(null);
            }, 500);
            setCurrRecipient("");
        } else if (currRecipient && !currentFile.accessor.includes(currRecipient)) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(deployedContract, contract_abi, signer);
            let tx = await contract.addAccess(currRecipient, file.hash, 1);
            console.log(tx, "Adding an Access to a document");
            const accessTxn = await tx.wait();
            console.log("Finished Adding Access to the document, Transaction Hash is:", accessTxn.transactionHash);
            axios
                .post(
                    "http://localhost:3500/auth/checkWallet",
                    { walletId: currRecipient },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then((response: any) => {
                    changeMessage(response.data.color, "Verified User Check Passed.");
                    dispatch(addCurrentFileAccessor(currRecipient));
                    setCurrRecipient("");
                    setTimeout(() => {
                        setMsg(null);
                    }, 500);
                })
                .catch((error: any) => {
                    changeMessage(error.response.data.color, error.response.data.message);
                    setTimeout(() => {
                        setMsg(null);
                    }, 500);
                });
        } else {
            changeMessage("bg-red-600", "Recipient Already Added.");
            setTimeout(() => {
                setMsg(null);
            }, 500);
        }
    };

    async function handleRemoveRecipient(recipient: string) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(deployedContract, contract_abi, signer);
        let tx = await contract.removeAccess(recipient, file.hash, 1);
        console.log(tx, "Removing Access to a document");
        const removeAccessTx = await tx.wait();
        console.log("Finished Removing Access to the document, Transaction Hash is:", removeAccessTx.transactionHash);
        dispatch(setCurrentFileAccessorList([...currentFile.accessor.filter((r: string) => r !== recipient)]));
        changeMessage("bg-green-600", "Succesfully Removed");
        setTimeout(() => {
            setMsg(null);
        }, 1000);
    }

    const handleSubmit = async () => {
        try {
            axios
                .post(
                    "http://localhost:3500/file/updateAccessors",
                    { file_id: currentFile.id, accessors: currentFile.accessor },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then((response: any) => {
                    changeMessage(response.data.color, response.data.message);
                    dispatch(setCurrentFileAccessorList([...response.data.accessor.map((accessor: { file_id: string; wallet_id: string }) => accessor.wallet_id)]));
                    setTimeout(() => {
                        setMsg(null);
                    }, 1000);
                })
                .catch((error: any) => {
                    console.log(error);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="w-full">
                <button className="rounded-md h-full w-full bg-queens-blue px-4 text-sm font-medium text-white hover:bg-blue-400" onClick={openModal}>
                    Edit Accessor(s)
                </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className={`flex min-h-full w-full items-center justify-center p-4 text-center`}>
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-1/2 h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="w-full h-full">
                                        <div className="w-full h-full">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                                                ADD {currentFile.accessor.length} ACCESSOR(S)
                                            </Dialog.Title>
                                            <div className="w-full rounded-md flex flex-col items-center">{msg && <p className={`${msg.color} text-center py-1 text-white rounded-md w-1/3`}>{msg.message}</p>}</div>
                                            <div className="w-full flex flex-col items-center">
                                                <AddRecipientButton currentRecipient={currRecipient ?? ""} setCurrentRecipient={setCurrRecipient} handleAddRecipient={handleAddRecipient} />
                                                {currentFile.accessor.length !== 0 && (
                                                    <div className="w-3/4 h-40 overflow-hidden border-2 border-page-bg rounded-md">
                                                        <div className="text-center py-2 text-white overflow-y-scroll w-full h-full scrollbar-hide scroll-smooth p-1">
                                                            {currentFile.accessor.map((recipient) => {
                                                                return (
                                                                    <div className="grid grid-cols-12 gap-x-2 pb-1" key={recipient}>
                                                                        <button className="text-white bg-red-300 hover:bg-red-600 col-span-1 rounded-full" onClick={() => handleRemoveRecipient(recipient)}>
                                                                            X
                                                                        </button>
                                                                        <p className="text-black col-span-9">{recipient}</p>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="w-full flex flex-col items-center pt-4">
                                                <div className="w-1/2">
                                                    {currentFile.accessor.length !== 0 && (
                                                        <button
                                                            className="rounded-md py-2 w-full h-full bg-queens-blue px-4 text-sm font-medium text-white hover:bg-blue-400 "
                                                            onClick={() => {
                                                                handleSubmit();
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                    )}
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
    );
}

export default AddRecipient;
