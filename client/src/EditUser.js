import React, {Fragment, useEffect, useState} from 'react'
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() =>  {
    if (id) {
      refetch()
    }

    if (data) {
      setFirstName(data.user.firstName)
      setLastName(data.user.lastName)
      setEmail(data.user.email)
    }
  }, [id, data, refetch])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  console.log(data.user);

  return (
    <Fragment>
      <form onSubmit={e => {
        e.preventDefault()
        editUser({ variables: { id, firstName: firstName, lastName: lastName, email: email } })
        listRefetch()
        refetch()
      }}>
        <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='First Name' type='text' />
        <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Last Name' type='text' />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type='email'/>
        <button className="button button--update" type="submit">Update User</button>
      </form>
    </Fragment>
  )
}

export default EditUser
