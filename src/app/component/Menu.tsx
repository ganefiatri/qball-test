"use client"
import Image from "next/image";
import Link from "next/link";
import { logout } from "../login/actions";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/student.png",
        label: "Users",
        href: "/list/users",
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-blue-300"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
            
          )})}
        </div>
      ))}
      <div className="flex flex-col gap-2">
          <button onClick={() => logout()} className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-blue-300 cursor-pointer">
              <Image src="/logout.png" alt="logout" width={20} height={20} />
              <span className="hidden lg:block">Logout</span>
          </button>
      </div>
    </div>
  );
};

export default Menu;