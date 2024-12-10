'use client';

import { fetchBookList } from '@/app/lib/services/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import HomeBook from './HomeBook';

export default function BookList() {
  const { data } = useSuspenseQuery({
    queryKey: ['book-list'],
    queryFn: () => fetchBookList(),
  });

  return (
    <article>
      {data.map((book) => (
        <HomeBook {...book} key={book.id} />
      ))}
    </article>
  );
}
