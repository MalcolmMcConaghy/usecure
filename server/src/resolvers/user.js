export default {
  User: {
    firstName: async (parent, args, context, info) => parent.firstName,
    lastName: async (parent, args, context, info) => parent.lastName,
    email: async (parent, args, context, info) => parent.email,
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
    createUser: async (parent, { lastName, email }, { db }, info) => {
      const newUser = db.get('users').insert({ firstName, lastName, email }).write()

      return { ...newUser }
    },
    deleteUser: async (parent, { userId }, { db }, info) => {
      // ToDo: Delete user
    },
    updateUser: async (parent, { id, firstName, lastName, email }, { db }, info) => {
      // ToDo: Update user
    }
  }
}