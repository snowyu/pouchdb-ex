/// <reference path="../types/typings.d.ts" />

import PouchDB from 'pouchdb-core';
import memPlugin from 'pouchdb-adapter-memory';
import httpPlugin from 'pouchdb-adapter-http';
import fetchJsonPlugin from "./pouchdb-fetch-json";

function setTimeoutPromise(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

PouchDB.plugin(memPlugin as any);
PouchDB.plugin(httpPlugin as any);
fetchJsonPlugin(PouchDB);

jest.setTimeout(30000)
describe('PouchDBFetchPlugin test suite', function () {
  let db: PouchDB.Database;
  beforeEach(async function () {
    db = new PouchDB('http://echo.jsontest.com/', {adapter: 'http'});
    return db;
  }, 30000);
  afterEach(function () {
    // return db.destroy();
  }, 30000);

  it('expect fetch a json', async function () {
    const doc = await db.fetchJson('/key/value/one/two', {});
    expect(doc).toEqual({
      "one": "two",
      "key": "value",
    });
  });

});
