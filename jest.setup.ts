import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Fix: Next.js 13+ uses Web Fetch APIs like Request, Response
if (typeof global.Request === 'undefined') {
  const { Request, Response, Headers, fetch } = require('node-fetch');
  global.Request = Request;
  global.Response = Response;
  global.Headers = Headers;
  global.fetch = fetch;
}

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
