type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="px-6 my-4 sm:px-10">{children}</div>;
};

export default Container;
