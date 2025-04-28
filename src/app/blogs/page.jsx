import AllBlogs from "@/components/pages/blogs/allBlogs";
import LatestBlog from "@/components/pages/blogs/latestBlog";
import { Exo_2 } from "next/font/google";
const exo_2 = Exo_2 ({ subsets: ["latin-ext"], weight:['100','200','300','400','500','600','700','800','900'] });

export async function generateMetadata(){
  return {
    title: " Blog Art by Warda | Inspirations et Tendances en Décoration ",
    description: "Explorez les dernières tendances déco, conseils d’aménagement et inspirations créatives avec le blog de Art by Warda. Donnez vie à vos projets d'intérieur !",

    alternates: {
      canonical: "/blogs",
    },
    openGraph: {
      title: " Blog Art by Warda | Inspirations et Tendances en Décoration ",
      description: "Explorez les dernières tendances déco, conseils d’aménagement et inspirations créatives avec le blog de Art by Warda. Donnez vie à vos projets d'intérieur !",
      url:`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
      robots: {
        index: true,
        follow: true,
      },
      siteName: "art by warda",
      images: [
        {
          url: `/opengraph-image.jpg`,
          secureUrl: `/opengraph-image.jpg`,
          width: 1200,
          height: 675,
          alt: `Blog Art by Warda | Inspirations et Tendances en Décoration`,
        }
      ],
      type: "website",
     
    },
    }
  };

export default function Blogs(){
    
    return(
        <div className={`font-primary flex flex-col  `}>
            <LatestBlog/>
            <div className="container px-4 mx-auto flex flex-col gap-10">
                <h2 className=" border-primary text-primary  font-primary font-bold text-4xl border-b-4 w-full text-center py-4  ">Tous les Blogs</h2>
                <AllBlogs/>
            </div>
           
        </div>
    )
}