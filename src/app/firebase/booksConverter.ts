import { FirestoreDataConverter } from 'firebase/firestore';
import { I_Books } from '../api/books/type';

const booksConverter: FirestoreDataConverter<I_Books> = {
  toFirestore(book: I_Books) {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      plot: book.plot,
      publicationYear: book.publicationYear,
      publisher: book.publisher,
      price: book.price,
      amount: book.amount,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)!;
    return {
      id: data.id,
      title: data.title,
      author: data.author,
      plot: data.plot,
      publicationYear: data.publicationYear,
      publisher: data.publisher,
      price: data.price,
      amount: data.amount,
    } as I_Books;
  },
};

export default booksConverter;
