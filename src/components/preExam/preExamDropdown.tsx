import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { IoCaretDown, IoPodium } from "react-icons/io5";

export default function PreExamDropdown() {
  const router = useRouter();
  const dropdownRoutes = [
    {
      path: "/warm-up",
      title: "Warm-Up",
    },
    {
      path: "/penyisihan",
      title: "Penyisihan",
    },
    {
      path: "/competition",
      title: "Competition",
    },
  ];

  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-full items-center space-x-5 rounded-md bg-[#325376] px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-[#253E58]">
            <div className="flex items-center space-x-3">
              <IoPodium />
              {router.pathname == "/warm-up" ? (
                <p>Warm-Up</p>
              ) : router.pathname == "/penyisihan" ? (
                <p>Penyisihan</p>
              ) : (
                <p>Competition</p>
              )}
            </div>
            <IoCaretDown size={12} className="ml-2" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex flex-col space-y-1 px-1 py-1">
              {dropdownRoutes.map((route, index) => {
                if (route.path == router.pathname) {
                  return <div key={index}></div>;
                } else {
                  return (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <Link
                          href={route.path}
                          className={`${
                            active ? "bg-[#E6EAED]" : ""
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm text-primary-dark transition duration-200`}
                        >
                          {route.title}
                        </Link>
                      )}
                    </Menu.Item>
                  );
                }
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
