import React, { FC } from 'react';

interface LinksProps {
  url: string;
  label: string;
}

const Links: FC<LinksProps> = ({ url, label }) => {
  return (
    <div className="text-center links">
      <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </div>
  );
};

export default Links;
