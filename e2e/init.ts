import detox, { cleanup, init } from 'detox';
const adapter = require('detox/runners/jest/adapter');
const config = require('../package.json').detox;
const specReporter = require("detox/runners/jest/specReporter");

jest.setTimeout(120000);
//@ts-ignore
jasmine.getEnv().addReporter(adapter);
// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
//@ts-ignore
jasmine.getEnv().addReporter(specReporter);

beforeAll(async () => {
  await init(config);
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});