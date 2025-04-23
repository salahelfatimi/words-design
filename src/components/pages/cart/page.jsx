'use client';

import { ShoppingBasket, Trash2, Minus, Plus, X, ShoppingBag, Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
    const [cartCount, setCartCount] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [alertMessage, setAlertMessage] = useState(""); // State for alert message

    const updateCartCount = () => {
        const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        setCartCount(cartProducts.length);
        setCartProducts(cartProducts);
        calculateTotalPrice(cartProducts);
    };

    const calculateTotalPrice = (products) => {
        const total = products.reduce((sum, product) => sum + product.totalPrice, 0);
        setTotalPrice(total);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);

        // Add or remove the "overflow-hidden" class on the <body> element
        if (!isModalOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    };

    const deleteProduct = (id) => {
        const updatedProducts = cartProducts.filter((product) => product.id !== id);
        localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
        window.dispatchEvent(new Event("cartUpdated"));

        // Show alert message
        setAlertMessage("Product deleted successfully!");
        setTimeout(() => setAlertMessage(""), 3000); // Hide alert after 3 seconds
    };

    const updateQuantity = (id, action) => {
        const updatedProducts = cartProducts.map((product) => {
            if (product.id === id) {
                const newQuantity = action === "increase" ? product.quantity + 1 : product.quantity - 1;
                if (newQuantity > 0) {
                    product.quantity = newQuantity;
                    product.totalPrice = product.quantity * (product.totalPrice / (product.quantity - (action === "increase" ? 1 : -1)));
                }
            }
            return product;
        }).filter((product) => product.quantity > 0); // Remove products with quantity 0
        localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const generateWhatsAppMessage = () => {
        if (cartProducts.length === 0) return "Your cart is empty.";

        let message = "🛒 *Your Cart Details*:\n\n";
        cartProducts.forEach((product, index) => {
            message += `${index + 1}. *${product.name}*\n   Quantity: ${product.quantity}\n   Total: ${new Intl.NumberFormat("de-DE").format(product.totalPrice)} dh\n   View Product: ${product.url}\n\n`;
        });
        message += `*Total Price*: ${new Intl.NumberFormat("de-DE").format(totalPrice)} dh\n\n`;
        message += "Thank you for shopping with us!";

        return encodeURIComponent(message);
    };

    useEffect(() => {
        updateCartCount();
        const handleCartUpdate = () => updateCartCount();
        window.addEventListener("cartUpdated", handleCartUpdate);

        // Cleanup: Remove "overflow-hidden" class when the component unmounts
        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
            document.body.classList.remove("overflow-hidden");
        };
    }, []);

    return (
        <>
            {/* Alert */}
            {alertMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                    {alertMessage}
                </div>
            )}

            {/* Cart Icon */}
            <div
                onClick={toggleModal}
                className={`${
                    cartCount > 0 && "animate-bounce"
                } fixed z-50 bottom-8 right-8 bg-white border-2 border-primary p-2 rounded-full cursor-pointer`}
            >
                <ShoppingBasket className="stroke-primary" size={50} />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary border-2 border-white text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2" >
                    <div className=" bg-white w-[50vh] min-h-[40vh] max-h-[80vh] p-6 rounded-lg shadow-lg relative  flex flex-col  justify-center">
                        {cartProducts.length > 0 ? (
                            <>
                                <h2 className="text-4xl font-bold mb-4 font-primary flex flex-row items-center justify-center gap-2 uppercase">Votre panier</h2>
                                <ul className="space-y-4 overflow-y-auto">
                                    {cartProducts.map((product, index) => (
                                        <li key={index} className="flex flex-col lg:flex-row justify-between items-start gap-4 border-b last:border-b-0 py-6 font-primary" >
                                            <div className=" flex flex-col gap-1">
                                                <p className="font-medium text-xl">{product.name}</p>
                                                <p className=" text-gray-500 "> Quantité : {product.quantity}</p>
                                                <p className=" text-gray-500 "> Total : {new Intl.NumberFormat("de-DE").format(product.totalPrice)} dh</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Link onClick={()=>(setIsModalOpen(false))} href={product.url} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"> <Eye size={20} /> </Link>
                                                <button onClick={() => updateQuantity(product.id, "decrease")} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"> <Minus size={20} /> </button>
                                                <button onClick={() => updateQuantity(product.id, "increase")} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"> <Plus size={20} /> </button>
                                                <button onClick={() => deleteProduct(product.id)} className="p-2 bg-red-500 rounded-full hover:bg-red-400 text-white"> <Trash2 size={20} /> </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4  pt-4">
                                    <p className="text-2xl font-medium font-primary"> Prix total : {new Intl.NumberFormat("de-DE").format(totalPrice)} dh </p>
                                </div>
                                <a href={`https://wa.me/+212602314804?text=${generateWhatsAppMessage()}`} target="_blank" rel="noopener noreferrer" className="mt-4 font-primary bg-green-500 hover:bg-green-400 text-white py-4 px-4 rounded-lg flex items-center justify-center" >
                                    Envoyer à WhatsApp                                
                                </a>
                                <button onClick={toggleModal} className="mt-4 font-primary bg-red-500 text-white cursor-pointer  hover:bg-red-400 py-4 px-4 rounded-lg flex items-center justify-center">
                                    Fermer le panier
                                </button>
                            </>
                        ) : (
                            <div className=" flex flex-col gap-4 items-center justify-center">
                                <ShoppingBag className=" animate-bounce"  size={50}/>
                                <p className="text-gray-500 font-primary text-2xl ">Votre panier est vide.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}