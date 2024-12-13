import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const hideFooter = location.pathname.includes("/cart");

  if (hideFooter) return null;

  return (
    <footer className="m-4 bg-white rounded-lg dark:bg-gray-900">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 space-x-3 sm:mb-0 rtl:space-x-reverse">
            <img src={Logo} className="h-8" alt="ShopSphere Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ShopSphere</span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
              <Link to="#" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {currentYear} <a href="https://flowbite.com/" className="hover:underline">ShopSphere</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
