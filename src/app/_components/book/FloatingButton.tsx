'use client';

import { useState } from 'react';
import AddBookForm from './AddBookForm';

export default function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed bottom-20 left-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition"
        onClick={toggleModal}
      >
        +
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <AddBookForm onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
