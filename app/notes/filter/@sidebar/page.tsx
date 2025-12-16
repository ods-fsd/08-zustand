'use client';

import Link from 'next/link';
import css from './page.module.css';

const tags = ['all', 'Work', 'Personal', 'Study', 'Other'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      {tags.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={tag === 'all' ? '/notes/filter/all' : `/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}