import React, { FC } from 'react';

interface HeaderProps {
  name: string;
  position: string;
}

const Header: FC<HeaderProps> = ({ name, position }) => {
  return (
    <header className="text-center mb-4 header">
      <h1 className="fw-bold">{name}</h1>
      <p className="text-muted">{position}</p>
    </header>
  );
};

export default Header;
