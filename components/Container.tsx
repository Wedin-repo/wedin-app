type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[2520px]" style={{ margin: '0 auto' }}>
      {children}
    </div>
  );
};

export default Container;
