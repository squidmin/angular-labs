import axios from 'axios';
import {Row} from "../Row";

const API_URL = 'http://localhost:8080/bigquery/query';

export async function query(bigQueryApiToken: string, requestBody: object[]): Promise<void> {
  const HEADERS = {
    'Content-Type': 'application/json',
    'bq-api-token': bigQueryApiToken,
  };
  try {
    let requestItems: object[] = [{}];
    requestBody.forEach((requestItem: object) => {
      let row: any = {};
      Object.keys(requestItem).forEach((key: string) => {
        if ("" === key) {
          row[key] = null;
        }
      });
      requestItems.push(row);
    });
    requestItems = requestItems.filter((requestItem: Row) => {
      return requestItem.id !== null &&
        requestItem.creation_timestamp !== null &&
        requestItem.last_update_timestamp !== null &&
        requestItem.column_a !== null &&
        requestItem.column_b !== null;
    });
    console.log("REQUEST_BODY ==", JSON.stringify({body: requestBody}));
    const response = await axios.post(API_URL, {body: requestBody}, {headers: HEADERS},);
    console.log(response);
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
