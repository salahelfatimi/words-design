'use client';
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, ShoppingBasket, X } from "lucide-react";

export default function Navbar() {
    const navbarRef = useRef(null);
    const linksRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [logoSrc, setLogoSrc] = useState('/img/logo_text_white.png');
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        const navbar = navbarRef.current;
        const links = linksRef.current;
        const handleScroll = () => {
            if (window.scrollY > 50) {
                gsap.to(navbar, { backgroundColor: "white", duration: 0.1 });
                gsap.to(links, { color: "black", duration: 0.1 });
                setLogoSrc('/img/logo_text.png');
            } else {
                gsap.to(navbar, { backgroundColor: "transparent", duration: 0.1 });
                gsap.to(links, { color: "white", duration: 0.1 });
                setLogoSrc('/img/logo_text_white.png');
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileMenu = () => {
        setOpenNav(!openNav);
        if (!openNav) {
            gsap.to(mobileMenuRef.current, {
                x: 0,
                duration: 0.5,
                ease: "power3.out",
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                x: "100%",
                duration: 0.5,
                ease: "power3.in",
            });
        }
    };

    const ItemsNavbar = [
        { name: 'Accueil', link: '/' },
        { name: 'Boutique', link: '/boutique' },
        { name: 'Blog', link: '/blogs' },
        { name: 'À propos', link: '/a-propos' },
        { name: 'Contactez-nous', link: '/contactez-nous' },
    ];

    return (
        <header ref={navbarRef} className="fixed z-50 top-0 left-0 w-full px-8 lg:px-20 py-4">
            <div className="hidden lg:block">
                <div className="flex flex-row gap-4 items-center justify-between container mx-auto">
                    <Image src={logoSrc} width={500} height={500} className="w-36" alt="art by Warda" title="art by Warda" />
                    <ul ref={linksRef} className="flex space-x-4 text-white">
                        {ItemsNavbar.map((item, index) => (
                            <Link href={item.link} key={index} className="cursor-pointer  font-medium font-primary hover:underline duration-500 underline-offset-2">
                                {item.name}
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="lg:hidden block">
                <div className="flex flex-row gap-4 items-center justify-between container mx-auto">
                    <Image src={logoSrc} width={500} height={500} className="w-20" alt="art by Warda" title="art by Warda" />
                    <div onClick={toggleMobileMenu} className="bg-primary p-1">
                        <Menu className="stroke-white" size={40} />
                    </div>
                </div>
                <div ref={mobileMenuRef} className="fixed top-0 right-0 w-full h-full bg-white z-40 transform translate-x-full flex flex-col items-center justify-center" >
                    {/* Close Button */}
                    <button onClick={toggleMobileMenu} className="absolute top-4 right-4 bg-secondary text-white p-2 rounded-full" >
                        <X size={30} />
                    </button>
                    <ul className="flex flex-col space-y-6 text-black text-center">
                        {ItemsNavbar.map((item, index) => (
                            <Link onClick={toggleMobileMenu} href={item.link} key={index} className="cursor-pointer font-medium font-primary hover:underline duration-500 underline-offset-2">
                                {item.name}
                            </Link>
                        ))}
                    </ul>
                    
                </div>
            </div>
        </header>
    );
}