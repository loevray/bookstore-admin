import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/firebase/firebasedb';
import {
  doc,
  getDoc,
  FirestoreError,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import booksConverter from '@/app/firebase/booksConverter';

export interface I_RouteHandlerParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: I_RouteHandlerParams) {
  try {
    // 특정 책 상세 정보 조회
    const bookId = (await params).id;
    const bookDoc = await getDoc(
      doc(db, 'books', bookId).withConverter(booksConverter),
    );
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

export async function PUT(req: NextRequest, { params }: I_RouteHandlerParams) {
  try {
    const bookId = (await params).id;
    const updatedBookData = await req.json();

    const bookDocumentRef = doc(db, 'books', bookId).withConverter(
      booksConverter,
    );

    await updateDoc(bookDocumentRef, updatedBookData);

    return NextResponse.json(
      { message: 'Book updated successfully' },
      { status: 200 },
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
    console.error('Error updating book:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: I_RouteHandlerParams,
) {
  try {
    const { id: bookId } = await params;
    const bookDocumentRef = doc(db, 'books', bookId);

    await deleteDoc(bookDocumentRef);

    return NextResponse.json(
      { message: 'Book deleted successfully' },
      { status: 200 },
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
    console.error('Error deleting book:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
