'use client';

import { fetchBookList } from '@/app/lib/services/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import HomeBook from './HomeBook';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BookList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get('page') ?? 1;
  const title = searchParams.get('title') ?? '';
  const author = searchParams.get('author') ?? '';

  const { data } = useSuspenseQuery({
    queryKey: ['bookList', { page, title, author }],
    queryFn: () => fetchBookList({ page: +page, title, author }),
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  //todos : page size 10 magic number 상수화
  //page 범위 밖 접근시 error?
  const maxPage = Math.floor(data[0].totalBooks / 10);

  return (
    <div>
      <section className="flex flex-wrap gap-4">
        {data.map((book) => (
          <div key={book.id} onClick={() => router.push(`/${book.id}`)}>
            <HomeBook {...book} />
          </div>
        ))}
      </section>
      <div className="mt-4">
        <button
          onClick={() => handlePageChange(+page - 1)}
          disabled={+page <= 1}
          className="bg-gray-500 text-white p-2 mr-2"
        >
          Previous
        </button>
        {Array.from({ length: maxPage }, (_, index) => (
          <button
            key={`${index}${maxPage}`}
            onClick={() => handlePageChange(index + 1)}
            className={`p-2 ${
              +page === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(+page + 1)}
          className="bg-gray-500 text-white p-2 ml-2"
          disabled={+page >= maxPage}
        >
          Next
        </button>
        <div>Page {page}</div>
      </div>
    </div>
  );
}
