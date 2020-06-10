/// <reference path="../types/typings.d.ts" />

import PouchDB from 'pouchdb-core';
import memPlugin from 'pouchdb-adapter-memory';
import installTryPlugin from "./pouchdb-try";

function setTimeoutPromise(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

installTryPlugin(PouchDB, ['get', 'put', 'remove']);
PouchDB.plugin(memPlugin as any);

jest.setTimeout(30000)
describe('PouchDBTryPlugin test suite', function () {
  let db: PouchDB.Database;
  beforeEach(async function () {
    db = new PouchDB('dbname', {adapter: 'memory'});
    await db.put({_id: 'myid', value: 'hi1'});
    return db;
  }, 30000);
  afterEach(function () {
    return db.destroy();
  }, 30000);

  it('expect tryGet a exists doc', async function () {
    const doc = await db.tryGet('myid', {ignoreStatus: 404});
    expect(doc._rev).toBeDefined();
    delete doc._rev;
    expect(doc).toEqual({
      _id: 'myid',
      value: 'hi1'
    });
  });

  it('expect tryGet an unknown doc', async function () {
    const doc = await db.tryGet('myid_unknown');
    expect(doc).not.toBeDefined();
  });

  it('expect tryPut a new doc', async function () {
    const res = await db.tryPut({_id: 'mynewid', value: 'hi1'});
    expect(res).toHaveProperty('ok', true);
    const doc = await db.get('mynewid');
    expect(doc._rev).toBeDefined();
    delete doc._rev;
    expect(doc).toEqual({
      _id: 'mynewid',
      value: 'hi1'
    });
  });

  it('expect tryPut a exists doc  without raise 409 error', async function () {
    let res = await db.tryPut({_id: 'mynewid', value: 'hi1'});
    expect(res).toHaveProperty('ok', true);
    res = await db.tryPut({_id: 'mynewid', value: 'hi2'}, {ignoreStatus: 409});
    expect(res).not.toBeDefined();
    const doc = await db.get('mynewid');
    expect(doc._rev).toBeDefined();
    delete doc._rev;
    expect(doc).toEqual({
      _id: 'mynewid',
      value: 'hi1'
    });
  });

  it('expect tryRemove a exists doc', async function () {
    const doc = await db.get('myid');
    const res = await db.tryRemove(doc, {ignoreStatus: 404});
    expect(res).toHaveProperty('ok', true);
  });

  it('expect tryremove an unknown doc', async function () {
    const doc = await db.tryRemove('myid_unknown', '1-rev');
    expect(doc).not.toBeDefined();
  });

});
