import React, { FC } from 'react';

interface LinksProps {
  url: string;
  icon: React.ReactNode;
  label: string;
}

const Links: FC<LinksProps> = ({ url, icon, label }) => (
  <div className="links">
    <a href={url} className="btn" aria-label={label} target="_blank" rel="noopener noreferrer">
      {icon}
    </a>
  </div>
);

export default Links;
