import FileSync from 'lowdb/adapters/FileSync'
import low from 'lowdb'
import lodashId from 'lodash-id'

const adapter = new FileSync('../db.json')
const db = low(adapter)

db._.mixin(lodashId)

module.exports = db