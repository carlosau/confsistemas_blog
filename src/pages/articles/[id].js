import React from 'react';
import { useRouter } from 'next/router';
import articles from '../../data/articles.json';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const article = articles.articles.find(
    (article) => article.id === parseInt(id)
  );

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-2'>{article.title}</h1>
      <p className='mb-2'>{article.content}</p>
      <p className='text-gray-600'>Author: {article.author} </p>
      <p className='text-gray-600 mb-4'>Date: {article.date}</p>
    </div>
  );
};

export default ArticlePage;
