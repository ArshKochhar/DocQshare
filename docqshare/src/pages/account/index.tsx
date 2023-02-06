import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import SentFileTable from "../../components/account/sentFileTable";
import SideBar from "../../components/account/sidebar"
import Authentication from "../../components/authentication"

function AccountPage() {

    const [ sentFiles, setSendFiles ] = useState(true);
    const [ recievedFiles, setRecievedFiles ] = useState(false);
    const [ accountSettings, setAccountSettings ] = useState(false);

    const logOut = () => {
        localStorage.removeItem('authToken');
    }

    return (
        <Authentication >
            <div className="w-screen h-screen bg-page-bg overflow-auto scrollbar-hide scroll-smooth">
                <div className="absolute top-0 right-0">
                    <div className="flex justify-end p-2 relative z-0">
                        <button className=' rounded-lg p-2 text-black hover:font-bold' onClick={logOut}>
                            <Link to='/signup' >
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
                        <SideBar
                            sentFiles={sentFiles}
                            setSentFiles={setSendFiles}
                            recievedFiles={recievedFiles}
                            setRecievedFiles={setRecievedFiles}
                            accountSettings={accountSettings}
                            setAccountSettings={setAccountSettings}
                        ></SideBar>
                    </div>
                    <div className="col-span-3 p-12 overflow-auto scrollbar-hide scroll-smooth">
                        {sentFiles && <SentFileTable/>}
                    </div>
                </div>
            </div>
        </Authentication>
    )
}

export default AccountPage