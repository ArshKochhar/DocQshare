import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const TopNavigation = () => {
    var Banner = require('../../assets/DocuShareBanner.jpg');
    return (
        <div className="w-full h-full">
            <div className="w-screen fixed bg-white shadow-2xl rounded-lg py-2">
                <div className="w-full h-full grid grid-cols-3">
                    <div className="h-full w-fit flex flex-col justify-center pl-4">
                        <button className=" bg-queens-blue p-2 rounded-md hover:bg-blue-400">
                            <Link to='/' className=''>
                                <div className="flex">
                                    <AiOutlineHome color='white' size={25}/>
                                </div>
                            </Link>
                        </button>
                    </div>
                    <div className="w-full h-full py-2">
                        <div className="h-full w-full  flex flex-col items-center text-center">
                            <img className='h-20 object-scale-down' src={Banner} alt={""} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavigation