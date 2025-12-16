import { Metadata } from 'next';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const note = await fetchNoteById(id);
    
    return {
      title: note.title,
      description: note.content.slice(0, 150),
      openGraph: {
        title: note.title,
        description: note.content.slice(0, 150),
        url: `/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: 'Note not found',
      description: 'The requested note could not be found',
    };
  }
}

export default function NotePage() {
  return <NoteDetailsClient />;
}