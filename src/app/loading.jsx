import Image from "next/image";


export default function Loading() {
    return (
      <>
        <div className={`fixed  inset-0 flex flex-col items-center justify-center bg-[#fff]  duration-1000 transition z-50 `}>
          <Image src={'/img/logo_text.png'} width={500} height={500} className="w-64 animate-bounce" alt="art by Warda" title="art by Warda" />
          
        </div>
      </>
    );
  }