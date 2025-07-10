import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkService } from '../../frontServices/LinkService'

export const PreRegThankYou = () => {
    const navigate = useNavigate()
    const links = LinkService.getInstance()
    const [count, setCount] = useState<number>(10)

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prevCount => {
                if (prevCount <= 1) {
                    clearInterval(timer)
                    navigate(links.profile.base);
                    return 0
                }
                return prevCount - 1
            })
        }, 1000);

        return () => clearInterval(timer)

    }, [])
    return (
        <div className='text-center'>
            <h2>Thank you for registering with us...</h2>
            <h1>Check your visit time and come to the office at before 15 minutes</h1>
            <h2>in the premises you can print the visit pass by giving your visit Id</h2>
            <h3>0{count}</h3>
            <button onClick={() => navigate(links.profile.base)} className='front-Button'>Go To Profile</button>
        </div>
    )
}
