import Product_Details from "@/components/pages/productDetails/page";
import Image from "next/image";

export default async function Page({ params }){
    const { id } = await params;
    return(
        <div className=" min-h-screen">
            <div className=" bg-secondary h-20"></div>
            <Product_Details id={id}/>
        </div>
    )
}