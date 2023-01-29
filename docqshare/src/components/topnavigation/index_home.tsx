import { Link } from 'react-router-dom';

export interface navParams {
    howItWorks: string,
    aboutUs: string,
}

const TopNavigationHome = ({howItWorks, aboutUs}: navParams) => {
    var Banner = require('../../assets/DocuShareBanner.jpg');
    return (
        <div className="w-full h-full">
            <div className="w-screen bg-white shadow-lg py-2">
                <div className="w-full h-full grid grid-cols-3">
                    <div className="w-full h-full">
                        <div className="h-full w-fit items-left text-center pl-4">
                            <img className='h-20 object-scale-down' src={Banner} alt={""} />
                        </div>
                    </div>
                    <div></div>
                    <div className="w-full h-full grid grid-flow-col-dense items-center">
                        <div>            
                        <button className="p-2 rounded-md">
                                <a href={howItWorks} className=''>
                                    <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                                        How it works
                                    </p>
                                </a>
                            </button>
                        </div>   
                        <div>            
                        <button className="p-2 rounded-md">
                                <a href={aboutUs} className=''>
                                    <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                                        About us
                                    </p>
                                </a>
                            </button>
                        </div>
                        <div>            
                        <button className="p-2 rounded-md">
                                <Link to='/login' className=''>
                                    <p className="text-center text-gray-600 hover:text-black hover:font-bold">
                                        Sign in
                                    </p>
                                </Link>
                            </button>
                        </div>
                        <div>            
                        <button className="p-2 rounded-md">
                                <button className=' bg-queens-blue rounded-lg p-2 hover:bg-blue-400'>
                                    <Link to='/signup' >
                                        <p className="text-center text-white ">
                                            Get started today
                                        </p>
                                    </Link>
                                </button>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNavigationHome