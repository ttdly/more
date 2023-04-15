export const viewerInfo = `
query{
  viewer{
    login
    name
    avatarUrl
  }
}
`;

export const searchBase = (typeQuery) => {
  return `
query Search($query: String!, $type: SearchType!, $num: Int!, $after: String){
  search(query: $query, type: $type, first: $num, after: $after) {
    nodes {
      ${typeQuery}
    }
    userCount
    wikiCount
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
`;
};

export const searchUser = `
... on User {
  id
  name
  login
  url
}
`;

export const searchRepo = `
... on Repository {
  id
  name
  url
  description
  nameWithOwner
  owner {
    login
  }
}
`;
