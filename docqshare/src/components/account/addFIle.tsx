import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddRecipientButton from "../buttons/addRecipientButton";
import { sha256 } from "crypto-hash";
import { addFileToList, setCurrentFile, addCurrentFileAccessor, User, setCurrentFileAccessorList } from "src/redux/userSlice";
import Web3 from "web3";
import { ethers } from "ethers";
import { deployedContract } from "src/config";
import abi from "../../contracts/abi.json";
declare var window: any;

export interface MsgObject {
    message: string;
    color: string;
}

interface AddFileProps {
    account: object;
}

export default function AddFile(props: AddFileProps) {
    const dispatch = useDispatch<any>();
    const userState: User = useSelector((state: any) => state.user);
    const { currentFile, walletId } = userState;

    const accountInfo = props.account;
    let [isOpen, setIsOpen] = useState(false);
    const [fileSnapshot, setFileSnapshot] = useState<any>(null);
    const [currRecipient, setCurrRecipient] = useState<string | null>("");
    const [msg, setMsg] = useState<MsgObject | null>(null);
    const contract_abi = abi;

    const token = localStorage.getItem("authToken");
    const changeMessage = (color: string, content: string) => {
        setMsg({ ...msg, color: color, message: content });
    };

    function closeModal() {
        setIsOpen(false);
        setFileSnapshot(null);
        setCurrRecipient(null);
        dispatch(setCurrentFile({ id: null, owner: null, accessor: [], payload: null, name: null, hash: null }));
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleUploadFile = async (event: any) => {
        if (event.target.files) {
            setFileSnapshot(URL.createObjectURL(event.target.files[0]));
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                if (reader.result) {
                    await window.ethereum.request({ method: "eth_requestAccounts" });
                    window.web3 = new Web3(window.ethereum);
                    const requestedAccounts = await window.web3.eth.requestAccounts();
                    const hash = await sha256(reader.result);
                    dispatch(
                        setCurrentFile({
                            ...currentFile,
                            payload: reader.result,
                            hash: hash,
                            owner: requestedAccounts[0],
                            name: file.name,
                        })
                    );
                }
            };
        }
    };

    const addFile = async () => {
        try {
            axios
                .post(
                    "http://localhost:3500/file/addFile",
                    {
                        hash: currentFile?.hash,
                        owner: currentFile?.owner,
                        accessor: currentFile?.accessor,
                        payload: currentFile?.payload,
                        name: currentFile?.name,
                    },
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                )
                .then(async (response) => {
                    dispatch(addFileToList(response.data.file));
                    return;
                })
                .catch((err) => {
                    console.log(err);
                    return;
                });
        } finally {
            closeModal();
        }
    };

    const handleSubmit = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(deployedContract, contract_abi, signer);
            let tx = await contract.addOwnership("url", 1);
            console.log(tx, "Adding an owner to a document");
            const ownerTxn = await tx.wait();
            console.log("Finished Adding Ownership to the document, Transaction Hash is:", ownerTxn.transactionHash);
        }
        await addFile();
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
            // Chain Call to add access
            // const provider = new ethers.providers.Web3Provider(window.ethereum);
            // const signer = provider.getSigner();
            // const contract = new ethers.Contract(deployedContract, contract_abi, signer);
            // let tx = await contract.addAccess(currRecipient, "url", 1);
            // console.log(contract, "ARE WE HERE");
            // console.log(tx, "Adding an Access to a document");
            // const accessTxn = await tx.wait();
            // console.log("Finished Adding Access to the document, Transaction Hash is:", accessTxn.transactionHash);
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
                    changeMessage(response.data.color, response.data.message);
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
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const signer = provider.getSigner();
        // const contract = new ethers.Contract(deployedContract, contract_abi, signer);
        // let tx = await contract.removeAccess(recipient, "url", 1);
        // console.log(tx, "Adding an Access to a document");
        // const removeAccessTx = await tx.wait();
        // console.log("Finished Removing Access to the document, Transaction Hash is:", removeAccessTx.transactionHash);
        dispatch(setCurrentFileAccessorList([...currentFile.accessor.filter((r: string) => r !== recipient)]));
        changeMessage("bg-green-600", "Succesfully Removed.");
        setTimeout(() => {
            setMsg(null);
        }, 1000);
    }

    return (
        <>
            <div className="">
                <button type="button" onClick={openModal} className="w-32 rounded-md bg-queens-blue px-4 py-2 text-sm font-medium text-white hover:bg-blue-400 ">
                    Add File
                </button>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className={`flex ${fileSnapshot ? "h-full w-full" : "min-h-full"} items-center justify-center p-4 text-center`}>
                                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                    <Dialog.Panel className={`${fileSnapshot ? "w-3/4" : "w-1/2"} h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                                        <div className="w-full h-full">
                                            <div className="w-full h-full">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-center">
                                                    ADD FILE
                                                </Dialog.Title>
                                                <div className="w-full rounded-md flex flex-col items-center">{msg && <p className={`${msg.color} text-center py-1 text-white rounded-md w-1/3`}>{msg.message}</p>}</div>
                                                <div className="mt-2 w-full h-full">
                                                    {fileSnapshot && <iframe className="w-full h-3/4 border-8 border-blue-400 rounded-md" src={fileSnapshot} title={"current file"} />}
                                                    <div className={`w-full flex flex-col items-center ${fileSnapshot && "pt-2"}`}>
                                                        <input
                                                            className="focus:outline-0 flex items-center input:w-full w-1/2 file:w-32 file:h-full bg-page-bg text-black rounded-md file:rounded-l-md file:bg-queens-blue file:px-4 file:py-2 file:text-sm file:font-medium file:text-white file:hover:bg-blue-400"
                                                            type="file"
                                                            onChange={(e) => handleUploadFile(e)}
                                                        />
                                                    </div>
                                                    {fileSnapshot && (
                                                        <div className="w-full flex flex-col items-center pt-4">
                                                            <button
                                                                    className="rounded-md py-2 w-1/2 h-full bg-queens-blue px-4 text-sm font-medium text-white hover:bg-blue-400 "
                                                                    onClick={() => {
                                                                        handleSubmit();
                                                                    }}
                                                                >
                                                                    Submit
                                                                </button>
                                                        </div>
                                                    )}
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
