//This file is responsilble for managing our app's Indexed Database ("idb"). The "idb" allows us to store structured data on the "client-side" app. Here we "import" the "openDB" function from the "idb" module, which opens a connection to the "database". 
import { openDB } from 'idb';

//Here, we define a function called "initdb", which allows us to "open" the "DB" named "jate", which is at version "1". "initdb" contains a function called "upgrade", which will check "if" a "db" "object" is already "store"d there, with a "name" of "jate". If it finds an "object" matching this name, it "log"s the 'jate database...' message below to the "console". If no previous "jate" "object" is found in the "db", it creates an "objectStore" called "jate". It declares that this "object" should have a primary "key" of "id" and that the "id" should "autoIncrement", when new data is added to "jate".
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

//The "put" function allows us to "open" a connection to the "DB" and establishes that users have the ability to "read" and "Write" to the data stored there, via this method. 
export const putDb = async (content) => {
  const jate = await openDB('jate', 1);
  const tx = jate.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
