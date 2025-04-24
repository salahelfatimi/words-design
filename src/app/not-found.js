import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className=" px-4 flex flex-col gap-10 items-center justify-center  h-screen  bg-top  bg-[url(/img/bg-yellow.svg)] bg-primary inset-0 ">
        <div className=" flex flex-col gap-10 items-center justify-center z-10">
          <Image src="/img/Logo_single_white.png" height={500} width={500} alt="Caravan Serai" title="Caravan Serai" className="w-48 animate-bounce " />
          <p className=" font-bold text-2xl flex items-center gap-2 flex-col text-center justify-center text-white">
            It seems that this page does not exist.        
          </p>
          <Link
            className=" underline underline-offset-4  font-bold text-xl bg-primary p-4 text-white flex  duration-700 items-center gap-2"
            href="/"
          >
            <Home size={30}/>Back to home
          </Link>
        </div>
        
      </div>
    </>
  );
}