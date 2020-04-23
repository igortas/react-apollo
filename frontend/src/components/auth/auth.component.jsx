import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Wrapper from '../shared/wrapper.component';

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

  const [loginForm, { data, loading, error }] = useLazyQuery(LOGIN_ADMIN, {
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
      {data?.loginAdmin && localStorage.setItem('id', data.loginAdmin.id)}
    </>
  );
};

export default Auth;
