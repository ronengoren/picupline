/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
