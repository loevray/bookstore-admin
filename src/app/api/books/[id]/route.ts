import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/firebase/firebasedb';
import { doc,  getDoc, FirestoreError } from 'firebase/firestore';
import booksConverter from '@/app/firebase/booksConverter';

export interface I_Books {
  id: number;
  title: string;
  author: string;
  plot: string;
  publicationYear: number;
  publisher: string;
  price: number;
}


export async function GET(req:NextRequest,{ params }: {params: Promise<{id:string}>}) {
  try {
      // 특정 책 상세 정보 조회
      const bookId = (await params).id;
      const bookDoc = await getDoc(doc(db, 'books', bookId).withConverter(booksConverter));
      if (bookDoc.exists()) {
        const bookData = { ...bookDoc.data() };
        return NextResponse.json(bookData);
      } else {
        return NextResponse.json({ message: 'Book not found' }, { status: 404 });
      }
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

    console.error('Error fetching book detail:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
