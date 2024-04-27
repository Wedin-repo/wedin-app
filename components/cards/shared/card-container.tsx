import React from 'react';

type CardContainerProps = {
  children: React.ReactNode;
};

function CardContainer({ children }: CardContainerProps) {
  return (
    <div
      className="grid grid-cols-1 gap-10
      sm:grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      2xl:grid-cols-4
      3xl:grid-cols-4"
    >
      {children}
    </div>
  );
}

export default CardContainer;
