
const TopNavigation = () => {
    var Banner = require('../../assets/DocuShareBanner.jpg');
    return (
        <div className="w-full h-full">
            <div className="w-screen fixed bg-white shadow-2xl rounded-lg py-2">
                <div className="w-full h-full grid grid-cols-3 place-items-center">
                    <div></div>
                    <div className="w-full h-full py-2 flex flex-col items-center">
                        <a href={'/#landingPage'} className=''>
                            <img className='h-20 object-scale-down' src={Banner} alt={""} />
                        </a>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    ) 
}

export default TopNavigation