import { NextResponse } from 'next/server';
import db from '@/app/firebase/firebasedb'
import { collection, FirestoreError, getDocs } from 'firebase/firestore';
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
  try{
    const books = await getDocs(collection(db, 'books').withConverter(booksConverter))
    const booksData = books.docs.map(doc => ({ ...doc.data() }));
    return NextResponse.json(booksData);
  } catch(error){
    if(error instanceof FirestoreError){
      //FirestoreError에서 제공하는 code별 분류 필요
      return NextResponse.json({ message: error.code }, { status: 400});
    }
    
    let errorMessage;
    if(error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    
    console.error('Error fetching books:', errorMessage); 
    return NextResponse.json({ message: errorMessage }, { status: 500});
  }

}
