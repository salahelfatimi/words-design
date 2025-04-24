import Product_Details from "@/components/pages/productDetails/page";
import Avis from "@/components/tools/avis";
import Faq from "@/components/tools/faq";
import Image from "next/image";

export default async function Page({ params }){
    const { id } = await params;
    return(
        <div className=" min-h-screen">
            <Product_Details id={id}/>
            <Faq/>
        </div>
    )
}