import { Suspense } from 'react';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import Loader from '@/components/Loader/Loader'; 

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  const displayTag = tag === 'all' ? 'All' : tag;

  return {
    title: `NoteHub - ${displayTag} Notes`,
    description: `Browse your notes filtered by ${displayTag}.`,
    openGraph: {
      title: `NoteHub - ${displayTag} Notes`,
      description: `Browse your notes filtered by ${displayTag}.`,
      url: `/notes/filter/${slug.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug[0];
  const queryTag = tag === 'all' ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', queryTag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag: queryTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loader />}>
        <NotesClient tag={queryTag} />
      </Suspense>
    </HydrationBoundary>
  );
}