import React from 'react';
import { Link } from 'react-router-dom';

type WrapWithLinkProps = {
  children: React.ReactNode; 
  fullLinkUrl: string;
  shouldLink: boolean;
}

export default function WrapWithLink({children, fullLinkUrl, shouldLink=false}: WrapWithLinkProps) {
  return (
    <>
      {shouldLink
        ? <Link to={fullLinkUrl} className='hover:underline hover:font-black'>{children}</Link> 
        : <div>{children}</div>
      }
    </>
  )
}
