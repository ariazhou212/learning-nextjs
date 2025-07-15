"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const links = [
  { name: "Post", href: "/posts" },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        //const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            //className={`${isActive ? "font-bold underline" : ""}`}
          >
            <p
              className={clsx(`flex grow items-center justify-center gap-2`, {
                "bg-purple-100": pathname === link.href,
              })}
            >
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
