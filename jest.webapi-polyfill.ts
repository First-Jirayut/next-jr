// jest.webapi-polyfill.ts
import { TextEncoder, TextDecoder } from 'util';

// Polyfill Web API (Request, Response, Headers) for Next.js in Jest
if (typeof global.Request === 'undefined') {
  const { Request, Response, Headers, fetch } = require('node-fetch');
  global.Request = Request;
  global.Response = Response;
  global.Headers = Headers;
  global.fetch = fetch;
}

// Polyfill TextEncoder/TextDecoder for jsdom
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
