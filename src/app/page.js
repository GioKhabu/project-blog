import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';
import { getBlogPostList } from '@/helpers/file-helpers';
import {BLOG_TITLE} from '@/constants'

import styles from './homepage.module.css';

export const metadata = {
  title: BLOG_TITLE,
  description: 'A wonderful blog about Javascript'
};

async function Home() {
  const posts = await getBlogPostList();
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      {posts.map(({slug, title, abstract, publishedOn}) => {
        return (
          <BlogSummaryCard
            key={`${slug}_${publishedOn}`}
            slug={slug}
            title={title}
            abstract={abstract}
            publishedOn={publishedOn}
          />
        );
      })}
    </div>
  );
}

export default Home;
