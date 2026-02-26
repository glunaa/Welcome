import React, { FC } from 'react';

interface HeaderProps {
  name: string;
  position: string;
}

const Header: FC<HeaderProps> = ({ name, position }) => {
  return (
    <header className="text-center header">
      <h1>{name}</h1>
      <p>{position}</p>
    </header>
  );
};

export default Header;
