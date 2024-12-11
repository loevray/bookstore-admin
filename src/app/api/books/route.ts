import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/firebase/firebasedb';
import {
  collection,
  getDocs,
  FirestoreError,
  query,
  limit,
  orderBy,
  startAfter,
  getCountFromServer,
  where,
  setDoc,
  doc,
} from 'firebase/firestore';
import booksConverter from '@/app/firebase/booksConverter';

const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  try {
    const page = searchParams.get('page') ?? 1;
    const searchedTitle = searchParams.get('title') || '';
    const searchedAuthor = searchParams.get('author') || '';
    const booksRef = collection(db, 'books').withConverter(booksConverter);

    let booksQuery = query(booksRef, orderBy('title'), limit(PAGE_SIZE));

    if (searchedTitle) {
      booksQuery = query(booksQuery, where('title', '==', searchedTitle));
    }

    if (searchedAuthor) {
      booksQuery = query(booksQuery, where('title', '==', searchedAuthor));
    }

    if (+page > 1) {
      const lastVisibleDoc = await getLastVisibleDoc(
        +page,
        PAGE_SIZE,
        searchedTitle,
        searchedAuthor,
      );

      if (lastVisibleDoc) {
        booksQuery = query(
          booksRef,
          orderBy('title'),
          startAfter(lastVisibleDoc),
          limit(PAGE_SIZE),
        );
      }
    }

    const books = await getDocs(booksQuery);
    const snapshot = await getCountFromServer(booksRef);
    let totalBooks = snapshot.data().count;

    if (searchedAuthor || searchedTitle) {
      totalBooks = (await getDocs(booksQuery)).docs.length;
    }

    const booksData = books.docs.map((doc) => ({ ...doc.data(), totalBooks }));

    return NextResponse.json(booksData);
  } catch (error) {
    if (error instanceof FirestoreError) {
      return NextResponse.json({ message: error.code }, { status: 400 });
    }
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    console.error('Error fetching books:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

async function getLastVisibleDoc(
  page: number,
  pageSize = PAGE_SIZE,
  title: string,
  author: string,
) {
  const offset = (page - 1) * pageSize;

  let initialQuery = query(
    collection(db, 'books').withConverter(booksConverter),
    orderBy('title'),
    limit(offset),
  );

  if (title) {
    initialQuery = query(initialQuery, where('title', '==', title));
  }

  if (author) {
    initialQuery = query(initialQuery, where('author', '==', author));
  }
  const initialDocs = await getDocs(initialQuery);
  const lastVisible = initialDocs.docs[initialDocs.docs.length - 1];
  return lastVisible;
}

export async function POST(req: NextRequest) {
  try {
    const newBookId = crypto.randomUUID();
    const book = await req.json();

    await setDoc(doc(db, 'books', newBookId), {
      ...book,
      id: newBookId,
    });

    return NextResponse.json(
      { id: newBookId },
      {
        status: 201,
        headers: { Location: `/api/books/${newBookId}` },
      },
    );
  } catch (error) {
    if (error instanceof FirestoreError) {
      return NextResponse.json({ message: error.code }, { status: 400 });
    }
    let errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    console.error('Error adding book:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
