import Boutique from "@/components/pages/boutique/page";

export async function generateMetadata() {
    return {
      title: "Boutique | Art by Warda – Créations uniques de décoration et design ",
      description: "Découvrez la boutique en ligne Art by Warda : un univers de décoration intérieure, d’illustrations et d’objets personnalisés faits main. Design moderne, raffiné et inspiré.",
  
      alternates: {
        canonical: "/boutique",
      },
      openGraph: {
        title: "Boutique | Art by Warda – Créations uniques de décoration et design",
        description: "Découvrez la boutique en ligne Art by Warda : un univers de décoration intérieure, d’illustrations et d’objets personnalisés faits main. Design moderne, raffiné et inspiré.",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/boutique`,
        robots: {
          index: true,
          follow: true,
        },
        siteName: "Art by Design",
        images: [
          {
            url: `/opengraph-image.jpg`,
            secureUrl: `/opengraph-image.jpg`,
            width: 1200,
            height: 675,
            alt: "Art by Design",
          }
        ],
        type: "website",
        
  
      },
    }
  };

  
export default async function Page({ searchParams }){
    const { type } = await searchParams || {};

    return(
        <div>
            <Boutique type={type}/>
        </div>
    )
}