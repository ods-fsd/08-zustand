'use client';
import { ReactNode } from 'react';
import css from './layout.module.css';

interface SlugLayoutProps {
  children: ReactNode;
}

export default function SlugLayout({ children }: SlugLayoutProps) {
  return <div className={css.container}>{children}</div>;
}