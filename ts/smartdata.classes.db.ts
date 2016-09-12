import * as plugins from './smartdata.plugins'

export type TConnectionStatus = 'disconnected' | 'connected' | 'failed'

export class Db {
    dbUrl: string
    db: plugins.mongodb.Db
    status: TConnectionStatus

    constructor(dbUrl: string) {
        this.dbUrl = dbUrl
    }

    connect(): plugins.q.Promise<any> {
        let done = plugins.q.defer()
        plugins.mongodb.MongoClient.connect(this.dbUrl, (err, db) => {
            if (err) { console.log(err) }
            plugins.assert.equal(null, err)
            this.db = db
            plugins.beautylog.success(`connected to database at ${this.dbUrl}`)
            done.resolve(this.db)
        })
        return done.promise
    }

    close(): plugins.q.Promise<any> {
        let done = plugins.q.defer()
        this.db.close()
        plugins.beautylog.ok(`disconnected to database at ${this.dbUrl}`)
        done.resolve()
        return done.promise
    }
}
