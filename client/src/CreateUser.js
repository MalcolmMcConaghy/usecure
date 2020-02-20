import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const CREATE_USER = gql`
    mutation createUser(firstName: String!, $lastName: String!, $email: String!) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email) {
            id
            firstName
            lastName
            email
        }
    }
`

/*
  This isn't used anywhere but is set up to show you how using mutations work on the client.
  If you reuse this, make sure you style it.
 */
export const CreateUser = () => {
  let firstName, lastName, email
  const [createUser] = useMutation(CREATE_USER)

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        createUser({ variables: { firstName: firstName.value, lastName: lastName.value } })
        firstName.value = ''
        lastName.value = ''
        email.value = ''
      }}>
        <input ref={node => firstName = node} placeholder='First Name'/>
        <input ref={node => lastName = node} placeholder='Last Name'/>
        <input ref={node => email = node} placeholder='Email' type='email'/>
        <button type="submit">Create User</button>
      </form>
    </div>
  )
}