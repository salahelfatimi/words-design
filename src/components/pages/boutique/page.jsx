"use client";
import Loading from "@/app/loading";
import { PackageSearch } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Filter from "./filter";
import Link from "next/link";

export default function Boutique({type}) {
    const [produit, setProduit] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allLoaded, setAllLoaded] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    console.log(produit)
    const fetchProduit = useCallback(async (page, isInitialFetch = false) => {
        setLoading(true);
        try {
        const response = await fetch(`/api/restApi?page=${page}&perPage=15&type=${type}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const newProduit = await response.json();
        if (isInitialFetch) {
            setProduit(newProduit); // ✅ Set initial products
            setInitialLoading(false);
        } else {
            setProduit((prev) => [...prev, ...newProduit]);
        }
        
        if (newProduit.length < 10) {
        
            setAllLoaded(true);
        }
        setPage(page);
        setError(null);
        } catch (err) {
        setError("Network error, please try again.");
        } finally {
        setLoading(false);
        }
    }, [type]);

    useEffect(() => {
        setProduit([]); 
        setPage(1); 
        setAllLoaded(false); 
        setInitialLoading(true);
        fetchProduit(1, true); 
    }, [fetchProduit]);

    useEffect(() => {
        const handleScroll = () => {
        if (loading || allLoaded || window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100) return;
        fetchProduit(page + 1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, page, allLoaded]);
    return (
    <div className=" ">
        <div className=" bg-primary min-h-20   pb-10 "></div>
        <div className=" flex flex-col gap-10 pt-10 ">
            <Filter type={type}/>
            {initialLoading ? (Loading(true)) : (produit.length>0?(
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-center justify-center container mx-auto  px-10 ">
                        {
                            produit.map((produit,index)=>(
                                <Link href={`/boutique/${encodeURIComponent(produit?.name.trim().replace(/[/%\s]+/g, '-'))}/${produit?.id}`} key={index} className={`group cursor-pointer duration-700 flex flex-col select-none   gap-3 items-center justify-center  min-h-90 overflow-hidden   relative  `}>
                                    <Image className={`group duration-700 ${index % 2 ?'rounded-tl-[10rem] group-hover:rounded-tl-[20rem] rounded-br-[10rem] rounded-tr-[20rem] rounded-bl-[15rem]':'rounded-tl-[15rem] group-hover:rounded-tr-[20rem]  rounded-br-[20rem] rounded-tr-[10rem] rounded-bl-[15rem]'}   object-cover  rounded-2xl  border-4 border-primary  `} src={produit?.images[0]?.src} width={1920} height={1080} alt={produit.name} title={produit.name}/>
                                    <div className={` min-h-16 min-w-16 top-4 right-4 flex items-center justify-center rounded-4xl absolute bg-primary px-4 `}><span className=" text-2xl text-center  font-primary font-semibold text-white uppercase ">{produit?.price? new Intl.NumberFormat('de-DE').format(produit.price) + " dh": "--"}</span></div>
                                    <h3 className="text-2xl text-center  mb-4 font-primary font-bold text-primary uppercase ">{produit?.name}</h3>
                                </Link>
                            ))
                        } 
                    </div>
                ):
                (
                    <div className="min-h-screen flex flex-col items-center justify-center gap-4 ">
                        <PackageSearch size={70} className=" stroke-primary" />
                        <h2 className=" text-secondary font-primary font-medium text-3xl text-center">Aucun produit disponible pour le moment</h2>
                        <p className=" font-primary text-center">Nous travaillons sur de nouvelles créations uniques.</p>
                    </div>
                )
            
            )}
        </div>
      {/* Loading, Error, and End of Data Message */}
      {loading && !initialLoading && <div className="flex justify-center my-6 font-primary  text-gray-500 text-xl font-medium flex-col items-center">Chargement plus Produit...</div>}
      {error && <div className="flex justify-center mt-6 text-red-500">{error}</div>}
      {allLoaded && produit.length>0 && !loading && <div className="flex justify-center my-6 text-gray-500 text-lg font-medium animate-pulse flex-col items-center font-primary"> <span>Tous les Produit ont été chargés.</span></div>}
    </div>
  );
}
