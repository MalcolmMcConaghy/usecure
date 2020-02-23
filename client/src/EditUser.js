import React, {useRef, Fragment, useEffect} from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

import './App.css'

const GET_USER = gql`
  query getUser($id: ID!) {
      user(id: $id) {
          firstName
          lastName
          email
      }
  }
`

const EDIT_USER = gql`
    mutation editUser($id: ID!, $firstName: String!, $lastName: String!, $email: String!) {
        editUser(id: $id, firstName: $firstName, lastName: $lastName, email: $email) {
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
const EditUser = ({id, listRefetch}) => {
  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { id }
  })
  const [editUser] = useMutation(EDIT_USER)
  let firstName = useRef(null);
  let lastName = useRef(null);
  let email = useRef(null);

  useEffect(() =>  {
    if (id) {
      console.log(id)
      refetch()
    }
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  console.log(data.user);

  return (
    <Fragment>
      <form onSubmit={e => {
        e.preventDefault()
        editUser({ variables: { id, firstName: firstName.current.value, lastName: lastName.current.value, email: email.current.value } })
        firstName.current.value = ''
        lastName.current.value = ''
        email.current.value = ''
        listRefetch()
        refetch()
      }}>
        <input ref={firstName} defaultValue={data.user.firstName} placeholder='First Name'/>
        <input ref={lastName} defaultValue={data.user.lastName} placeholder='Last Name'/>
        <input ref={email} defaultValue={data.user.email} placeholder='Email' type='email'/>
        <button className="button button--update" type="submit">Update User</button>
      </form>
    </Fragment>
  )
}

export default EditUser
