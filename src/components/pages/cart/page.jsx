'use client';

import { ShoppingBasket } from "lucide-react";
import { useEffect, useState } from "react";

export default function Cart() {
    const [cartCount, setCartCount] = useState(0);
    const updateCartCount = () => {
        const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        setCartCount(cartProducts.length);
    };
    useEffect(() => {
        updateCartCount();
        const handleCartUpdate = () => updateCartCount();
        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);
    return (
        <div className={` ${cartCount > 0 && 'animate-bounce'} fixed z-50 bottom-8 right-8 bg-white border-2 border-primary p-2 rounded-full `}>
            <ShoppingBasket className="stroke-primary" size={50} />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary border-2 border-white text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                    {cartCount}
                </span>
            )}
        </div>
    );
}