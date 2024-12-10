import { I_Books } from '@/app/api/books/route';

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
    <article className="flex flex-col items-center min-w-[250px] max-w-[250px] border-green-500 border-solid border-2">
      <img src={src} alt="book-cover" />
      <p>{title}</p>
      <p>저자:{author}</p>
      <p>출판사:{publisher}</p>
      <p>가격:{price}</p>
      <p>품절?</p>
    </article>
  );
}
