import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Wrapper from '../shared/wrapper.component';

/**
 * This memo here is not just for this component, but overall thinking for improvments for other two components categories and performers, because there are very similar
 * The auth component is more like home route when the admin can open and login the page
 * There are place for improvments from state hooks point, to have more compact structure or object in one place instead of multiple states top-down
 * Refactoring of this component in more reusable way, like the form, input etc...
 * Hooks for query and mutation can be refactored as custom hooks to have more reusable structure across different components now and tommorow
 * So overall one component more like engine where we pass queries and mutation and execute those, also connected with local state if needed
 * Local state from apollo is not used, because I'm leveraring react hooks and in place state, but as the problem more for shared state, grow apollo state or some other way redux or xstate
 * Unit testing of course can be done on react hooks checking the local state, the button when we toggling something on and off(login, logout here...), the <ul/> where we map array of elements or maybe is empty
 * Unit testing the error message returning if error happens, testing if some parts of the components, also mocking the hooks from apollo provider etc...
 */

const LOGIN_ADMIN = gql`
  query loginAdmin($password: String!, $email: String) {
    loginAdmin(input: { email: $email, password: $password }) {
      id
      email
    }
  }
`;
const Auth = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logout, setLogout] = useState(
    localStorage.getItem('login') === 'true'
  );

  const [loginForm, { loading, error }] = useLazyQuery(LOGIN_ADMIN, {
    onCompleted: (data) => localStorage.setItem('id', data.loginAdmin.id),
    onError: (error) =>
      setErrorMessage(
        error.message.toLowerCase().replace('graphql error:', '')
      ),
  });

  const logoutUser = () => {
    localStorage.setItem('login', 'false');
    setLogout(localStorage.getItem('login') === 'true');
    localStorage.removeItem('id');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    loginForm({
      variables: { email, password },
    });
    localStorage.setItem('login', 'true');
    setLogout(localStorage.getItem('login') === 'true');
  };

  console.log('2342332234', error);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Invalid username and password...</p>;

  return (
    <>
      <Wrapper>
        <h1>Login:</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Email:{' '}
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Password:{' '}
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />
          <input type='submit' value='Login' disabled={logout} />
        </form>
        <br />
        {logout ? <button onClick={() => logoutUser()}>Logout</button> : ''}
        <br />
        {errorMessage ? <div>{errorMessage}</div> : ''}
      </Wrapper>
    </>
  );
};

export default Auth;
