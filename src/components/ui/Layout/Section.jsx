function Section({ children, className }) {
  return (
    <section
      className={
        className ? className : '' + ' p-4 max-w-[1080px] m-auto md:p-8'
      }
    >
      {children}
    </section>
  );
}

export default Section;
