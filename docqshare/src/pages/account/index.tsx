import { useState, useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import SentFileTable from "../../components/account/sentFileTable";
import SideBar from "../../components/account/sidebar";
import Authentication from "../../components/authentication";
import { motion } from "framer-motion";
import AccessorFileTable from "src/components/account/accessorFileTable";
import { parse, stringify, toJSON, fromJSON } from "flatted";

declare var window: any;

function AccountPage() {
    const [sentFiles, setSendFiles] = useState(true);
    const [recievedFiles, setRecievedFiles] = useState(false);
    const [accountInfo, setAccountInfo] = useState({});

    const logOut = () => {
        localStorage.removeItem("authToken");
        setTimeout(window.location.replace("http://localhost:3000/login"), 100);
    };

    return (
        <Authentication>
            <motion.div className="w-screen h-screen bg-page-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="absolute top-0 right-0">
                    <div className="flex justify-end p-2 relative z-0">
                        <button className=" rounded-lg p-2 text-black hover:font-bold" onClick={logOut}>
                            <Link to="/signup">
                                <div className="flex flex-col items-center">
                                    <div className="flex my-auto">
                                        <MdOutlineLogout size={20} className="pt-1"/>Logout
                                    </div>
                                </div>
                            </Link>
                        </button>
                    </div>
                </div>
                <div className="w-full h-full grid grid-flow-row-dense grid-cols-4">
                    <div className="col-span-1">
                        <SideBar sentFiles={sentFiles} setSentFiles={setSendFiles} recievedFiles={recievedFiles} setRecievedFiles={setRecievedFiles} account={accountInfo}></SideBar>
                    </div>
                    <div className="col-span-3 p-12 overflow-auto scrollbar-hide scroll-smooth">{sentFiles ? <SentFileTable /> : <AccessorFileTable />}</div>
                </div>
            </motion.div>
        </Authentication>
    );
}

export default AccountPage;
