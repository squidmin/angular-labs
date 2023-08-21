import axios from 'axios';
import {Row} from "../Row";

const API_URL = 'http://localhost:8080/bigquery/query';

export async function query(bigQueryApiToken: string, requestBody: object[]): Promise<void> {
  try {
    let requestItems: object[] = buildRequestItems(requestBody);
    const response = await axios.post(API_URL, {body: requestItems}, {
      headers: {
        'Content-Type': 'application/json',
        'bq-api-token': bigQueryApiToken,
      }
    },);
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

function buildRequestItems(requestBody: object[]): object[] {
  let requestItems: object[] = [];
  requestBody.forEach((requestItem: Row) => {
    let row: any = {};
    Object.keys(requestItem).forEach((key: string) => {
      switch (key) {
        case '':
          row[key] = null;
          break;
        case 'id':
          row[key] = requestItem.id;
          break;
        case 'creation_timestamp':
          row[key] = requestItem.creation_timestamp;
          break;
        case 'last_update_timestamp':
          row[key] = requestItem.last_update_timestamp;
          break;
        case 'column_a':
          row[key] = requestItem.column_a;
          break;
        case 'column_b':
          row[key] = requestItem.column_b;
          break;
        case 'field_added_with_update':
          row[key] = requestItem.field_added_with_update;
          break;
        default:
          console.log('Key not found:', key);
      }
    });
    requestItems.push(row);
  });
  requestItems = requestItems.filter((requestItem: Row) => {
    return !Object.values(requestItem).every(value => value === null)
  });
  return requestItems;
}
