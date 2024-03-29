import axios from 'axios';
import {ExampleRequestItem} from '../types/ExampleRequestItem';

const API_URL: string = 'http://localhost:8080/bigquery/query';

export async function query(gcpToken: string, requestBody: object[]) {
  try {
    let requestItems = buildSubqueries(requestBody);
    return await axios.post(API_URL, {subqueries: requestItems}, {
      headers: {
        'Content-Type': 'application/json',
        'gcp-token': gcpToken,
      }
    },);
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
  return undefined;
}

function buildSubqueries(requestBody: object[]): object[] {
  let requestItems: object[] = [];
  requestBody.forEach((requestItem: any) => {
    let row: any = {};
    Object.keys(requestItem).forEach((key: string) => {
      switch (key) {
        case 'id':
          row[key] = requestItem.id;
          break;
        case 'creation_timestamp':
          const creationTimestamp: object = requestItem[key];
          const creationTimestampDate: Date = creationTimestamp as Date;
          row[key] = creationTimestampDate;
          break;
        case 'last_update_timestamp':
          const lastUpdateTimestamp: object = requestItem[key];
          const lastUpdateTimestampDate: Date = lastUpdateTimestamp as Date;
          row[key] = lastUpdateTimestampDate;
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
  requestItems = requestItems.filter((requestItem: ExampleRequestItem) => {
    return !Object.values(requestItem).every(value => value === null);
  });
  return requestItems;
}
