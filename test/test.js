const assert = require('assert')
const admin = require('firebase-admin')
const serviceAccount = require("../secret/serviceAccountKey.json");
const UserService = require('../services/user-service')
const resetUsers = require('../assets/reset-users.json')
const synchedUsers = require('./assets/synched-users.json')
const _ = require('lodash')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-test-3d575.firebaseio.com"
})

describe('Synchronize users', () => {
    describe('#RESET', () => {
        it('should reset database to initial state', (done) => {
            UserService.resetUsers(resetUsers)
                .then(() => {
                    return UserService.getUsers().then(users => {
                        assert.deepEqual(resetUsers, _.values(users))
                    })
                }).then(done).catch(done)
        })
    })

    describe('#SYNCHRO', () => {
        it('should synchronize users correctly', (done) => {
            UserService.resetUsers(resetUsers)
                .then(() => {
                    /* return SynchronisationService.start() */
                    /* .then(() => { */
                    return UserService.getUsers()
                        .then(users => {
                            assert.deepEqual(synchedUsers, _.values(users))
                        })
                    /* }) */
                }).then(done).catch(done)
        })
    })
})