import NavLinks from "./nav-links";
import SignInSignOutButton from "./authButton";
export default function SideNav() {
  return (
    <div className="flex flex-col md:flex-row md:overflow-hidden bg-white gap-2">
      <NavLinks />
      <SignInSignOutButton />
    </div>
  );
}
