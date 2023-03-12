import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FileObj, User, setWalletId, setListOfFiles } from "src/redux/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import AddRecipient from "./addRecipient";
import { ClipLoader } from "react-spinners";
import ConfirmDelete from "./confirmDelete";
import TransferOwnership from "./transferOwnership";
declare var window: any;

function SentFileTable() {
    const dispatch = useDispatch<any>();
    const userState: User = useSelector((state: any) => state.user);
    const { sentFiles } = userState;
    const token = localStorage.getItem("authToken");

    const [loaded, setLoaded] = useState(false);

    const getOwnedFiles = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);
        const requestedAccounts = await window.web3.eth.requestAccounts();
        dispatch(setWalletId(requestedAccounts));
        axios
            .post(
                "http://localhost:3500/file/getOwnedFiles",
                {
                    owner: requestedAccounts[0],
                },
                {
                    headers: { Authorization: token },
                }
            )
            .then(async (response) => {
                const files = response.data.files.map((file: any) => {
                    return {
                        id: file.file_id,
                        accessor: response.data.accessors.filter((acc: any) => acc.file_id === file.file_id).map((acc: any) => acc.wallet_id),
                        name: file.file_name,
                        payload: file.file,
                        owner: file.Owner,
                        hash: file.Hash,
                    };
                });
                dispatch(setListOfFiles([...files]));
                setLoaded(true);
                return;
            })
            .catch((err) => {
                console.log(err);
                return;
            });
    };

    useEffect(() => {
        getOwnedFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div className="w-full h-full bg-white rounded-lg shadow-xl" initial={{ x: -40 }} animate={{ x: 2 }} transition={{ type: "spring", stiffness: 200 }}>
            <div className="w-full h-full overflow-auto scrollbar-hide">
                <div className="w-full h-[40px] fixed pb-12">
                    <div className="w-full h-[40px] fixed bg-white grid grid-cols-2 place-items-center rounded-t-md border-2 border-page-bg">
                        <div className="w-1/2 text-xl font-bold text-center">File</div>
                        <div className="w-1/2 text-xl font-bold text-center">Information</div>
                    </div>
                </div>
                <div className="w-full pt-[40px]" />
                {loaded ? (
                    <table className="inset-0 w-full table-fixed pb-10 overflow-hidden border-2 border-page-bg p-1">
                        <tbody className="w-full">
                            {sentFiles.map((file: FileObj) => {
                                return (
                                    <tr key={file.id} className="w-full h-[300px] border-b-4 border-page-bg">
                                        <td className="w-1/2 h-[300px] text-black font-bold text-center text-xs p-2 pb-10">
                                            <div className="w-full h-full">
                                                <div className="w-full py-2">
                                                    <p className="font-bold text-2xl">{file.name}</p>
                                                </div>
                                                <div className="overflow-auto scrollbar-hide border-2 border-black rounded-md bg-page-bg">
                                                    <iframe loading={"lazy"} className="w-full h-[300px] overflow-auto scroll-smooth scrollbar-hide" src={file.payload} title={"current file"} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="w-1/2 h-full text-black font-bold text-center text-xs p-2 overflow-hidden">
                                            <div className="w-full py-2">
                                                <p className="font-bold text-2xl">Accessor(s)</p>
                                            </div>
                                            {
                                                <div className="w-full h-full overflow-hidden border-2">
                                                    <ul className="w-full h-[250px] overflow-auto scroll-smooth scrollbar-hide">
                                                        {file.accessor.map((acc) => (
                                                            <li className="text-black font-bold text-center text-xs truncate" key={acc}>
                                                                {acc}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            }
                                            <div className="w-full h-full">
                                                <p className="text-center text-xs w-full font-bold underline rounded-md">{"Owner: " + file.owner}</p>
                                                <div className="w-full h-full flex flex-row gap-x-2 pt-4">
                                                    <AddRecipient file={file} getFiles={getOwnedFiles} />
                                                    <TransferOwnership fileId={file.id} setLoaded={setLoaded} getFiles={getOwnedFiles} />
                                                </div>
                                                <div className="w-full h-full flex flex-row gap-x-2 pt-4">
                                                    <button className="w-1/2 rounded-md bg-queens-blue text-sm font-medium text-white hover:bg-blue-400">
                                                        <a href={file.payload} title={"current file"} download={file.name}>
                                                            {"Download"}
                                                        </a>
                                                    </button>
                                                    <div className="w-1/2">
                                                        <ConfirmDelete fileId={file.id} fileName={file.name} setLoaded={setLoaded} getFiles={getOwnedFiles} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="flex flex-col items-center pt-40">
                        <ClipLoader color="#000000" size="300px" loading />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default SentFileTable;
