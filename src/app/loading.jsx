import Image from "next/image";


export default function Loading() {
    return (
      <>
        <div
          className={`fixed  inset-0 flex items-center justify-center bg-[#fff]  duration-1000 transition z-50 `}
        >
          <span className={`font-extrabold text-center items-center gap-3 md:text-5xl text-4xl  flex flex-col lg:flex-row justify-center text-white  `}>
           
            <span className=" font-primary text-primary flex  items-center justify-center gap-2   ">
                  Art by Warda
            </span>
          </span>
        </div>
      </>
    );
  }