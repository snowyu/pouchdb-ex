/// <reference types="pouchdb-core" />

declare namespace PouchDB {
  namespace Core {
    interface GetOptions {
      ignoreStatus?: number;
    }
    interface GetOpenRevisions {
      ignoreStatus?: number;
    }
    interface PutOptions {
      ignoreStatus?: number;
    }
    interface Options {
      ignoreStatus?: number;
    }
  }

  interface Database<Content extends {} = {}> {
    /** Fetch a document */
    tryGet<Model>(docId: Core.DocumentId,
      options?: Core.GetOptions
      ): Promise<Core.Document<Content & Model> & Core.GetMeta>;

    /** Fetch a document */
    tryGet<Model>(docId: Core.DocumentId,
              options: Core.GetOpenRevisions
            ): Promise<Array<Core.Revision<Content & Model>>>;

    /**
     * Create a new document or update an existing document.
     *
     * If the document already exists, you must specify its revision _rev,
     * otherwise a conflict will occur.
     * There are some restrictions on valid property names of the documents.
     * If you try to store non-JSON data (for instance Date objects) you may
     * see inconsistent results.
     */
    tryPut<Model>(doc: Core.PutDocument<Content & Model>,
      options?: Core.PutOptions): Promise<Core.Response>;

    /**
     * Create a new document or update an existing document.
     *
     * If the document already exists, you must specify its revision _rev,
     * otherwise a conflict will occur.
     * There are some restrictions on valid property names of the documents.
     * If you try to store non-JSON data (for instance Date objects) you may
     * see inconsistent results.
     */
    tryPut<Model>(doc: Core.PutDocument<Content & Model>,
      options: Core.PutOptions | null,
      callback: Core.Callback<Core.Response>): void;

    /** Remove a doc from the database */
    tryRemove(doc: Core.RemoveDocument,
              options: Core.Options,
              callback: Core.Callback<Core.Response>): void;

    /** Remove a doc from the database */
    tryRemove(docId: Core.DocumentId,
              revision: Core.RevisionId,
              options: Core.Options,
              callback: Core.Callback<Core.Response>): void;

    /** Remove a doc from the database */
    tryRemove(doc: Core.RemoveDocument,
             options?: Core.Options): Promise<Core.Response>;

    /** Remove a doc from the database */
    tryRemove(docId: Core.DocumentId,
             revision: Core.RevisionId,
             options?: Core.Options): Promise<Core.Response>;
    fetchJson(url: string, options?: any): Promise<any>;

  }
  interface Static extends EventEmitter {
    plugin(plugin: Static): Static;
  }
}

