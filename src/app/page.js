import Image from "next/image";
import Link from "next/link";
import MainSiteLayout from "../components/layout/MainSiteLayout";

export default function Home() {
  return (
    <MainSiteLayout>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <div className="flex items-center justify-between w-full">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
            />
            <Link
              href="/admin/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold text-center sm:text-left">
            Pet Adoption Management System
          </h1>
          
          <p className="text-lg text-gray-600 text-center sm:text-left max-w-2xl">
            Find your perfect pet companion and help pets find their forever homes. 
            Our comprehensive system makes pet adoption simple and efficient.
          </p>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link
              href="/pets"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            >
              Browse Pets
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            >
              Learn More
            </Link>
          </div>
        </main>
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <Link
            href="/contact"
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Contact icon"
              width={16}
              height={16}
            />
            Contact Us
          </Link>
          <Link
            href="/admin/login"
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Admin icon"
              width={16}
              height={16}
            />
            Admin Access
          </Link>
        </footer>
      </div>
    </MainSiteLayout>
  );
}
