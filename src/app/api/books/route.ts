import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/firebase/firebasedb';
import {
  collection,
  getDocs,
  FirestoreError,
  addDoc,
} from 'firebase/firestore';
import booksConverter from '@/app/firebase/booksConverter';

export async function GET() {
  try {
    const books = await getDocs(
      collection(db, 'books').withConverter(booksConverter),
    );
    const booksData = books.docs.map((doc) => ({ ...doc.data() }));
    return NextResponse.json(booksData);
  } catch (error) {
    if (error instanceof FirestoreError) {
      // FirestoreError에서 제공하는 code별 분류 필요
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

export async function POST(req: NextRequest) {
  try {
    const book = await req.json();
    const booksDocumentRef = await addDoc(
      collection(db, 'books').withConverter(booksConverter),
      book,
    );

    return NextResponse.json(
      { id: booksDocumentRef.id },
      {
        status: 201,
        headers: { Location: `/api/books/${booksDocumentRef.id}` },
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
