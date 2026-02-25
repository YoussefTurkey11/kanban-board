import Logo from "../shared/Logo";
import { Searchbar } from "../shared/Searchbar";

const Header = () => {
  return (
    <header className="p-5 border-b border-ring/30">
      <nav className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Search */}
        <Searchbar />
      </nav>
    </header>
  );
};

export default Header;
