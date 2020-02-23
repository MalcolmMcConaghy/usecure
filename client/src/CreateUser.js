import React, {useRef, Fragment} from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

import './App.css'

const CREATE_USER = gql`
    mutation createUser($firstName: String!, $lastName: String!, $email: String!) {
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
const CreateUser = ({refetch}) => {
  let firstName = useRef(null);
  let lastName = useRef(null);
  let email = useRef(null);
  const [createUser] = useMutation(CREATE_USER)

  return (
    <Fragment>
      <form onSubmit={e => {
        e.preventDefault()
        createUser({ variables: { firstName: firstName.current.value, lastName: lastName.current.value, email: email.current.value } })
        firstName.current.value = ''
        lastName.current.value = ''
        email.current.value = ''
        refetch()
      }}>
        <input ref={firstName} placeholder='First Name'/>
        <input ref={lastName} placeholder='Last Name'/>
        <input ref={email} placeholder='Email' type='email'/>
        <button className="button button--create" type="submit">Create User</button>
      </form>
    </Fragment>
  )
}

export default CreateUser
