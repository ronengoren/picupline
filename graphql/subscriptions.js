// @flow
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
