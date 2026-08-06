"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/certificate", label: "Certificates" },
    { href: "/contact", label: "Contact"},
    { href:"/portfolio", label: "Portfolio" },
    { href: "/testimonials", label: "Testimonials" }
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen,setMobileOpen] = useState(false);
    
    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white z-50 bg-gray-950/80 backdrop-blur-x1 border-b border-gray-800/50" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-white font-bold bg-gradient-to-r 
                    from-indigo-400 to-violet-400 bg-clip-text text-transparent
                    hover:from-indigo-300 hover:to-violet-300 transition all duration-300 ">
                    myportfolio
                    </Link>

                    {/*ini navigasi untuk desktop*/}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md text-sm 
                                    font-medium transition-colors duration-300 ${
                                        isActive
                                            ? "bg-indigo-500 text-indigo-300"
                                            : "text-gray-400 hover:bg-gray-700 hover:text-white"
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    
                    </div>
                    <button onClick={() => setMobileOpen(!mobileOpen)} 
                        className="md:hidden relative w-10 h-10 flex items-center 
                        justify-center rounded-lg text-gray-400 hover:text-white
                         hover:bg-gray-800/50 transition-all duration-300"
                         aria-label="Toggle Menu">
                            <div className="flex flex-col gap-1.5">
                                <span className={`block w-5 h-0.5 bg-current
                                transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : "" }`}
                                />
                                <span className={`block w-5 h-0.5 bg-current
                                transition-all duration-300 ${mobileOpen ? "opacity-0" : "" }`}
                                />
                                <span className={`block w-5 h-0.5 bg-current
                                transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : "" }`}
                                />
                            </div>
                    </button>

                </div>
            </div>

            {/*ini navigasi untuk mobile*/}
            <div className={`md:hidden  transition-all duration-300 overflow-hidden $
                {mobileOpen ? "max-h-96" : "max-h-0 opacity-0"}`}>   
                <div className="py-4 py-3 space-y-1 bg-gray-950/95 backdrop-blur-x1
                border t border-gray-800/50">   
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                                isActive
                                    ? "bg-indigo-500/20 text-indigo-300"
                                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
                </div>

            </div>
        </nav>                            
    ) }