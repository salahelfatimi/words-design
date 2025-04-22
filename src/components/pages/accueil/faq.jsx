'use client'
import { useState } from "react";
export default function Faq() {
    const [openFaq, setOpenFaq] = useState(0);
    const faqData = [
        {
            question: "Quels types de produits proposez-vous ?",
            answer: "Chez art by Warda , nous proposons des objets décoratifs, des illustrations personnalisées, des accessoires uniques ainsi que des créations artistiques sur mesure."
        },
        {
            question: "Est-il possible de personnaliser un produit ?",
            answer: "Oui, nous offrons la possibilité de personnaliser certains de nos produits selon vos envies. N'hésitez pas à nous contacter pour discuter de votre projet."
        },
        {
            question: "Comment passer commande ?",
            answer: "Vous pouvez passer commande directement sur notre boutique en ligne. Il vous suffit de sélectionner le produit souhaité, de l’ajouter au panier, puis de finaliser votre achat."
        },
        {
            question: "Quels sont les délais de livraison ?",
            answer: "Les délais de livraison varient entre 3 et 7 jours ouvrés pour les articles en stock. Les créations personnalisées peuvent nécessiter un délai supplémentaire."
        },
        {
            question: "Puis-je retourner un article ?",
            answer: "Oui, vous disposez de 14 jours après réception pour nous retourner un article non personnalisé. Les articles personnalisés ne sont ni repris ni échangés."
        },
        {
            question: "Proposez-vous des cartes cadeaux ?",
            answer: "Oui, nous proposons des cartes cadeaux digitales que vous pouvez offrir à vos proches. Elles sont disponibles directement sur notre site."
        },
        {
            question: "Comment vous contacter pour une collaboration ?",
            answer: "Pour toute demande de collaboration ou de projet sur mesure, vous pouvez nous écrire via notre formulaire de contact ou par email à hello@warda.design."
        }
    ];
    return(
        <div className="bg-primary py-10">
            <div className="container mx-auto px-4 flex flex-col justify-between gap-4 items-center  max-w-7xl ">
                <h2  className="  text-3xl lg:text-6xl  mb-4 font-primary text-white uppercase text-center "> Foire Aux Questions (FAQ) </h2>
                <div className=" flex flex-col gap-6 w-full ">
                    {faqData.map((faq, index) => (
                        <div key={index} className="flex flex-col p-4 gap-2 border-b-2 last:border-b-0 border-white">
                            <h3 onClick={()=>(setOpenFaq(index))} className="text-lg lg:text-xl font-primary font-medium text-white cursor-pointer"> - {faq.question}</h3>
                            <div className={`overflow-hidden transition-all duration-700 ease-in-out text-white ${openFaq == index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p className="font-primary text-sm lg:text-base">{faq.answer}</p>
                            </div>                    
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}