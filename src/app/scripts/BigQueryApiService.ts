import axios from 'axios';
import {VALID_TABLE_ROWS} from "../testdata/DataFixtures";
import {Row} from "../Row";

const API_URL = 'http://localhost:8080/bigquery/query';

const HEADERS = {
  'Content-Type': 'application/json',
  'bq-api-token': '',
};

const REQUEST_BODY: Row[] = VALID_TABLE_ROWS;

export async function query(): Promise<void> {
  try {
    const response = await axios.post(API_URL, REQUEST_BODY, {headers: HEADERS},);
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

// To use the function
// query();
