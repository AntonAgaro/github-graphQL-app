const fetchData = () => {
  fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: 'token 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',
      Accept: 'application/json',
      'User-Agent': 'request',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({query: '{user(login: "AntonAgaro"){login}}'}),
  })
    .then(res => res.json())
    .then(res => console.log(res.data));
}

export default fetchData;
