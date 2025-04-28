
import Form from "./form";

export  function generateMetadata() {
    return {
      title: "Contactez nous | Art by Warda - Boutique & Concept Store à Marrakech",
      description: "Besoin d'aide ou d'informations ? Contactez Art by Warda, votre boutique de décoration et concept store à Marrakech . ",
      alternates: {
        canonical: "/contactez-nous",
      },
      openGraph: {
        title: 'Contactez nous | Art by Warda - Boutique & Concept Store à Marrakech',
        description: "Besoin d'aide ou d'informations ? Contactez Art by Warda, votre boutique de décoration et concept store à Marrakech . ",
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/contactez-nous`,
        siteName: "Art by Warda",
        images: [
          {
            url: `/opengraph-image.jpg`,
            secureUrl: `/opengraph-image.jpg`,
            width: 1200,
            height: 630,
            alt: `Contactez-nous | Art by Warda - Boutique & Concept Store à Marrakech`,
          }
        ],
        type: "website",
       
      },
      
     
    };
   
  }

  
export default function Contact(){
  return(
    <div className="   ">
      <Form/>
    </div>
  )
}