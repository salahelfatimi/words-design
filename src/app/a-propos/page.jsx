import AboutUs from "@/components/pages/a-propos/page";

export  function generateMetadata() {
    return {
      title: "À propos de Art by Warda | Boutique et Concept Store à Marrakech",
      description: "Découvrez l'univers créatif d'Art by Warda : décoration intérieure, objets uniques et design alliant tradition et modernité. Basés à Marrakech, nous donnons vie à vos idées.",
      alternates: {
        canonical: "/a-propos",
      },
      openGraph: {
        title: 'À propos de Art by Warda | Boutique et Concept Store à Marrakech',
        description: "Découvrez l'univers créatif d'Art by Warda : décoration intérieure, objets uniques et design alliant tradition et modernité. Basés à Marrakech, nous donnons vie à vos idées.",
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/a-propos`,
        siteName: "Art by Warda",
        images: [
          {
            url: `/opengraph-image.jpg`,
            secureUrl: `/opengraph-image.jpg`,
            width: 1200,
            height: 630,
            alt: `À propos de Art by Warda | Boutique et Concept Store à Marrakech`,
          }
        ],
        type: "website",
       
      },
      
     
    };
   
}

export default function Page(){
    return(
        <div>
            <AboutUs/>
        </div>
    )
}