"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import Link from "next/link";

export default function Categories(){

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/restApiCategories`);
            if (!response.ok) throw new Error("Failed to fetch categories");
            const categoriesData = await response.json();
            if (isMounted) {
            setCategories(categoriesData);
            }
        } catch (error) {
            console.error("Error fetching categories details:", error);
        } finally {
            if (isMounted) setIsLoading(false);
        }
        };
        fetchCategories();

        return () => {
        isMounted = false; 
        };

    }, []);
    if (isLoading) return <Loading />;
    return(
        <div className=" py-10 bg-primary ">
            <div className=" mx-auto container px-4">
                <h2 className="text-3xl lg:text-6xl  mb-8 font-primary font-bold text-white text-center uppercase  " >Nos Domaines d'Expertise</h2>

                <div className=" columns-1 md:columns-2 lg:columns-4 space-y-4">
                    {
                        categories.map((produit,index)=>(
                                produit?.image?.src && (
                                    <Link href={`/boutique?type=${produit.id}`} key={index} className={` duration-700 cursor-pointer   ${index % 2 ?'rounded-tl-[10rem] hover:rounded-tl-[20rem] rounded-br-[10rem] rounded-tr-[20rem] rounded-bl-[15rem]':'rounded-tl-[15rem] hover:rounded-tr-[20rem]  rounded-br-[20rem] rounded-tr-[10rem] rounded-bl-[15rem]'} flex flex-col  border-4 border-white  gap-3 items-center justify-center min-w-40 min-h-40 overflow-hidden   relative  `}>
                                        <Image className={`  object-cover   `} src={produit?.image?.src} width={800} height={800} alt={produit.name} title={produit.name}/>
                                        <div className=" absolute inset-0 bg-black opacity-30"></div>
                                        <h3 className="text-2xl uppercase font-medium  text-white font-primary text-center absolute ">{produit?.name}</h3>

                                    </Link>
                                )
                        ))
                    }
                </div>
            </div>
        </div>
    )
}