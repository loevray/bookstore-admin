'use client';

import { I_Books } from '@/app/api/books/type';
import Image from 'next/image';

export default function HomeBook({
  title,
  author,
  publisher,
  price,
  src = 'https://picsum.photos/200',
}: Pick<I_Books, 'title' | 'author' | 'publisher' | 'price'> & {
  src?: string;
}) {
  return (
    <article className="cursor-pointer flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
      <Image
        src={src}
        alt="book-cover"
        width={200}
        height={200}
        className="mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">Author: {author}</p>
      <p className="text-gray-700">Publisher: {publisher}</p>
      <p className="text-gray-900 font-bold">
        Price: {price.toLocaleString()}원
      </p>
    </article>
  );
}
