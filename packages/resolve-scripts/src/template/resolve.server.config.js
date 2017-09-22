import fileDriver from 'resolve-storage-lite';
import busDriver from 'resolve-bus-memory';
import eventTypes from './common/aggregates/todo-events';
import aggregates from './common/aggregates';
import queries from './common/read-models';
import clientConfig from './resolve.client.config.js';

if (module.hot) {
    module.hot.accept();
}

const dbPath = process.env.NODE_ENV === 'production'
    ? './prod.db'
    : process.env.NODE_ENV === 'tests' ? './__test.db' : './dev.db';

export default {
    entries: clientConfig,
    bus: { driver: busDriver },
    storage: {
        driver: fileDriver,
        params: { pathToFile: dbPath }
    },
    initialState: query => query('todos').then(todos => ({ todos })),
    aggregates,
    initialSubscribedEvents: { types: Object.values(eventTypes), ids: [] },
    queries,
    extendExpress: () => {}
};
