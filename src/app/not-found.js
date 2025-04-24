import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className=" px-4 flex flex-col gap-10 items-center justify-center  h-screen bg-primary inset-0 ">
        <div className=" flex flex-col gap-10 items-center justify-center z-10">
          <Image src={'/img/logo_text_white.png'} width={500} height={500} className="w-64" alt="art by Warda" title="art by Warda" />
          <p className=" font-primary font-bold text-2xl flex items-center gap-2 flex-col text-center justify-center text-white">
            It seems that this page does not exist.        
          </p>
          <Link className=" underline underline-offset-4  font-bold text-xl bg-primary  text-white flex  duration-700 items-center gap-2" href="/">
            <Home size={30}/>Retour à l&apos;accueil
          </Link>
        </div>
        
      </div>
    </>
  );
}