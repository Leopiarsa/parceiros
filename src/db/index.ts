import { Database, Resource } from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import datasource from './data-source.js';

AdminJS.registerAdapter({
  Database,
  Resource,
});

const initialize = async () => {
  await datasource.initialize();

  return { db: datasource };
};

export default initialize;
