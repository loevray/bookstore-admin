import Link from 'next/link';
import ApiQueryWrapper from '../_components/book/ApiQueryWrapper';
import BookDetail from './BookDetail';

export default function BookDetailPage() {
  return (
    <main className="bg-gray-100 min-h-screen py-8">
      <ApiQueryWrapper>
        <section className="container mx-auto px-4">
          <nav className="mb-4">
            <Link href="/" className="text-blue-500 hover:underline">
              Home
            </Link>
            / <span>Book Details</span>
          </nav>
          <BookDetail />
        </section>
      </ApiQueryWrapper>
    </main>
  );
}
