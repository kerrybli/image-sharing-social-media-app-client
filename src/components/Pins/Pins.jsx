import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Navbar, Feed, CreatePin, PinDetails, Search } from '../index'



const Pins = ({ user }) => {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <>
            <div className="px-2 md:px-5">
                <div className="bg-gray-50">
                    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
                </div>
                <div className="h-full">
                    <Routes>
                        <Route path="/" element={<Feed />} />
                        <Route path="/category/:categoryId" element={<Feed />} />
                        <Route path="/pin-detail/:pinId" element={<PinDetails user={user} />} />
                        <Route path="/create-pin" element={<CreatePin user={user} />} />
                        <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
                    </Routes>
                </div>

            </div>
            <div className='translate-y-[17rem]'>

                <Footer />
            </div>
        </>
    )
}

export { Pins }
