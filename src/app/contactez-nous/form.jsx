'use client'

import {  Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import {  useState } from "react";

export default function Form(){
    const [isLoading, setIsLoading] = useState(false);
    const [validation, setValidation] = useState(false);
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      tele: "",
      comment: "",
    });
    const sendEmail = async (e) => {
      e.preventDefault();
      setValidation(true);
      if (formData.fullName && formData.tele && formData.email) {
        setIsLoading(true);
        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.status === 200) {
            setFormData({
              fullName: "",
              email: "",
              tele: "",
              comment: "",
            });
            setValidation(false);
            setIsLoading(false);
          }
        } catch {
            setIsLoading(false);
        }
      }
    };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({...formData,[name]: value,});
    };
      return(
          <div className=" pb-20 ">
              <div className=" relative  ">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d422.14898122478405!2d-8.014992071215474!3d31.632733007997757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sma!4v1745314396232!5m2!1sen!2sma" className=" w-full h-[30rem]" frameBorder="0"/>
                <div className=" bg-secondary opacity-60 absolute inset-0"></div>
              </div>
              <div className=" font-primary  ">
                  <div className=" container mx-auto flex flex-col lg:flex-row items-center justify-center max-w-7xl  ">
                      <form className=" w-full  flex flex-col gap-4 p-6 " onSubmit={sendEmail}>
                        <h2 className="text-primary text-4xl font-bold font-boska text-center">Prendre contact avec nous</h2>
                        <p className=" text-lg  text-center">Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>
                          <div className=" flex flex-col lg:flex-row gap-4">
                              <div className=" w-full">
                                  <input value={formData.fullName} onChange={handleInputChange} type="text" name='fullName' className={` ${!formData.fullName && validation && "border-red-500 placeholder:text-red-500 "}  bg-[#EFEFEF] h-12 w-full rounded-lg border-2 border-primary p-4 placeholder:capitalize placeholder:text-sm placeholder:font-medium   `} placeholder=' Full Name * ' />
                              </div>
                              <div className=" w-full">
                                  <input value={formData.tele} onChange={handleInputChange} type="tele" name='tele' className={` ${!formData.tele && validation && "border-red-500 placeholder:text-red-500 "} bg-[#EFEFEF] h-12 w-full rounded-lg border-2 border-primary p-4 placeholder:capitalize placeholder:text-sm placeholder:font-medium  `} placeholder=' Phone *' />
                              </div>
                          </div>
                          <div className=" w-full">
                              <input value={formData.email} onChange={handleInputChange} type="email" name='email' className={` ${!formData.email && validation && "border-red-500 placeholder:text-red-500 "} bg-[#EFEFEF] h-12 w-full rounded-lg border-2 border-primary p-4 placeholder:capitalize placeholder:text-sm placeholder:font-medium  `} placeholder=' Email *' />
                          </div>                        
                          <textarea value={formData.comment} onChange={handleInputChange} className='bg-[#EFEFEF] w-full rounded-lg border-2 border-primary p-4 placeholder:capitalize placeholder:text-sm placeholder:font-medium  '  placeholder='Commentaires ' name="comment" id="comment" cols={30} rows={6}></textarea>
                          <button disabled={isLoading} type="submit" className=' bg-primary border-2 hover:text-primary duration-700 hover:bg-white border-primary text-white font-medium text-sm items-center justify-center rounded-full w-full  py-3 px-2 flex gap-1'><Mail className=" h-5"/>  {isLoading? "Envoi...": "Envoyer un message"}</button>
                      </form>
                    </div>
              </div>
          </div>
      )
  }