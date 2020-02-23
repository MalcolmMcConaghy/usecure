import React, {Fragment, useState, useEffect} from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

import CreateUser from './CreateUser'
import EditUser from './EditUser'

import './App.css'
import './UserView.css'

const GET_USERS = gql`
    {
        users {
            firstName
            lastName
            email
            id
            courseResults {
                name
                score
                learnerId
            }
        }
    }
`

const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`

const UserView = () => {
  const { loading, error, data, refetch } = useQuery(GET_USERS)
  const [selectedUserId, setSelectedUserId] = useState('')

  const [deleteUser] = useMutation(DELETE_USER)

  const deleteUserClick = id => {
    const confirmDeletion = window.confirm('Are you sure want to delete this user?')
    if (confirmDeletion) {
      deleteUser({ variables: { id } })
      refetch()
    }
  }

  const editUserClick = id => {
    setSelectedUserId(id)
    const modal = document.querySelector('.userView__editUserModal')
    modal.style.display = 'block'
  }

  const createUserClick = () => {
    const modal = document.querySelector('.userView__createUserModal')
    modal.style.display = 'block'
  }

  useEffect(() => {
    document.addEventListener("click", e => {
      if (e.target.classList[0] === 'modal') {
        document.querySelector('.userView__createUserModal').style.display = 'none'
        document.querySelector('.userView__editUserModal').style.display = 'none'
      }
    });
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  // ToDo: Display your users
  // Check the console log to make sure you're pulling your users in correctly.
  const users = data.users
  console.log(data)

  return (
    <Fragment>
      <h1>User View</h1>
      {users.map(user => {
        return (
          <Fragment key={user.id}>
            <ul className="userView__userList">
              <li>{user.firstName}</li>
              <li>{user.lastName}</li>
              <li>{user.email}</li>
              {user.courseResults &&
                user.courseResults.map(courseResult => <li key={`${courseResult.learnerId}-${courseResult.name}`}>{`${courseResult.name} : ${courseResult.score}`}</li>)
              }
            </ul>
            <button className="button button--edit" onClick={() => editUserClick(user.id)}>Edit User</button>
            <button className="button button--delete" onClick={() => deleteUserClick(user.id)}>Delete User</button>
          </Fragment>
        )
      })}
      <button className="button button--createUser" onClick={() => createUserClick()}>Create User</button>
      <div className="modal userView__createUserModal">
        <div className="modal__content">
          <CreateUser 
            refetch={refetch}
          />
        </div>
      </div>
      <div className="modal userView__editUserModal">
        <div className="modal__content">
          <EditUser
            id={selectedUserId}
            listRefetch={refetch}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default UserView
