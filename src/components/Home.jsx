import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [searchText, setSearchText] = useState('something');

    return (
        <section className="max-w-7xl mx-auto font-opensans pt-10 pb-16 pl-20 pr-20 border-purple-500 border-4 rounded-xl">
            {/* Header */}
            <div className="flex flex-col items-start">
                <h1 className="font-extrabold text-[32px]"> SC </h1>
                <p className="mt-2 text-gray-400 text-[16px] max-w-[500px]">
                    Make transactions free
                </p>
                <Link
                    to="/track"
                    className="mt-5 font-opensans font-medium hover:bg-purple-700 transition-all hover:scale-105 duration-500 bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                    Track
                </Link>
            </div>

            {/* Form */}
            <div className="mt-16">Make sure.</div>
        </section>
    );
};

export default Home;
