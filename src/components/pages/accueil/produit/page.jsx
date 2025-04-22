"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import Loading from "@/app/loading";
import Link from "next/link";

export default function Produit(){

    const [produit, setProduit] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        AutoScroll({ stopOnInteraction:false,stopOnMouseEnter:true ,speed: 0.7  })
      ])

    useEffect(() => {
        let isMounted = true;
        const fetchProduit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/restApi`);
            if (!response.ok) throw new Error("Failed to fetch data");
            const produitData = await response.json();
            if (isMounted) {
            setProduit(produitData);
            }
        } catch (error) {
            console.error("Error fetching data details:", error);
        } finally {
            if (isMounted) setIsLoading(false);
        }
        };
        fetchProduit();

        return () => {
        isMounted = false; 
        };

    }, []);

    if (isLoading) return <Loading />;
    return(
        <div className=" py-10 ">
            <h2 className=" lg:text-4xl font-primary text-center pb-10 uppercase font-medium text-primary">Découvrez nos Nouveautés en Décoration Intérieure</h2>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex flex-row gap-10 pl-10 ">
                {
                    produit.map((produit,index)=>(
                        <Link href={`/boutique/${encodeURIComponent(produit?.name.trim().replace(/[/%\s]+/g, '-'))}/${produit?.id}`} key={index} className={` group cursor-pointer duration-700 flex flex-col select-none   gap-3 items-center justify-center min-w-90 min-h-90 overflow-hidden   relative  `}>
                            <Image className={`group duration-700 ${index % 2 ?'rounded-tl-[10rem] group-hover:rounded-tl-[20rem] rounded-br-[10rem] rounded-tr-[20rem] rounded-bl-[15rem]':'rounded-tl-[15rem] group-hover:rounded-tr-[20rem]  rounded-br-[20rem] rounded-tr-[10rem] rounded-bl-[15rem]'}   object-cover  rounded-2xl  border-4 border-primary  `} src={produit?.images[0]?.src} width={800} height={800} alt={produit.name} title={produit.name}/>
                            <div className={` min-h-20 min-w-20 top-4 right-4 flex items-center justify-center  ${index % 2 ?'rounded-tl-[10rem] rounded-br-[10rem] rounded-tr-[20rem] rounded-bl-[15rem]':'rounded-tl-[15rem]  rounded-br-[20rem] rounded-tr-[10rem] rounded-bl-[15rem]'}  absolute bg-primary px-2`}><span className=" font-primary text-white text-lg font-medium">{produit?.price? new Intl.NumberFormat('de-DE').format(produit.price) + " dh": "--"}</span></div>
                            <h3 className="text-lg font-primary text-primary font-medium text-center ">{produit?.name}</h3>
                        </Link>
                    ))
                }
                </div>
            </div>
            <div className=" flex flex-col items-center justify-center pt-10">
                <Link href={'/boutique'} className=" bg-primary text-white w-fit px-6 py-3 rounded-4xl font-primary border-2 border-primary hover:bg-white hover:text-primary font-medium">Voir Boutique</Link>
            </div>
        </div>
    )
}