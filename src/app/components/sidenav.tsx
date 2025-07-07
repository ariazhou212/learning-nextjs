import NavLinks from "./nav-links";
export default function SideNav() {
  return (
    <div className="flex flex-col md:flex-row md:overflow-hidden bg-white">
      <NavLinks />
    </div>
  );
}
