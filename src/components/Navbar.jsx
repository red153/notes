import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-blackpy-5 mb-2">
      <div className=" bg-orange-900 container px-4 sm:px-6 lg:px-8 mx-auto flex flex-col sm:flex-row justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold text-black mb-4 sm:mb-0">Lista de notas</h1>
        </Link>
        <ul className="flex gap-x-4">
          <li>
            <Link href="/notes/new" className="text-black">New</Link>
          </li>
          <li>
            <Link href="/user/login" className="text-black">Login</Link>
          </li>
          <li>
            <Link href="/user/register" className="text-black">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
