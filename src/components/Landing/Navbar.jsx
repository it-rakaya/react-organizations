import { Link } from "react-router-dom";

function Navbar() {

  const linkStyle = 'text-primaryText transition-all hover:text-primary duration-300'
  return (
    <nav className="flex justify-between w-full px-5 py-3 layout-navbar">
      <div className="flex gap-10">
      <Link to="#" className={linkStyle}>Contact us</Link>
      <Link href="/" className={linkStyle}>Home</Link>
      </div>
      <Link href="/" >Logo</Link>
    </nav>
  );
}

export default Navbar;
