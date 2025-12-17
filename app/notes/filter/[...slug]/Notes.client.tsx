'use client';

import { useState, useEffect } from 'react'; 
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebounce } from 'use-debounce'; 
import Link from 'next/link';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import css from './page.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();


  const searchFromUrl = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;


  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  
  const [debouncedSearch] = useDebounce(searchTerm, 300);


  useEffect(() => {
    setSearchTerm(searchFromUrl);
  }, [searchFromUrl]);


  useEffect(() => {
    if (debouncedSearch === searchFromUrl) return;

    const params = new URLSearchParams(searchParams.toString());
    
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }
    
    params.set('page', '1');
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, pathname, router, searchParams, searchFromUrl]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, searchFromUrl, tag],
    queryFn: () => fetchNotes({ page, perPage: 12, search: searchFromUrl, tag }),
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={css.container}>
      <div className={css.topBar}>
        <SearchBox value={searchTerm} onChange={handleSearch} />
        
        <Link href="/notes/action/create" className={css.createBtn}>
          Create note +
        </Link>
      </div>

      {isLoading && <Loader />}
      
      {isError && <ErrorMessage />}
      
      {data && (
        <>
          <NoteList notes={data.notes} />
          {data.totalPages > 1 && (
             <Pagination 
               page={data.currentPage} 
               totalPages={data.totalPages} 
               onChange={handlePageChange} 
             />
          )}
        </>
      )}
    </div>
  );
}