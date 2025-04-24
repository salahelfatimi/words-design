import Product_Details from "@/components/pages/productDetails/page";
import Avis from "@/components/tools/avis";
import Faq from "@/components/tools/faq";
import Image from "next/image";

export async function generateMetadata({ params: { id } }) {
    const response = await fetch(`/api/restApiFind?id=${id}`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error("Failed to fetch immobilier data");
    }
    const immobilier = await response.json();
    const immobilierDescription = immobilier?.description ?
      immobilier?.description.replace(/<[^>]*>/g, '') : 'Pas de description disponible';
    return {
      title: immobilier?.name,
      description: immobilierDescription || 'Pas de description disponible', 
      alternates: {
        canonical: `/immobilier/${immobilier.attributes?.find(attr => attr.id === 28)?.options[0]}/${immobilier.categories?.find(attr =>  [391, 390,389,388,402].includes(attr.id))?.name}/${encodeURIComponent(immobilier?.name.trim().replace(/[/%\s]+/g, '-'))}/${immobilier.id}`,
      },
      openGraph: {
        title: immobilier?.name,
        description: immobilierDescription || 'Pas de description disponible',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/immobilier/${immobilier.attributes?.find(attr => attr.id === 28)?.options[0]}/${immobilier.categories?.find(attr =>  [391, 390,389,388,402].includes(attr.id))?.name}/${encodeURIComponent(immobilier?.name.trim().replace(/[/%\s]+/g, '-'))}/${immobilier.id}`,
        siteName: "dayaf & co Immobilier",
        images: [
          {
            url: `${immobilier?.images[0]?.src || '/opengraph-image.jpg'}`,
            secureUrl: `${immobilier?.images[0]?.src}`,
            width: 1200,
            height: 675,
            alt: `Preview image for ${immobilier?.name || '/opengraph-image.jpg'}`,
          },
        ],
        type: "website",
      },
    };
  }

export default async function Page({ params }){
    const { id } = await params;
    return(
        <div className=" min-h-screen">
            <Product_Details id={id}/>
            <Faq/>
        </div>
    )
}