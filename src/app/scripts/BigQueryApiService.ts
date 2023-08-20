import axios from 'axios';

const API_URL = 'http://localhost:8080/bigquery/query';

export async function query(bigQueryApiToken: string, requestBody: object[]): Promise<void> {
  const HEADERS = {
    'Content-Type': 'application/json',
    'bq-api-token': bigQueryApiToken,
  };
  try {
    // const request = { body: REQUEST_BODY };
    const request = {body: requestBody};
    const response = await axios.post(API_URL, request, {headers: HEADERS},);
    console.log(response.data);
  } catch (error: any) {
    console.error('Error calling the API', error);
    if (error.response) {
      console.error('Server responded with an error status:', error.response.data);
    } else if (error.request) {
      console.error('No response was received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
  }
}
