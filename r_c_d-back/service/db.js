import mysqlPromise from 'mysql2/promise';
import config from '../dbConfig.js';

async function mysql(sql, params) {
  const connection = await mysqlPromise.createConnection(config.db);
  const [results] = await connection.execute(sql, params);
  return results;
}

export default mysql;
