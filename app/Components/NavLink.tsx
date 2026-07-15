"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const currentPath = usePathname();
  const active = href === currentPath;

  return (
    <Link
      className={`${
        active ? "border-b border-b-indigo-600 text-indigo-500 p-1" : ""
      }`}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;