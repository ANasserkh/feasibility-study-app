import { openDB } from 'idb';

const dbName = 'feasibility';
const pTable = 'projects';
const iTable = 'items';
const dbVersion = 1;

let db = null;

async function init() {

    //check for support
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }

    // create database
    db = await openDB(dbName, dbVersion, {
        upgrade(db, oldVersion, newVersion, transaction) {
            // create projects table
            if (!db.objectStoreNames.contains(pTable)) {
                db.createObjectStore(pTable, {
                    keyPath: 'id'
                });
            }

            // create items table
            if (!db.objectStoreNames.contains(iTable)) {
                db.createObjectStore(iTable, {
                    keyPath: 'id'
                });
            }
        }
    });
}


function add(tableName, object) {
    if (!db) {
        console.error('DB not initlized');
        return;
    }

    // generate project id
    const pId = object.name.toLowerCase().replace(/ /g, '-');

    // get table
    const table = db.transaction(tableName, 'readwrite').store;
    table.add({ id: pId, ...object });
}

async function get(tableName, id) {
    if (!db) {
        console.error('DB not initlized');
        return;
    }

    // get table
    const table = db.transaction(tableName, 'readonly').store;
    const data = id === undefined ? await table.getAll() : await table.get(id);

    return data;
}

export default {
    init,
    add,
    get
};