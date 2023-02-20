interface RecipientProps {
    currentRecipient: string;
    setCurrentRecipient: (val: string) => void;
    handleAddRecipient: () => Promise<void>;
}


const AddRecipientButton = ({currentRecipient, setCurrentRecipient, handleAddRecipient}: RecipientProps) => {

    return (
        <>
            <div className="mt-2 h-full w-1/2 flex pb-4">
                <button 
                    className="pb-1 rounded-l-md w-32 h-10 bg-queens-blue px-4 text-sm font-medium text-white hover:bg-blue-400 focus:ring-0 focus:ring-offset-0"
                    onClick={() => handleAddRecipient()}>
                    Add
                </button>
                <input
                    className='w-full h-10 bg-page-bg text-black rounded-r-md focus:ring-0 focus:outline-0 px-1'
                    value={currentRecipient}
                    onChange={(e) => setCurrentRecipient(e.target.value)}
                />
            </div>
        </>
    )
}

export default AddRecipientButton;