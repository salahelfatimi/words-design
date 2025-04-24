import Product_Details from "@/components/pages/productDetails/page";
import Avis from "@/components/tools/avis";
import Faq from "@/components/tools/faq";
import Image from "next/image";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/restApiFind?id=${id}`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error("Failed to fetch product data");
    }
    const product = await response.json();
    const productDescription = product?.description ? product?.description.replace(/<[^>]*>/g, '') : 'Découvrez Art by Design , concept store à Marrakech : objets déco, illustration, design et personnalisation artisanale. Élégance, modernité et savoir-faire.';
    return {
        title: `${product?.name} - Art by Warda | Décoration artisanale`,
        description: productDescription || 'Découvrez Art by Design , concept store à Marrakech : objets déco, illustration, design et personnalisation artisanale. Élégance, modernité et savoir-faire.',
        alternates: {
            canonical: `/boutique/${encodeURIComponent(product?.name.trim().replace(/[/%\s]+/g, '-'))}/${product.id}`,
        },
        openGraph: {
            title: `${product?.name} - Art by Warda | Décoration artisanale`,
            description: productDescription || 'Découvrez Art by Design , concept store à Marrakech : objets déco, illustration, design et personnalisation artisanale. Élégance, modernité et savoir-faire.',
            url: `/boutique/${encodeURIComponent(product?.name.trim().replace(/[/%\s]+/g, '-'))}/${product.id}`,
            siteName: "Art by Warda ",
            images: [
                {
                    url: `${product?.images[0]?.src || '/opengraph-image.jpg'}`,
                    secureUrl: `${product?.images[0]?.src}`,
                    width: 1200,
                    height: 675,
                    alt: `Preview image for ${product?.name || '/opengraph-image.jpg'}`,
                },
            ],
            type: "product",
        },
    };
}

export default async function Page({ params }) {
    const { id } = await params;
    return (
        <div className=" min-h-screen">
            <Product_Details id={id} />
            <Faq />
        </div>
    )
}