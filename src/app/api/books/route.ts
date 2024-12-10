import { NextResponse } from 'next/server';
import db from '@/app/firebase/firebasedb'
import { collection, getDocs } from 'firebase/firestore';
import booksConverter from '@/app/firebase/booksConverter';

export interface I_Books {
  id:number,
  title:string,
  author:string,
  plot:string,
  publicationYear:number,
  publisher:string,
  price:number,
}


export async function GET() {
  const books = await getDocs(collection(db, 'books').withConverter(booksConverter))
  const booksData = books.docs.map(doc => ({ ...doc.data() }));
  return NextResponse.json(booksData);
}
