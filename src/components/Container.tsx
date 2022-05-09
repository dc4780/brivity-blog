import React from 'react';
import NavBar from './NavBar';

type ContainerProps = {
  title: string;
  children: React.ReactNode;
};

function Container({ title, children } : ContainerProps) {
  return (
    <div className="mx-auto">
      <NavBar />
      <div className="container mx-auto">
        <h1 className="text-3xl mt-10 text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default Container;
