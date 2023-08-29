import axios from 'axios';
import {ExampleRequestItem} from '../types/ExampleRequestItem';

const API_URL: string = 'http://localhost:8080/bigquery/query';

export async function query(bigQueryApiToken: string, requestBody: object[]) {
  try {
    let requestItems = buildRequestItems(requestBody);
    return await axios.post(API_URL, {body: requestItems}, {
      headers: {
        'Content-Type': 'application/json',
        'bq-api-token': bigQueryApiToken,
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

function buildRequestItems(requestBody: object[]): object[] {
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
          const creationTimestampMonth: string = formatNumber(creationTimestampDate.getMonth() + 1);
          const creationTimestampDay: string = formatNumber(creationTimestampDate.getDate());
          row[key] = `${creationTimestampDate.getFullYear()}-${creationTimestampMonth}-${creationTimestampDay}T00:00:00`;
          break;
        case 'last_update_timestamp':
          const lastUpdateTimestamp: object = requestItem[key];
          const lastUpdateTimestampDate: Date = lastUpdateTimestamp as Date;
          const lastUpdateTimestampMonth: string = formatNumber(lastUpdateTimestampDate.getMonth() + 1);
          const lastUpdateTimestampDay: string = formatNumber(lastUpdateTimestampDate.getDate());
          row[key] = `${lastUpdateTimestampDate.getFullYear()}-${lastUpdateTimestampMonth}-${lastUpdateTimestampDay}T00:00:00`;
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
    return !Object.values(requestItem).every(value => value === null)
  });
  return requestItems;
}

const formatNumber = (num: number): string => {
  return num < 10 ? '0' + num : '' + num;
};
