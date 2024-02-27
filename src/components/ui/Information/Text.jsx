function Text({ children, className }) {
  return <p className={'text-center ' + className}>{children}</p>;
}

export default Text;
