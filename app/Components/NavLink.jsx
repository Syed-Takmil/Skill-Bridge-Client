


import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLink = ({href,children}) => {
       const currentPath=usePathname();
    const active=href==currentPath;
    return (
        <Link className={`${active?"border-b border-b-indigo-600 text-indigo-500 p-1":""}`} href={href}>{children}</Link>
    );
};

export default NavLink;