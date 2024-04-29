type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-[2520px]">{children}</div>;
};

export default Container;
