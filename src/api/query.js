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

export const repoBaseInfo = `
query queryRepoBaseInfo($id: ID!){
  node(id: $id){
    ... on Repository {
      name
      description
      url
      nameWithOwner
      stargazerCount
      createdAt
      forkCount
      diskUsage
      watchers {
        totalCount
      }
      owner {
        avatarUrl
      }
      defaultBranchRef {
        target {
          ... on Commit {
            history {
              totalCount
            }
          }
        }
      }
    }
  }
}
`;

export const repoStar = `
query repoStart($id: ID!, $after: String) {
  node(id: $id) {
    ... on Repository {
      stargazers(first: 100, orderBy: {field: STARRED_AT, direction: ASC}, after: $after) {
        edges {
          starredAt
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
}`;
