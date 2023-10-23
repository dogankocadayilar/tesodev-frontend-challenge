import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import NewsCarousel from "../components/NewsCarousel";

function Home() {
  return (
    <>
      <div className="px-2 md:px-3 max-w-7xl mx-auto min-h-[80vh] mb-10">
        {/* Header */}
        <header className="flex justify-center py-12 px-8 md:justify-end xl:px-0">
          <Link
            to="/records/new"
            className="bg-[#204080] hover:bg-[#4F75C2] focus:bg-[#4F75C2] focus:outline-none text-white px-10 py-2 rounded-xl transition-colors active:bg-[#162b57] truncate"
          >
            Add New Record
          </Link>
        </header>

        {/* Hero */}
        <Hero />
      </div>
      <div className="">
        {/* News */}
        <NewsCarousel />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default Home;
