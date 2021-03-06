import React, { useState, useEffect, useRef } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../index';
import { client } from '../../client';
import logo from '../../assets/logo.png';
import { userQuery, userCreatedPinsQuery } from '../../utils/data'
import { Pins } from '../Pins/Pins';
import { fetchUser } from '../../utils/fetchUser';


const Home = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [userCreatedPins, setUserCreatedPins] = useState(null)
    const [pinsLength, setPinsLength] = useState(false)
    const scrollRef = useRef(null)


    const userInfo = fetchUser()

    useEffect(() => {
        setUserId(userInfo.googleId)

        const query = userQuery(userInfo?.googleId);

        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })

    }, [userInfo?.googleId]);

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    })


    // useEffect(() => {


    //     const createdPinsQuery = userCreatedPinsQuery(userId);

    //     client.fetch(createdPinsQuery).then((data) => {
    //         const id = setUserCreatedPins(data)
    //         setTimeout(() => {
    //             if (userCreatedPins.length === 0) return console.log("No pins")

    //         }, 3000)

    //         clearTimeout(id )
    //     });
    //     console.log('userCreatedPins:', userCreatedPins)
    //     // console.log('userCreatedPins:', userCreatedPins)
    //     // setTimeout(() => {
    //     //     if (userCreatedPins) {
    //     //         return alert("No pins")
    //     //     }

    //     // }, 3000)
    // }, [userCreatedPins, userId])




    return (
        <>
            <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-7s ease-out">

                <div className="hidden md:flex h-screen flex-initial">
                    <Sidebar
                        user={user && user}
                    />
                </div>

                <div className='flex md:hidden flex-row'>
                    <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>

                        <HiMenu
                            fontSize={40}
                            className='cursor-pointer'
                            onClick={() => {
                                setToggleSidebar(true)
                            }}
                        />

                        <Link to="/">
                            <img src={logo} alt='logo' className='w-28' />
                        </Link>

                        <Link to={`user-profile/${user?._id}`}>
                            <img src={user?.image} alt='user-pic' className='w-28' />
                        </Link>
                    </div>

                    {toggleSidebar && (
                        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
                            <div className='absolute w-full flex justify-end items-center p-2'>

                                <AiFillCloseCircle
                                    fontSize={30}
                                    className='cursor-pointer'
                                    onClick={() => {
                                        setToggleSidebar(false)
                                    }}
                                />
                            </div>
                            <Sidebar
                                user={user && user}
                                closeToggle={setToggleSidebar}
                            />

                        </div>
                    )}

                </div>


                <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                    <Routes>
                        <Route path="/user-profile/:userId" element={<UserProfile />} />
                        <Route path="/*" element={<Pins user={user && user} />} />
                    </Routes>
                    {/* <Footer /> */}
                </div>

            </div>

        </>
    )
}

export { Home }
