import Navbar from "@/app/(components)/Navbar";
import Footer from "@/app/(components)/Footer";

export default function Layout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}
