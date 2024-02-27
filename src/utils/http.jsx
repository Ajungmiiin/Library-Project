import axios from 'axios';

// 리액트 쿼리
import { QueryClient } from '@tanstack/react-query';

// queryClient
export const queryClient = new QueryClient();

// axios instance
export const fetchBooks = axios.create({
  baseURL: 'https://dapi.kakao.com',
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_REST_API_KEY}`,
  },
});

// 검색
export const searchBooks = async (params, signal) => {
  const response = await fetchBooks.get('/v3/search/book', {
    params: {
      query: params ? params : '에세이',
      sort: 'recency',
      size: 10,
    },
    signal,
  });

  // 에러 핸들링

  return response.data.documents;
};

// 책의 상세정보
export const searchBook = async (params, signal) => {
  const response = await fetchBooks.get('/v3/search/book', {
    params: {
      query: params,
    },
    signal,
  });

  if (response.data.documents.length === 0) {
    throw new Error('데이터가 존재하지 않습니다');
  }

  return response.data.documents[0];
};
