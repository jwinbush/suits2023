/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import headimage from "../../assets/images/headerimage.png";

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const subCategories = [
  { name: "Business", href: "#" },
  { name: "Tuxedo", href: "#" },
  { name: "Formal", href: "#" },
  { name: "Wedding", href: "#" },
];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "black", label: "Black", checked: false },
      { value: "charcoal", label: "Charcoal", checked: false },
      { value: "gray", label: "Gray", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "white", label: "White", checked: false },
      { value: "navy", label: "Navy", checked: false },
      { value: "red", label: "Red", checked: false },
      { value: "olive", label: "Olive", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "premium", label: "Premium", checked: false },
      { value: "luxury", label: "Luxury", checked: false },
      { value: "italian", label: "Italian", checked: true },
      { value: "british", label: "British", checked: false },
      { value: "seasonal", label: "Seasonal", checked: false },
    ],
  },
  {
    id: "fit",
    name: "Fit",
    options: [
      { value: "regular", label: "Regular", checked: false },
      { value: "modern", label: "Modern", checked: false },
      { value: "slim", label: "Slim", checked: false },
      { value: "skinny", label: "Skinny", checked: false },
      { value: "husky", label: "Husky", checked: false },
      { value: "classic", label: "Classic", checked: true },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "sm", label: "Small", checked: false },
      { value: "md", label: "Medium", checked: false },
      { value: "lg", label: "Large", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "1x", label: "1X", checked: false },
      { value: "2x", label: "2X", checked: false },
      { value: "3x", label: "3X", checked: true },
    ],
  },
];

const list = [
  {
    id: 3,
    title: "Hartley Cotton Stretch Olive Suit",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15014321_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/tuxedo",
  },
  {
    id: 6,
    title: "Sailsbury Linen Cream Suit",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15014327_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/new",
  },
  {
    id: 7,
    title: "Hemsworth Blue Suit",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15015273_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/business",
  },
  {
    id: 8,
    title: "Hereford Cavalry Twill Blue Suit",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15011416_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/tuxedo",
  },
  {
    id: 9,
    title: "Hayle Sharkskin Slate Blue Suit",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15010685_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/formal",
  },
  {
    id: 10,
    title: "Hartley Cotton Stretch Light Blue Suit",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15015805_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/wedding",
  },
  {
    id: 11,
    title: "Hampton Black and Ivory Tuxedo",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15010764_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/new",
  },
  {
    id: 12,
    title: "Harford Velvet Navy Tuxedo",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15011702_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/business",
  },
  {
    id: 13,
    title: "Hampton Ivory Tuxedo",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15010757_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/tuxedo",
  },
  {
    id: 14,
    title: "Highworth Navy Tuxedo",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15011682_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/formal",
  },
  {
    id: 15,
    title: "Harford Velvet Purple Tuxedo",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15011995_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/wedding",
  },
  {
    id: 20,
    title: "Hayle Sharkskin Gray Suit",
    imageSrc:
      "https://i8.amplience.net/i/indochino/15010681_0_0.webp?w=312&sm=aspect&aspect=0.5693430656934306:1&qlt=100",
    link: "/suits-tuxedos/wedding",
  },
];

function ClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Wedding() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="bg-white">
      <div>
        <div className=" h-[100px] lg:h-[250px] w-full m-auto relative group">
          <div
            style={{
              backgroundImage: `url(${headimage})`,
            }}
            className="w-full h-full bg-top bg-cover duration-75 text-left  pl-6 lg:pl-28"
          >
            <p className=" pt-[10px] lg:pt-[70px] mb-2 text-xs lg:text-sm text-gray-500 lg:text-md ">
              Shop the collection
            </p>
            <h1 className=" lg:mb-2 font-bold text-xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-black ">
              Suits & Tuxedos
            </h1>
            <p className="lg:text-sm text-xs lg:text-black lg:text-md lg:visible invisible">
              Ranging from four different styles. Find the perfect suit for you.
            </p>
          </div>
        </div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-2 max-w-9xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-10 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Wedding
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={ClassNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section
            aria-labelledby="products-heading"
            className="pt-6 flex pb-24"
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            {/* Filters */}
            <form className="hidden lg:block h-screen pr-20">
              <h3 className="sr-only">Categories</h3>
              <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href}>{category.name}</a>
                  </li>
                ))}
              </ul>

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 lg:grid-cols-5">
              {/* Product grid */}
              {list.map(({ title, imageSrc, link }) => (
                <div className="mb-6 lg:mb-0">
                  <div>
                    <div
                      className="relative overflow-hidden  bg-no-repeat bg-cover ripple hover:animate-pulse mb-2"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src={imageSrc}
                        className="w-full h-full"
                        alt="Louvre"
                      />
                      <Link to={link}>
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.2)",
                          }}
                        ></div>
                      </Link>
                    </div>

                    <h5 className="text-black mb-3 pb-6">{title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
