import React from 'react';
import { Book } from '../types/book';
import { PdfCanvasViewer } from '../components/reader/PdfCanvasViewer';
import { PdfDocumentViewer } from '../components/reader/PdfDocumentViewer';

interface ReaderPageProps {
  book: Book;
  initialUnitNumber?: number;
  mode?: 'interactive' | 'pdf';
  onBack: () => void;
  onUpdateReadingProgress: (bookId: string, unitNumber: number, totalUnits: number) => void;
  onOpenDownloadModal?: () => void;
}

export const ReaderPage: React.FC<ReaderPageProps> = ({
  book,
  onBack,
  onUpdateReadingProgress,
  onOpenDownloadModal,
}) => {
  return (
    <div className="min-h-screen bg-slate-950">
      <PdfDocumentViewer
        book={book}
        onBack={onBack}
        onSwitchToInteractive={() => {}}
        onOpenDownloadModal={onOpenDownloadModal}
      />
    </div>
  );
};
