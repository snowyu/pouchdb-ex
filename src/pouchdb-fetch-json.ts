/// <reference types="pouchdb-core" />

export function installFetchJson(PouchDB: PouchDB.Static) {

  PouchDB.prototype.fetchJson = async function(aPath, options?) {
    let result = await this.fetch(aPath, options);
    result = await result.json();
    return result;
  };

}

export default installFetchJson;
