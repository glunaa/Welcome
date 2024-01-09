import React, { FC } from 'react';

// interface here
interface CardProps {
    title: string;
    body : string;
}

const Cards: FC<CardProps> = ({title, body}) => {
    return(
        <div className='card'> 
            <div className='card-title'>{title}</div>
            <div className='card-body'>{body}</div>
        </div>
    );

};

export default Cards;