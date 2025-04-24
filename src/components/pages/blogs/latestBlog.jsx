"use client"
import Loading from "@/app/loading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LatestBlog() {
  const [latestPost, setLatestPost] = useState(null);

  useEffect(() => {
    const fetchLatestPost = async () => {
      try {
        // Fetch the latest blog post from the WordPress API
        const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts?_embed&per_page=1`);
        const data = await res.json();

        // Set the latest post data
        setLatestPost(data[0]);
      } catch (error) {
        console.error("Error fetching latest post:", error);
      }
    };

    fetchLatestPost();
  }, []);

  if (!latestPost) {
    return <div><Loading/></div>;
  }

  return (
    <div>
      {latestPost && (
        <div key={latestPost.id} className="relative flex flex-col lg:flex-row justify-around items-center gap-3 " >
            <div className="relative w-full">
              <Image src={ latestPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/opengraph-image.jpg' } alt={latestPost.title.rendered || 'Default Alt Text'} width={1920} height={1080} className="h-[100vh] w-full object-cover object-center" />
              <div className="absolute inset-0 bg-black opacity-65"></div></div>
              <div className="container absolute flex flex-col justify-between items-center gap-4 px-4">
                <h1 className="text-white  text-xl lg:text-3xl font-bold" dangerouslySetInnerHTML={{ __html: latestPost.title.rendered }}/>
                <p className="text-white font-light" dangerouslySetInnerHTML={{ __html: latestPost.excerpt.rendered }}/>
                <Link href={`/blogs/${encodeURIComponent( latestPost.title.rendered.trim().replace(/[/%\s]+/g, '-') )}/${latestPost.id}`} className="bg-primary  text-white hover:bg-white hover:text-primary text-2xl duration-700 rounded-full py-3 px-6 w-fit text-center font-bold border-2 border-primary " > En savoir plus </Link>
              </div>
        </div>
      )}
    </div>
  );
}
