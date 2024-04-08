import React from 'react';
import { FC } from 'react';

type ContainerProps = {
  children: React.ReactNode;
};

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px]" style={{ margin: '0 auto' }}>
      {children}
    </div>
  );
};

export default Container;
