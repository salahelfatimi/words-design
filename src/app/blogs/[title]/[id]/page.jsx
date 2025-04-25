import DetailsBlog from "@/components/pages/blogs/detailsBlog";
import LatestBlog from "@/components/pages/blogs/latestBlog";

export async function generateMetadata({ params}) {
    const { id } = await params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/posts/?_embed&include=${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Blogs ");
    }
    const Datablogs = await response.json();
    const blogs= Datablogs[0]

    return {
      title: blogs.title.rendered,
      description: blogs.content.rendered.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim().slice(0, 160) || 'No description available', // Strips HTML tags, removes extra spaces, trims, and limits to 160 characters
      alternates: {
      canonical: `/blogs/${encodeURIComponent(blogs.title.rendered.trim().replace(/[/%\s]+/g, "-"))}/${blogs.id}`,
      },
      openGraph: {
      title: blogs?.name,
      description: blogs.content.rendered.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim().slice(0, 160) || 'No description available', // Strips HTML tags, removes extra spaces, trims, and limits to 160 characters
      url: `/blogs/${encodeURIComponent(blogs.title.rendered.trim().replace(/[/%\s]+/g, "-"))}/${blogs.id}`,
      siteName: "art by warda  | Blogs",
      images: [
        {
        url: `${blogs._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/opengraph-image.jpg'}`,
        secureUrl: `${blogs._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/opengraph-image.jpg'}`,
        width: 1200,
        height: 675,
        alt: `Preview image for ${blogs.title.rendered || '/opengraph-image.jpg'}`,
        },
      ],
      type: "website",
      },
    };
  }
export default async function detailsBlogs({ params }){
    const { id } = await params;
    return(
        <div>
            <DetailsBlog id={id}/>
        </div>
    )
}