import React, { useState } from 'react';
import { Book } from '../../types/book';
import { getBookCoverUrl } from '../../utils/coverImage';
import { BookOpen } from 'lucide-react';

interface BookCoverThumbnailProps {
  book: Book;
  className?: string;
  imgClassName?: string;
}

export const BookCoverThumbnail: React.FC<BookCoverThumbnailProps> = ({
  book,
  className = '',
  imgClassName = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const coverUrl = getBookCoverUrl(book);

  if (imgError || !coverUrl) {
    return (
      <div className={`w-full h-full p-3 bg-gradient-to-br ${book.coverColor || 'from-slate-900 via-indigo-950 to-slate-900'} flex flex-col justify-between text-white ${className}`}>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider">
            Grade {book.grade}
          </span>
          <BookOpen className="w-3.5 h-3.5 text-white/70" />
        </div>
        <div className="font-extrabold text-xs leading-tight line-clamp-3">
          {book.title}
        </div>
        <div className="text-[9px] text-slate-300/80 font-medium">
          MOE Ethiopia
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center ${className}`}>
      <img
        src={coverUrl}
        alt={book.title}
        loading="lazy"
        onError={() => setImgError(true)}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-3 text-center">
          <div className="w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin mb-1.5" />
          <span className="text-[10px] font-mono text-slate-400 font-bold">Grade {book.grade}</span>
        </div>
      )}
    </div>
  );
};
