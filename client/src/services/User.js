import { AES } from "crypto-js";

let db;

export const initialize = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open("MyDatabase");
    request.onerror = (event) => {
      // Generic error handler for all errors targeted at this database's
      // requests!
      console.error(`Database error: ${event.target.errorCode}`);
      reject(`Database error: ${event.target.errorCode}`);
    };
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };

    // This event is only implemented in recent browsers
    request.onupgradeneeded = (event) => {
      // Save the IDBDatabase interface
      const db = event.target.result;

      // Create an objectStore for this database
      const objectStore = db.createObjectStore("users", { keyPath: "email" });

      // Create an index to search users by name. We may have duplicates
      // so we can't use a unique index.
      objectStore.createIndex("name", "name", { unique: false });

      // Create an index to search users by email. We want to ensure that
      // no two users have the same email, so use a unique index.
      objectStore.createIndex("email", "email", { unique: true });

      // Use transaction oncomplete to make sure the objectStore creation is
      // finished before adding data into it.
      // objectStore.transaction.oncomplete = (event) => {
      //   // Store values in the newly created objectStore.
      //   const userObjectStore = db.transaction("users", "readwrite").objectStore("users");
      //   userData.forEach((user) => {
      //     userObjectStore.add(user);
      //   });
      // };
    };
  });

export const addUser = (user) =>
  new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"], "readwrite");

    transaction.onerror = (event) => {
      reject("User with email already exists");
    };

    user.password = AES.encrypt(
      user.password,
      process.env.REACT_APP_CRYPTO_SECRET || "supersecret"
    ).toString();

    const objectStore = transaction.objectStore("users");
    const request = objectStore.add(user);
    request.onsuccess = (event) => {
      resolve();
    };
  });

export const getUser = (email) =>
  new Promise((resolve, reject) => {
    const transaction = db.transaction(["users"]);
    const objectStore = transaction.objectStore("users");
    const request = objectStore.get(email);
    request.onerror = (event) => {
      reject("Error getting user");
    };
    request.onsuccess = (event) => {
      resolve(request.result);
    };
  });
