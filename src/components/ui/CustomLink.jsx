import { Link } from 'react-router-dom';

export default function CustomLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block text-center w-full border py-2  text-base bg-neutral-600 text-white md:w-[600px] md:m-auto"
    >
      {children}
    </Link>
  );
}
