const fetchData = (token, owner, repository) => {
  const body = JSON.stringify(
    {
      query: `{
        repository(owner: "${owner}", name: "${repository}") {
          issues(last: 1000, status: OPEN) {
            edges {
              node {
                title
                author {
                  login
                }
                comments(first: 1000) {
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

  
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/json',
      'User-Agent': 'request',
      'Content-type': 'application/json'
    },
    body: body,
  })
    .then(res => res.json())
    .then(res => console.log(res.data));
}

export default fetchData;
