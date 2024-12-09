import BOOKS from '@/mocks/books';
import { NextResponse } from 'next/server';


export async function GET() {
  return NextResponse.json(BOOKS);
}


