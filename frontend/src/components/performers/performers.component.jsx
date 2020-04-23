import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Wrapper from '../shared/wrapper.component';
import { GET_CATEGORIES } from '../categories/categories.component';

/**
 * The description about my thinking for more improvments, fixes, testing etc, are exacty the same for this component as for the auth component
 * Components so far are nearly same and they follow very similar structure that can be reduced to very wrapped smaller components that can be reused
 * For more about the ideas I shared check the auth.component.jsx component
 */

const GET_PERFORMERS = gql`
  query getPerformers {
    getPerformers {
      id
      performerName
      performerAge
      categoryName
    }
  }
`;

const CREATE_PERFORMER = gql`
  mutation createPerformer(
    $name: String!
    $age: Int!
    $userId: Int!
    $categoryId: Int!
    $categoryName: String!
  ) {
    createPerformer(
      input: {
        name: $name
        age: $age
        userId: $userId
        categoryId: $categoryId
        categoryName: $categoryName
      }
    ) {
      id
      performerName
      performerAge
      categoryName
    }
  }
`;

const Performers = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [performerName, setPerformerName] = useState('');
  const [performerAge, setPerformerAge] = useState(0);
  const [category, selectCategory] = useState({
    categoryId: 0,
    categoryName: '',
  });

  const {
    data: performers,
    loading: performLoading,
    error: performError,
  } = useQuery(GET_PERFORMERS);
  const {
    data: performerCategories,
    loading: performerCategoriesLoading,
    error: performerCategoriesError,
  } = useQuery(GET_CATEGORIES);

  const [createPerformer] = useMutation(CREATE_PERFORMER, {
    refetchQueries: [{ query: GET_PERFORMERS }],
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
    const userId = Number(localStorage.getItem('id'));
    createPerformer({
      variables: {
        name: performerName,
        age: performerAge,
        userId,
        categoryId:
          performerCategories?.getPerformersCategories?.length === 1
            ? performerCategories?.getPerformersCategories[0].id
            : category.categoryId,
        categoryName:
          performerCategories?.getPerformersCategories?.length === 1
            ? performerCategories?.getPerformersCategories[0].name
            : category.categoryName,
      },
    });
  };

  if (performLoading || performerCategoriesLoading) return <p>Loading...</p>;
  if (performError || performerCategoriesError)
    return (
      <p>{JSON.stringify(performError || performerCategoriesError, null, 2)}</p>
    );

  return (
    <>
      <Wrapper>
        <div>
          <h2>Performers</h2>
          <ul style={{ listStyleType: 'none' }}>
            {performers?.getPerformers?.map((performer) => (
              <div key={performer.id}>
                <p>
                  <label>PerformerName: </label>
                  {performer.performerName}
                </p>
                <p>
                  <label>PerformerAge: </label>
                  {performer.performerAge}
                </p>
                <p>
                  <label>CategoryName: </label>
                  {performer.categoryName}
                </p>
                <hr width='20%' />
              </div>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            PerformerName:{' '}
            <input
              type='text'
              value={performerName}
              onChange={(e) => setPerformerName(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            PerformerAge:{' '}
            <input
              type='number'
              min='1'
              value={performerAge}
              onChange={(e) => setPerformerAge(Number(e.target.value))}
            />
          </label>
          <br />
          <br />
          <label>
            Choose category:{' '}
            <select
              value={category.categoryName}
              onChange={(evt) => selectCategory(JSON.parse(evt.target.value))}
            >
              {performerCategories?.getPerformersCategories?.map((category) => (
                <option
                  key={category.id}
                  value={JSON.stringify({
                    categoryId: category.id,
                    categoryName: category.name,
                  })}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          <br />
          <input type='submit' value='Add Performer' />
        </form>
        <br />
        {errorMessage ? <div>{errorMessage}</div> : ''}
      </Wrapper>
    </>
  );
};

export default Performers;
