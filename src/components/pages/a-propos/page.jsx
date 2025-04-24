import Avis from "@/components/tools/avis";
import Faq from "@/components/tools/faq";
import LogoScroll from "@/components/tools/logoScroll";
import Image from "next/image";

export default function AboutUs(){
    return(
        <div className="min-h-screen">
            <div className=" relative">
                <Image src={'/img/header.webp'} width={1920} height={1080} className="  w-full h-screen object-cover "  alt="art by Warda" title="art by Warda" />
                <div className=" absolute bg-black opacity-50 inset-0 "></div>
                <div className=" absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className=" font-primary text-white text-3xl lg:text-6xl font-bold uppercase">À propos de Art by Warda</h1>
                </div>
            </div>
            <LogoScroll/>
            <div className=" mx-auto container py-6 font-primary text-center text-2xl space-y-4">
                <p>Bienvenue dans l’univers d’Art by Warda, où chaque création raconte une histoire.</p>
                <p>Passionnée par le design et l’art de la récupération, je redonne vie aux objets oubliés pour leur offrir une nouvelle âme. Mon travail mêle traditions marocaines et inspirations contemporaines, dans une démarche éco-responsable et profondément humaine.</p>
                <p>Chaque pièce est unique, pensée avec soin et réalisée à la main. Je crois que l’art ne se trouve pas uniquement dans les galeries, mais aussi dans les objets du quotidien, porteurs d’émotion, de mémoire et de beauté.</p>
                <h2 className=" text-primary font-semibold">Chez Art by Warda, vous trouverez :</h2>
                <ul className=" space-y-4 ">
                    <li>🧡 Des objets revisités avec une touche personnelle</li>
                    <li>♻️ Une approche durable et engagée</li>
                    <li>✨ Une authenticité qui se ressent dans chaque création</li>
                </ul>
            </div>
            <Avis/>
            <Faq/>
        </div>
    )
}