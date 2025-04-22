
import Form from "./form";

export  function generateMetadata() {
    return {
      title: "Contact",
      alternates: {
        canonical: "/contact",
      },
      openGraph: {
        title: 'Dyafa & Co - Contact',
        description: "Découvrez des services exclusifs d'immobilier de luxe avec dayaf & Co à Marrakech. Nous proposons des locations de villas exceptionnelles, des séjours privés d'élite, et des services de conciergerie sur mesure à travers le Maroc, adaptés aux voyageurs et investisseurs haut de gamme.",
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
        siteName: "Dyafa & Co",
        images: [
          {
            url: `/opengraph-image.jpg`,
            secureUrl: `/opengraph-image.jpg`,
            width: 1200,
            height: 630,
            alt: `Dyafa & Co - Contact `,
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