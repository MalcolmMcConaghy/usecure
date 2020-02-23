export default {
  User: {
    firstName: async (parent, args, context, info) => parent.firstName,
    lastName: async (parent, args, context, info) => parent.lastName,
    email: async (parent, args, context, info) => parent.email,
    id: async (parent, args, context, info) => parent.id,
    courseResults: async (parent, args, { db }, info) => {
      return db.get('courseResults').filter({ learnerId: parent.id }).value()
    }
  },
  Query: {
    users: async (parent, args, { db }, info) => {
      return db.get('users').value()
    },
    user: async (parent, { id }, { db }, info) => {
      return db.get('users').getById(id).value()
    }
  },
  Mutation: {
    createUser: async (parent, { firstName, lastName, email }, { db }, info) => {
      const newUser = db.get('users').insert({ firstName, lastName, email }).write()

      return { ...newUser }
    },
    deleteUser: async (parent, { id }, { db }, info) => {
      db.get('courseResults').remove({ learnerId: id}).write()
      db.get('users').remove({ id: id }).write()

      return true
    },
    editUser: async (parent, { id, firstName, lastName, email }, { db }, info) => {
      const updatedUser = db.get('users').find({ id }).assign({ firstName, lastName, email}).write()

      return { ...updatedUser }
    }
  }
}