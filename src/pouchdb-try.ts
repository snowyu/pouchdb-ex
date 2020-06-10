/// <reference types="pouchdb-core" />

/* istanbul ignore next */
export function installTry(PouchDB: PouchDB.Static, methods = ['get', 'put', 'remove']) {

  // add `tryGet/tryPut` instance methods to PouchDB
  methods.forEach(aMethod => {
    const vTryMethod = 'try' + aMethod[0].toUpperCase() + aMethod.slice(1);
    PouchDB.prototype[vTryMethod] = async function(docId: string, options?) {
      const ignoreStatus: number = (options && options.ignoreStatus) || 404;
      let result;
      try {
        const args = [docId];
        if (options) args.push(options);
        result = await this[aMethod].apply(this, args);
      } catch (error) {
        /* istanbul ignore next */
        if (error.status !== ignoreStatus) throw error;
      }
      return result;
    };
  });

}

export default installTry;
