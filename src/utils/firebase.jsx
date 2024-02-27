import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, push } from 'firebase/database';
import { child, get, ref, remove, set, update } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKEY,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export const auth = getAuth();

// 서재에 책 등록하기
export const addBookData = async ({ userId, data }) => {
  const bookListRef = ref(db, `user/${userId}/books`);
  const newBookListRef = push(bookListRef);
  set(newBookListRef, data);
};

// 서재에 등록된 책 목록 가져오기
export const getBooksData = async (userId) => {
  let bookList = [];
  const response = await get(child(ref(db), `user/${userId}/books`));

  if (response.exists()) {
    const data = response.val();
    for (let key in data) {
      bookList.push({
        ...data[key],
        id: key,
      });
    }
  }
  return bookList;
};

// 책 상세정보 가져오기
export const getBookData = async ({ userId, key }) => {
  const response = await get(child(ref(db), `user/${userId}/books/${key}`));
  if (response.exists()) {
    return response.val();
  } else {
    return '데이터가 존재하지 않습니다.';
  }
};

// 데이터 삭제
export const removeBookData = ({ userId, key }) => {
  remove(ref(db, `user/${userId}/books/${key}`));
};

// 책 정보 업데이트
export const updateBookData = ({ userId, key, data }) => {
  return update(ref(db, `user/${userId}/books/${key}`), data);
};

// 문장 기록하기
export const addRecordData = async ({ userId, key, data }) => {
  const recordListRef = ref(db, `user/${userId}/books/${key}/record`);
  const newRecordRef = push(recordListRef);
  set(newRecordRef, data);
};

// 기록한 문장 데이터 가져오기
export const getRecordData = async ({ userId, key }) => {
  let record = [];
  const response = await get(
    child(ref(db), `user/${userId}/books/${key}/record`)
  );
  if (response.exists()) {
    const data = response.val();
    for (let key in data) {
      record.push({ id: key, ...data[key] });
    }
    return record;
  } else {
    return [];
  }
};

export const removeRecordData = async ({ userId, myBookId, recordId }) => {
  remove(ref(db, `user/${userId}/books/${myBookId}/record/${recordId}`));
};

export const updateRecordData = async ({
  userId,
  myBookId,
  recordId,
  data,
}) => {
  return update(
    ref(db, `user/${userId}/books/${myBookId}/record/${recordId}`),
    data
  );
};
