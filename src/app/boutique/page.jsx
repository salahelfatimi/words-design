import Boutique from "@/components/pages/boutique/page";

export default async function Page({ searchParams }){
    const { type } = await searchParams || {};

    return(
        <div>
            <Boutique type={type}/>
        </div>
    )
}