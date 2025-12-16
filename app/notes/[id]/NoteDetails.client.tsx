'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetails() {
  const params = useParams();
  const id = params.id as string;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading note...</p>;
  if (error || !note) return <p>Note not found</p>;

  return (
    <div className={css.container}>
      <h2 className={css.title}>{note.title}</h2>
      {note.tag && <span className={css.tag}>{note.tag}</span>}
      <p className={css.content}>{note.content}</p>
      <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
    </div>
  );
}