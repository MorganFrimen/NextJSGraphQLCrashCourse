import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { API_URL } from '../../urls';

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const search = req.body;
  try {
    const { data } = await client.query({
      query: gql`
            query{
                characters(filter: {name:"${search}"}){
                  info{
                    pages
                    count
                  }
                  results{
                    name
                    id
                    location{
                      name
                      id
                    }
                    origin{
                      id
                      name
                    }
                    episode{
                      episode
                      id
                      air_date
                    }
                    image
                  }
                }
              }
            `,
    });
    res.status(200).json({ characters: data.characters.results, error: null });
  } catch (error) {
    if (error.message === '404 Not found') {
      res.status(404).json({ characters: null, error: 'No Characters Found' });
    } else {
      res.status(500).json({ characters: null, error: 'Internal Error, please try again' });
    }
  }
};
