import { openDB, DBSchema } from 'idb';

interface MyDB extends DBSchema {
  userList: {
    value: {
      name: string;
      date: string;
      message?: [];
    };
    key: string;
    indexes: { name: string; date: string };
  };
}

interface UserList {
  id: string;
  name: string;
  date: string;
  message?: [];
}

export const dbPromise =  openDB<MyDB>('cloudCourier', 1, {
  upgrade(db) {
    const Store = db.createObjectStore('userList', {
      keyPath: 'id',
      autoIncrement: true,
    });
    Store.createIndex('name', 'name');
    Store.createIndex('date', 'date');
  },
});

export async function add(val: UserList) {
  return (await dbPromise).add('userList', val);
}

export async function getAllFromIndex(key: 'name' | 'date') {
  return (await dbPromise).getAllFromIndex('userList', key);
}
export async function getAllFromName(key: 'name' | 'date', name: string) {
  return (await dbPromise).getAllFromIndex('userList', key, name);
}

export async function get(key: string | IDBKeyRange) {
  return (await dbPromise).get('userList', key);
}
// export async function set(key: IDBKeyRange | IDBValidKey, val: any) {
//   return (await dbPromise).put('userList', val, key);
// }
// export async function del(key: IDBKeyRange | IDBValidKey) {
//   return (await dbPromise).delete('userList', key);
// }
// export async function clear() {
//   return (await dbPromise).clear('userList');
// }
// export async function keys() {
//   return (await dbPromise).getAllKeys('userList');
// }
