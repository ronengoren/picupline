// @flow
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      gender
      preferredGender
      dob
      profileImage {
        bucket
        region
        key
      }
      displayname
      aboutMe
      height
      weight
      role
      bodyType
      relationshipStatus
      location
      tribes
      lookingFor
      hivStatus
      alcohol
      diet
      education
      kids
      language
      music
      pets
      smoke
      sport
      tattoos
      likes
      notLike
      superLike
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        gender
        preferredGender
        dob
        displayname
        aboutMe
        height
        weight
        role
        bodyType
        relationshipStatus
        location
        tribes
        lookingFor
        hivStatus
        alcohol
        diet
        education
        kids
        language
        music
        pets
        smoke
        sport
        tattoos
        likes
        notLike
        superLike
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
