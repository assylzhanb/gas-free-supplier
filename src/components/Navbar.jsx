import React from 'react'

const Navbar = () => {
    return (
        <header className='w-full flex mx-auto justify-between items-center bg-white px-4 py-4 border-b border-b-[#e6ebf4]'>

            <h1 className='text-3xl font-opensans w-5/6'>Home</h1>
            <button className="font-opensans font-medium bg-purple-600 text-white px-4 py-2 rounded-md">Track</button>
            <button className="font-opensans font-medium bg-purple-600 text-white px-4 py-2 rounded-md">Update</button>
            <button className="font-opensans font-medium bg-purple-600 text-white px-4 py-2 rounded-md">Remove</button>
        </header>
    )
}

export default Navbar