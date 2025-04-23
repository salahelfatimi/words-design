import Loading from "@/app/loading";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Filter() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams(); 
    const selectedType = searchParams.get("type");
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        AutoScroll({ stopOnInteraction: false, stopOnMouseEnter: true, speed: 0.7 }),
    ]);

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
    return (
        <div>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex flex-row gap-10 pl-10 w-full">
                    <div className={`px-4 py-2 rounded-full ${!selectedType ? "bg-secondary text-white" : "bg-primary text-white"}`}>
                        <Link className="text-2xl text-center  mb-4 font-primary font-bold text-white uppercase  whitespace-nowrap" href={`?`}>
                            Tous les produits
                        </Link>
                    </div>
                    {categories.map((produit, index) => (
                        <div key={index} className={`px-4 py-2 rounded-full ${ selectedType === String(produit.id) ? "bg-secondary text-white" : "bg-primary text-white" }`} >
                            <Link className="text-2xl text-center  mb-4 font-primary font-bold text-white uppercase  whitespace-nowrap" href={`?type=${produit.id}`} >
                                {produit?.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}