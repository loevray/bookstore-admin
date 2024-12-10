'use client';

import { fetchBookList } from '@/app/lib/services/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import HomeBook from './HomeBook';

export default function BookList() {
  const { data } = useSuspenseQuery({
    queryKey: ['bookList'],
    queryFn: () => fetchBookList(),
  });

  return (
    <section className="flex flex-wrap  gap-4">
      {data.map((book) => (
        <HomeBook {...book} key={book.id} />
      ))}
    </section>
  );
}
