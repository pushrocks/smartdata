import 'typings-test'
import * as shelljs from 'shelljs'
import * as should from 'should'
import * as smartdata from '../dist/index'


let mongoChildProcess
let testDbConnection: smartdata.DbConnection


describe('mongodb',function(){
    it('should start mongodb',function(done){
        this.timeout(20000)
        mongoChildProcess = shelljs.exec('mongod --dbpath=./test/data --port 27017',{async: true})
        setTimeout(() => { done() }, 10000) // give mongodb it some time to complete startup
    })
})
describe('smartdata',function(){
    it('should establish a connection to mongodb',function(done){
        testDbConnection = new smartdata.DbConnection('mongodb://localhost:27017/smartdata')
        testDbConnection.connect().then(() => { done() })
    })
    it('should create a collection',function(){

    })
    it('should close the db Connection',function(){
        testDbConnection.close()
    })
})

describe('mongodb',function(){
    it('should kill mongodb',function(){
        shelljs.exec('mongod --dbpath=./test/data --shutdown')
        mongoChildProcess.kill('SIGTERM')
    })
})
