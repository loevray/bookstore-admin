'use client';

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { fetchBook } from '@/app/lib/services/api';
import { I_Books } from '@/app/api/books/type';
import { usePathname } from 'next/navigation';

export default function BookDetail() {
  const queryClient = useQueryClient();

  const pathname = usePathname();
  const bookId = pathname.replace(/\//g, '');

  const cachedBook: I_Books | undefined = queryClient
    .getQueryData<I_Books[]>(['bookList'])
    ?.find((book) => book.id === bookId);

  const { data: book } = useSuspenseQuery({
    queryKey: ['book', bookId],
    queryFn: () => (cachedBook ? null : fetchBook({ id: bookId.toString() })),
  });

  const currentBook = cachedBook || book;

  return (
    <article className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <header>
        <h1 className="text-3xl font-bold mb-4">{currentBook?.title}</h1>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Author:</strong> {currentBook?.author}
        </p>
      </header>
      <section>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Plot:</strong> {currentBook?.plot}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Publication Year:</strong> {currentBook?.publicationYear}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Publisher:</strong> {currentBook?.publisher}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Price:</strong> {currentBook?.price?.toLocaleString()}원
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <strong>Available Amount:</strong> {currentBook?.amount}개
        </p>
      </section>
      <footer className="flex items-center space-x-4 mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          -
        </button>
        <span className="text-lg">{1 /* Quantity state needed */}</span>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          +
        </button>
      </footer>
    </article>
  );
}
