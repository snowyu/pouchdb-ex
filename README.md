# PouchDB Ex

### Usage

PouchDB Ex
=====



PouchDB extension:

* `pouchdb-try`: the following
  * `tryGet(key, options?)` - get the document of the key, return undefined instead raise error if the key is not found.
  * `tryRemove(key, options?)` - remove the document, return undefined instead of raise error if it doesn't exist.
  * `tryPut(doc, options?)` - you can use this if u need ignore the some status error, such as 409.
  * NOTE: `options.ignoreStatus`: do not raise error if error status is the `ignoreStatus`. defaults to 404.
* `pouchdb-fetch-json`: only for `pouchdb-adapter-http`.
  * `async fetchJson(path, options)`: the path is the relative from server url.

Installation
------

```
npm install pouchdb-ex
```

Then attach it to the `PouchDB` object:

```js
import PouchDB from 'pouchdb';
import {installTry, installFetchJson} from 'pouchdb-ex';
PouchDB.plugin(PouchEx.installTry);
// only for adapter http:
PouchDB.plugin(PouchEx.installFetchJson);
```

API
--------


