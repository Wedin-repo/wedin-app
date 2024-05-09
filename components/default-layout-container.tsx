type DefaultLayoutContainerProps = {
  children: React.ReactNode;
};

const DefaultLayoutContainer = ({ children }: DefaultLayoutContainerProps) => {
  return <div className="px-6 my-4 sm:px-10">{children}</div>;
};

export default DefaultLayoutContainer;
