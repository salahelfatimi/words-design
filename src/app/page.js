import Pgae from "@/components/pages/accueil/page";

export async function generateMetadata() {
  return {
    title: "Art by Design | Décoration intérieure & objets design à Marrakech ",
    description: "Découvrez Art by Design , concept store à Marrakech : objets déco, illustration, design et personnalisation artisanale. Élégance, modernité et savoir-faire.",

    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: "Art by Design | Décoration intérieure & objets design à Marrakech ",
      description: "Découvrez Art by Design , concept store à Marrakech : objets déco, illustration, design et personnalisation artisanale. Élégance, modernité et savoir-faire.",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
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

export default function Home() {
  return (
    <div className="">
        <Pgae/>
    </div>
  );
}
