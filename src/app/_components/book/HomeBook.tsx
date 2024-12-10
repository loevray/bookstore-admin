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
    <article>
      <img src={src} alt="book-cover" />
      <p>{title}</p>
      <p>{author}</p>
      <p>{publisher}</p>
      <p>{price}</p>
      <p>품절?</p>
    </article>
  );
}
