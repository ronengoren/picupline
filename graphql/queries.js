/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      description
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
      _version
      _deleted
      _lastChangedAt
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
        name
        description
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
