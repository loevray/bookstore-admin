import Link from 'next/link';
import ApiQueryWrapper from '../_components/book/ApiQueryWrapper';
import BookDetail from './BookDetail';

export default function BookDetailPage() {
  return (
    <main className="bg-gray-100 min-h-screen py-8">
      <section className="container mx-auto px-4">
        <nav className="mb-6">
          <Link
            href="/"
            className="text-blue-500 hover:underline text-lg font-semibold"
          >
            Home
          </Link>
          / <span className="text-gray-500 text-lg">Book Details</span>
        </nav>
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Book Details
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the details of your selected book
          </p>
        </header>
        <ApiQueryWrapper>
          <div className="bg-blue-100 rounded-lg shadow-md p-8">
            <BookDetail />
          </div>
        </ApiQueryWrapper>
        <footer className="mt-8 text-gray-600 text-center">
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm">
              &copy; 2024 Bookstore-admin. All rights reserved.
            </p>
            <p className="text-sm mt-1">Powered by loevray Inc.</p>
            <div className="mt-4">
              <span className="text-blue-500 hover:underline mx-2 font-semibold  cursor-pointer">
                Privacy Policy
              </span>
              <span className="text-blue-500 hover:underline mx-2 font-semibold cursor-pointer">
                Terms of Service
              </span>
              <span className="text-blue-500 hover:underline mx-2 font-semibold  cursor-pointer">
                Contact Us
              </span>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
