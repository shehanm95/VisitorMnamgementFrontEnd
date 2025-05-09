import React from 'react'
import './css/iconHeader.css'


interface IconHeaderProps {
    icon: string,
    title: string
}

export const IconHeader: React.FC<IconHeaderProps> = ({ icon, title }) => {
    return (
        <h2 className='icontitle'><i className={`fas ${icon} main-icon`}></i> {title}</h2>
    )
}
