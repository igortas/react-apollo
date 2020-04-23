import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Wrapper from '../shared/wrapper.component';

export const GET_CATEGORIES = gql`
  query getPerformersCategories {
    getPerformersCategories {
      id
      name
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation createCategory($name: String!) {
    createCategory(input: { name: $name }) {
      id
      name
    }
  }
`;

const Categories = () => {
  const [categoryName, setCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true,
    onError: (error) =>
      setErrorMessage(
        error.message.toLowerCase().replace('graphql error:', 'Current')
      ),
  });

  const isLoggedIn = localStorage.getItem('login') === 'true';

  if (!isLoggedIn) {
    return <Redirect to='/' />;
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    createCategory({ variables: { name: categoryName } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  console.log('data', data);

  return (
    <>
      <Wrapper>
        <div>
          <h2>Categories:</h2>
          <ul style={{ listStyleType: 'none' }}>
            {data?.getPerformersCategories?.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Category:{' '}
            <input
              type='text'
              value={categoryName}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <br />
          <br />
          <input type='submit' value='Add Category' />
        </form>
        {errorMessage ? <div>{errorMessage}</div> : ''}
      </Wrapper>
    </>
  );
};

export default Categories;
