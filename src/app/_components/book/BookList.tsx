'use client';

import { I_Books } from '@/app/api/books/route';
import getBookList from '@/app/lib/services/getBookList';
import { useSuspenseQuery } from '@tanstack/react-query';
import HomeBook from './HomeBook';

export default function BookList({
  initialBookData,
}: {
  initialBookData: I_Books[];
}) {
  const { data } = useSuspenseQuery({
    queryKey: ['book-list'],
    queryFn: getBookList,
    initialData: initialBookData,
  });
  return (
    <article>
      {data.map((book) => (
        <HomeBook {...book} key={book.id} />
      ))}
    </article>
  );
}
