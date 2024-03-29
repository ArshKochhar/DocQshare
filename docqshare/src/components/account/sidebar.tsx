import { TfiViewListAlt } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { setUserName, User } from "src/redux/userSlice";
import AddFile from "./addFIle";
import axios from 'axios';
import Web3 from 'web3';
import { useEffect } from "react";
declare var window: any

interface sidebarProps {
    sentFiles: boolean;
    setSentFiles: any;
    recievedFiles: boolean;
    setRecievedFiles: any;
}

const SideBar = (props: sidebarProps) => {
    const dispatch = useDispatch<any>();
    const userState: User = useSelector((state: any) => state.user);
    const { userName } = userState;

    var Banner = require('../../assets/DocuShareBanner.jpg');
    
    const buttonColorHandle = ({ val } : { val: string }) => {
        switch (val) {
            case "sentFiles":
                props.setSentFiles(true);
                props.setRecievedFiles(false);
                break;
            case "recievedFiles":
                props.setSentFiles(false);
                props.setRecievedFiles(true);
                break;
            case "accountSettings":
                props.setSentFiles(false);
                props.setRecievedFiles(false);
                break;
            default:
                props.setSentFiles(true);
                props.setRecievedFiles(false);
                break;
        }
    };

    const getUserName = async () => {
        await window.ethereum.request({method: 'eth_requestAccounts'});
        window.web3 = new Web3(window.ethereum);
        const requestedAccounts = await window.web3.eth.requestAccounts();
        const token = localStorage.getItem("authToken");

        axios.post("http://localhost:3500/auth/getUserName", 
            { 
                walletId: requestedAccounts[0]
            }, 
            {
                headers: { 'authorization': token }
            }).then(async (response) => {
                dispatch(setUserName(response.data.userName));
                return;
            }).catch((err) => {
                console.log(err)
                return;
            });
    }

    useEffect(() => {
        getUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="w-full h-screen">
            <div className={`h-full w-1/4 bg-white shadow-xl absolute`}>
                <div className="w-full flex flex-col items-center">
                    <img src={Banner} alt="DocuShare Banner" className="scale-down w-30 h-30 pt-8 pb-4 px-4"></img>
                </div>
                <p className="text-black text-center shrink font-bold">{userName}</p>
                <div className="w-full h-fit p-4 grid grid-rows-3 gap-y-2 place-items-start">
                    <button className={`flex h-full w-full ${props.sentFiles ? "bg-blue-400" : "bg-queens-blue"} rounded-lg p-2 hover:bg-blue-400 text-white my-auto`} onClick={() => buttonColorHandle({ val: "sentFiles" })}>
                        <div className="flex my-auto p-1 scale-down">
                            <TfiViewListAlt size={15} />
                        </div>
                        Your Files
                    </button>
                    <button className={`flex h-full w-full ${props.recievedFiles ?'bg-blue-400':'bg-queens-blue'} rounded-lg p-2  hover:bg-blue-400 text-white my-auto`} onClick={() => buttonColorHandle({ val: 'recievedFiles' })}>
                        <div className="flex my-auto p-1 scale-down"><TfiViewListAlt size={15}/></div>
                        Shared Files
                    </button>
                </div>
                {props.sentFiles && (
                    <div className="w-full absolute bottom-10 flex justify-center">
                        <AddFile />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideBar;
