function Navbar() {

  const linkStyle = 'text-primaryText transition-all hover:text-primary duration-300'
  return (
    <nav className="layout-navbar w-full flex justify-between py-3 px-5">
      <div className="flex gap-10">
      <a href="" className={linkStyle}>Contact us</a>
      <a href="" className={linkStyle}>Home</a>
      </div>
      <a href="" >Logo</a>
    </nav>
  );
}

export default Navbar;
