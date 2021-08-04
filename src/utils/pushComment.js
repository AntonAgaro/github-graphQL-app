const pushComment = async (id, comment, token) => {
  const query = JSON.stringify({
    query: `mutation {
      addComment(input: {
        subjectId: "${id}",
        body: "${comment}",
        clientMutationId: "${comment}"
      }) {
        clientMutationId,
        commentEdge {
          node {
            body
          }
        }
      }
    }`
  });

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',  
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
      'User-Agent': 'request',
      'Content-type': 'application/json'
    },
    body: query
  });
  
  const responseJson = await response.json();
  return  responseJson;
}

export default pushComment;