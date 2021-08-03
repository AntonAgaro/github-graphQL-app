const fetchData = async (token, owner, repository) => {
  const body = JSON.stringify(
    {
      query: `{
        repository(owner: "${owner}", name: "${repository}") {
          issues(last: 100, states: OPEN) {
            edges {
              node {
                title
                bodyText
                url 
                comments(last: 100) {
                  edges {
                    node {
                      bodyText
                    }
                  }
                }
              }
            }
          }
        }
      }`
    }
  )

  
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
      'User-Agent': 'request',
      'Content-type': 'application/json'
    },
    body: body,
  });

  return response;
    
}

export default fetchData;
