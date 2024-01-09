import React, { FC } from 'react';

// interface here
interface CardProps {
    title: string;
    body : string;
    titleIcon: React.ReactNode;
    bodyIcon: React.ReactNode; 
}

const Cards: FC<CardProps> = ({title, body,titleIcon,bodyIcon}) => {
    return(
        <div className='card'> 
            <div className='card-title'>{titleIcon}{title}</div>
            <div className='card-body'>{bodyIcon}{body}</div>
        </div>
    );

};

export default Cards;