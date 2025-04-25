'use client'
import Loading from "@/app/loading";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategoryProduct from "../categoryProduct/page";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import LogoScroll from "@/components/tools/logoScroll";
import Head from "next/head";

export default function Product_Details({ id }) {
    const [produit, setProduit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantite, setQuantite] = useState(1)
    const [productUrl, setProductUrl] = useState("");
    const router = useRouter()
    
    const handleSaveDetails = () => {
        if (!produit) return;

        const totalPrice = produit?.price ? produit.price * quantite : 0;

        const newProduct = {
            id: produit.id,
            name: produit.name,
            url: productUrl,
            quantity: quantite,
            totalPrice: totalPrice,
        };
        const existingProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
        const existingProductIndex = existingProducts.findIndex((item) => item.id === produit.id);
        if (existingProductIndex !== -1) {
            existingProducts[existingProductIndex].quantity += quantite;
            existingProducts[existingProductIndex].totalPrice += totalPrice;
        } else {
            existingProducts.push(newProduct);
        }

        localStorage.setItem("cartProducts", JSON.stringify(existingProducts));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success('Produit Ajouté Au Panier ! ')
    };

    useEffect(() => {
        let isMounted = true;
        const fetchProduit = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/restApiFind?id=${id}`, { cache: 'no-store' });
                if (!response.ok) throw new Error("Failed to fetch data");
                const produitData = await response.json();
                if (isMounted) {
                    setProduit(produitData);
                    setProductUrl(window.location.href); 
                }
            } catch (error) {
                console.error("Error fetching produit details:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchProduit();

        return () => {
            isMounted = false;
        };
    }, [id]);

    // Image switching logic
    useEffect(() => {
        if (produit?.images?.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % produit.images.length);
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [produit]);
    if (isLoading) return <Loading />;
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": produit?.name || "Unknown Product",
        "image": produit?.images?.length > 0 ? produit.images.map((img) => img.src) : [],
        "description": produit?.description?.replace(/<[^>]*>/g, '').slice(0, 150) || "No description available.",
        "sku": produit?.sku || "N/A",
        "mpn": produit?.mpn || "N/A",
        "brand": {
            "@type": "Brand",
            "name": "art by warda"
        },
        "review": produit?.review ? {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": produit.review.ratingValue || "0",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": produit.review.author || "Anonymous"
            }
        } : undefined,
        "aggregateRating": produit?.aggregateRating ? {
            "@type": "AggregateRating",
            "ratingValue": produit.aggregateRating.ratingValue || "0",
            "reviewCount": produit.aggregateRating.reviewCount || "0"
        } : undefined,
        "offers": {
            "@type": "Offer",
            "url": productUrl || "https://example.com/product",
            "priceCurrency": produit?.currency || "MAD",
            "price": produit?.price || "0.00",
            "priceValidUntil": produit?.priceValidUntil || "2023-12-31",
            "itemCondition": `https://schema.org/${produit?.condition || "NewCondition"}`,
            "availability": `https://schema.org/${produit?.stock_status || "InStock"}`
        }
    };
    return (
        <div >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Toaster position="top-center" reverseOrder={false}/>
            <div className=" flex flex-col lg:flex-row min-h-screen lg:max-h-[100vh] bg-primary ">
                <div className="flex lg:w-full ">
                    {produit?.images?.length > 0 ? (
                        <Image src={produit.images[currentImageIndex].src} alt={produit?.name} title={produit?.name} width={1920} height={1080} className="h-full w-full object-cover border-white lg:border-b-4 lg:border-r-4 shadow-2xl " />
                    ) : (
                        <div className="h-96 w-full object-cover bg-[#EFEFEF] flex flex-col justify-center items-center">
                            <Image width={1920} height={1080} src={'/immobilier/house.png'} className="w-32 md:w-40 lg:w-52" />
                            <h2 className="text-3xl md:text-6xl lg:text-8xl font-medium">Photos bientôt disponibles</h2>
                        </div>
                    )}
                </div>
                <div className="lg:w-full  p-6 bg-primary flex flex-col justify-center items-center lg:items-start gap-4">
                    <h1 className=" text-2xl text-center lg:text-start lg:text-5xl  mb-4 font-primary font-bold text-white uppercase ">{produit.name}</h1>
                    <div className=" flex flex-row gap-4 items-center justify-center">
                        {produit?.categories.map((catg, index) => (<Link href={`/boutique?type=${catg.id}`} className=" border-2 border-white py-1 px-3  rounded-full text-white font-primary" key={index}>{catg.name}</Link>))}
                    </div>
                    <p className="text-center lg:text-left font-primary text-white" dangerouslySetInnerHTML={{ __html: produit?.description }}></p>
                    <div className=" bg-white duration-700 rounded-4xl border-2 border-white  flex flex-row gap-10 items-center justify-center">
                        <button className=" rounded-l-4xl cursor-pointer bg-primary p-1 text-white  " onClick={() => (quantite > 1 && setQuantite(quantite - 1))}><Minus size={25} /></button>
                        <span className=" font-primary text-xl">{quantite}</span>
                        <button className="rounded-r-4xl cursor-pointer bg-primary p-1 text-white " onClick={() => (quantite < 10 && setQuantite(quantite + 1))}><Plus size={25} /></button>
                    </div>
                    <div className=" flex flex-col-reverse lg:flex-row gap-4">
                        <button onClick={handleSaveDetails} className=" bg-white hover:bg-primary hover:text-white text-sm  lg:text-lg duration-700 border-2 cursor-pointer border-white font-primary py-2 px-4 rounded-full   text-primary capitalize flex flex-row items-center justify-center gap-2"><ShoppingCart size={20} /> ajouter a panier  {produit?.price ? new Intl.NumberFormat('de-DE').format(produit.price) * quantite + " dh" : "--"}</button>
                    </div>

                </div>
            </div>
            <CategoryProduct category={produit?.categories[0]?.id} />
        </div>
    );
}