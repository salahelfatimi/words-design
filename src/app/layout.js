import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";
import Cart from "@/components/pages/cart/page";


export const metadata = {
  title: "Art by Design  | Décoration intérieure & objets design à Marrakech",
  description: "Découvrez Art by Design , concept store à Marrakech : objets déco, illustration, design et personnalisation artisanale. Élégance, modernité et savoir-faire.",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <Cart/>
        <main>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
