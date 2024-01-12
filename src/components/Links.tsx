import React, { FC } from 'react';

interface LinksProps {
  url: string;
  icon: React.ReactNode;
}

const Links: FC<LinksProps> = ({ url,icon }) => {
  return (
    <div className="text-center links">
      <a href={url} className="btn btn-dark btn-lg" target="_blank" rel="noopener noreferrer">
        {icon}
      </a>
    </div>
  );
};

export default Links;
