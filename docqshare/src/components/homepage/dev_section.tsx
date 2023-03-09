import React from 'react'

export interface devParams {
    img: string,
    name: string,
    role: string,
    description: string,
}

const DevSection = ({ ...props }: devParams) => {
    return (
    <div className='w-full h-full bg-white p-6 rounded-lg'>
        <div className='w-full h-full'>
            <img src={props.img} alt={''} className='w-40 h-40 relative mx-auto rounded-lg overflow-hidden bg-white'/>
            <p className='text-center w-full text-black text-2xl'>{props.name}</p>
            <p className='text-center w-full text-black text-lg font-bold'>{props.role}</p>
            <p className='text-left w-full text-black text-md pt-10'>{props.description}</p>
        </div>
    </div>
    )
}

export default DevSection;