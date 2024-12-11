'use client';

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { deleteBook, fetchBook, updateBook } from '@/app/lib/services/api';
import { I_Books } from '@/app/api/books/type';
import { usePathname, useRouter } from 'next/navigation';

export default function BookDetail() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const bookId = pathname.replace(/\//g, '');

  const cachedBook: I_Books | undefined = queryClient
    .getQueryData<I_Books[]>(['bookList'])
    ?.find((book) => book.id === bookId);

  const { data: book } = useSuspenseQuery({
    queryKey: ['book', bookId],
    queryFn: () => (cachedBook ? null : fetchBook({ bookId })),
  });

  const { mutate } = useMutation({
    mutationFn: (newAmount: number) =>
      updateBook({
        bookId,
        updatedData: { amount: newAmount },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
    },
  });

  const { mutate: mutateDeleteBook } = useMutation({
    mutationFn: (bookId: string) => deleteBook({ bookId }),
    onSuccess: () => {
      router.push('/');
      queryClient.invalidateQueries({ queryKey: ['book', 'bookList', bookId] });
    },
    onError: (e) => {
      throw e;
    },
  });

  const currentBook = (cachedBook ?? book) as I_Books;

  const removeBook = (bookId: string) => mutateDeleteBook(bookId);

  const increaseAmount = (currentAmount: number) => mutate(currentAmount + 1);

  const decreaseAmount = (currentAmount: number) => {
    if (currentAmount > 1) mutate(currentAmount - 1);
  };

  return (
    <article className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <header>
        <h1 className="text-3xl font-bold mb-4">{currentBook.title}</h1>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Author:</strong> {currentBook.author}
        </p>
      </header>
      <section>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Plot:</strong> {currentBook.plot}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Publication Year:</strong> {currentBook.publicationYear}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Publisher:</strong> {currentBook.publisher}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <strong>Price:</strong> {currentBook.price.toLocaleString()}원
        </p>
      </section>
      <footer className="flex items-center space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => decreaseAmount(currentBook.amount)}
        >
          -
        </button>
        <span className="text-lg">{currentBook.amount}개</span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => increaseAmount(currentBook.amount)}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md ml-auto"
          onClick={() => removeBook(bookId)}
        >
          삭제
        </button>
      </footer>
    </article>
  );
}
