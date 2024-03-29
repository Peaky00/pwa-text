import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
    try {
      console.log('PUT to the database');
      const jateDb = await openDB('jate', 1);
      const tx = jateDb.transaction('jate', 'readwrite');
      const store = tx.objectStore('jate');
      const request = store.put({ content });
      const result = await request;
      console.log('Data updated', result)
      return result;
    } catch (err) {
      console.error('putDb not implemented', err);
    }};
  

// TODO: method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    return '';
  } catch (err) {
    console.error('getDb not implemented', err);
  }
};

initdb();