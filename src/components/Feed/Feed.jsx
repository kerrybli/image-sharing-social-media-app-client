import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../../client';
import { MasonryLayout } from '../MasonryLayout/MasonryLayout'
import { Spinner } from '../Spinner/Spinner'



const Feed = () => {

    const [loading, setLoading] = useState(false)
    const { categoryId } = useParams()

    useEffect(() => {
        if (categoryId) {
            setLoading(true)
            // const query = searchQuery

        } else {

        }
    }, [categoryId]);


    if (loading) return <Spinner message="We are adding new ideas to your feed!" />
    return (
        <>
            Feed
        </>
    )
}

export { Feed }