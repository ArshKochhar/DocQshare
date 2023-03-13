import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { FileObj, User, setWalletId, setListOfAccessedFiles } from "src/redux/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import { ClipLoader } from "react-spinners";
import { ethers } from "ethers";
import { deployedContract } from "src/config";
import abi from "../../contracts/abi.json";
declare var window: any;

function AccessorFileTable() {
    const dispatch = useDispatch<any>();
    const userState: User = useSelector((state: any) => state.user);
    const { accessedFiles } = userState;
    const token = localStorage.getItem("authToken");
    const contract_abi = abi;
    const [loaded, setLoaded] = useState(false);

    const getSentFiles = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);
        const requestedAccounts = await window.web3.eth.requestAccounts();
        dispatch(setWalletId(requestedAccounts));
        axios
            .post(
                "http://localhost:3500/file/getSentFilesId",
                {
                    user: requestedAccounts[0],
                },
                {
                    headers: { Authorization: token },
                }
            )
            .then(async (response) => {
                const files = response.data.files.map((file: any) => {
                    return {
                        id: file.file_id,
                        accessor: [],
                        name: file.file_name,
                        payload: file.file,
                        owner: file.Owner,
                        hash: file.Hash,
                    };
                });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(deployedContract, contract_abi, signer);
                // eslint-disable-next-line array-callback-return
                const integrityCheck = await Promise.all(files.map(async (file: FileObj) => await contract.checkAccess(file.hash)));
                const checkedFiles = files.filter((data: FileObj, index: number) => integrityCheck[index]);
                dispatch(setListOfAccessedFiles([...checkedFiles]));
                setLoaded(true);
                return;
            })
            .catch((err) => {
                console.log(err);
                return;
            });
    };

    useEffect(() => {
        getSentFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <motion.div className="w-full h-full bg-white rounded-t-lg shadow-xl" initial={{ x: -40 }} animate={{ x: 2 }} transition={{ type: "spring", stiffness: 200 }}>
            <div className="pb-4 w-full h-full overflow-auto scrollbar-hide">
                <div className="w-full h-[40px] fixed pb-12">
                    <div className="w-full h-[40px] fixed bg-white flex justify-center rounded-t-md border-b-2 border-page-bg">
                        <div className="w-1/2 text-xl font-bold text-center py-1">File</div>
                    </div>
                </div>
                <div className="w-full pt-[40px]" />
                {loaded ? (
                    <table className="inset-0 w-full table-fixed pb-10 overflow-hidden border-2 border-page-bg p-1">
                        <tbody className="w-full">
                            {accessedFiles.map((file: FileObj) => {
                                return (
                                    <tr key={file.id} className="w-full h-[360px] border-b-4 border-page-bg">
                                        <td className="w-full h-[360px] text-black font-bold text-center text-xs grid grid-cols-3 gap-x-2">
                                            <div className="w-full h-full col-span-2 p-2 overflow-auto scrollbar-hide">
                                                <p className="font-bold text-2xl">{file.name}</p>
                                                <iframe loading={"lazy"} className="w-full h-[300px] overflow-auto scroll-smooth scrollbar-hide border-2 border-black object-fill" src={file.payload} title={"current file"} />
                                            </div>
                                            <div className="w-full h-full py-2 flex items-center">
                                                <div className="w-full">
                                                    <button className="w-1/2 bg-queens-blue text-sm font-medium text-white hover:bg-blue-400 rounded-md">
                                                        <a href={file.payload} title={"current file"} download={file.name}>
                                                            {"DOWNLOAD"}
                                                        </a>
                                                    </button>
                                                    <p className="pt-4 text-center text-xs font-bold w-full text-black underline rounded-md">{"Owner: " + file.owner}</p>
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

export default AccessorFileTable;
