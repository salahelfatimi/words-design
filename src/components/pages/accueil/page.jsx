import Link from "next/link";
import Produit from "./produit/page";
import Image from "next/image";
import Categories from "./categories/page";
import { Store } from "lucide-react";
import Faq from "./faq";
import LogoScroll from "@/components/tools/logoScroll";
import Avis from "@/components/tools/avis";

export default function Pgae(){
    return(
        <div>
            <div className=" relative h-screen bg-white">
                <div className=" absolute inset-0 bg-black opacity-50 "></div>
                <Image src={'/img/header.jpg'} width={1920} height={1080} className=" w-full h-full object-cover "  alt="art by Warda" title="art by Warda" />
                <div className=" absolute inset-0 flex flex-col items-center justify-center container mx-auto gap-8">
                    <h1 className=" font-primary text-2xl lg:text-6xl text-center  uppercase text-white font-medium">art by Warda - Votre partenaire pour l'aménagement intérieur et la décoration à Marrakech</h1>
                    <Link href={'/boutique'} className=" bg-primary text-white rounded-3xl text-xl font-medium hover:bg-secondary hover:text-white py-3 px-6 font-primary flex flex-row items-center justify-center gap-2 "><Store/> Voir Boutique </Link>
                </div>
            </div>
            <LogoScroll/>
            <Produit/>
            <Categories/>
            <div className=" flex flex-row items-center gap-10 justify-center mx-auto container py-10">
                <div className="w-1/2 flex items-center justify-center  ">
                    <video width="100%" height="100%" autoPlay loop playsInline muted className="h-[40rem] shadow-2xl w-fit object-cover animate-rounded-change" >
                        <source src="/vid/aboutUs/vid.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="w-1/2 space-y-4">
                    <h2 className=" font-primary font-bold text-4xl text-primary uppercase">À propos de art by Warda</h2>
                    <p className=" font-primary">art by Warda est une boutique de décoration et d'objets design située au cœur de Marrakech, dans le quartier dynamique de Guéliz. Nous sommes spécialisés dans la vente de produits de décoration et d'objets design pour la maison, alliant tradition marocaine et modernité.</p>
                    <h2 className=" font-primary font-bold text-2xl text-primary">Notre Histoire</h2>
                    <p className=" font-primary">Fondée par une passionnée de décoration et de design, art by Warda a pour objectif de proposer des produits uniques et élégants qui reflètent l'essence de la culture marocaine. Nous sommes convaincus que chaque objet que nous vendons doit être non seulement beau, mais également chargé de sens et d'histoire.</p>
                    <h2 className=" font-primary font-bold text-2xl text-primary">Nos Produits</h2>
                    <p className=" font-primary">Nous proposons une sélection de produits de décoration et d'objets design pour la maison, notamment :</p>
                    <ul className=" list-disc list-inside  font-primary">
                        <li>Objets décoratifs artisanaux</li>
                        <li>Meubles design</li>
                        <li>Luminaires</li>
                        <li>Textiles marocains traditionnels</li>
                        <li>Objets de décoration intérieure</li>
                    </ul>
                </div>
            </div>
            <Avis/>
            <Faq/>
        </div>
    )
}