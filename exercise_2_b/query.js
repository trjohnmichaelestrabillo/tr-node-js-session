const CONNECTION_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'exercise2_db',
    // The maximum number of connections to create at once. (Default: 10)
    connectionLimit: 10,
    // Determines the pool's action when no connections are available and the limit
    // has been reached. If true, the pool will queue the connection request and call
    // it when one becomes available. If false, the pool will immediately call back
    // with an error. (Default: true)
    waitForConnections: true,
    // The maximum number of connection requests the pool will queue before returning
    // an error from getConnection. If set to 0, there is no limit to the number of
    // queued connection requests. (Default: 0)
    // See https://www.w3resource.com/node.js/nodejs-mysql.php
    queueLimit: 0,
    // Allow multiple mysql statements per query. Be careful with this, it exposes you
    // to SQL injection attacks. (Default: false)
    multipleStatements: false,
    // Generates stack traces on Error to include call site of library entrance ("long stack traces").
    // Slight performance penalty for most calls. Default is true.
    trace: true,
  }
  
  let promisePool = null
  
  async function checkPool() {
    if (promisePool) {
      return
    }
  
    try {
      const mysql = require('mysql2')
  
      const pool = mysql.createPool({ ...CONNECTION_CONFIG })
  
      // During post, the object fields are used as column names.
      // See https://github.com/sidorares/node-mysql2/pull/369
      pool.config.namedPlaceholders = true
      pool.config.connectionConfig.namedPlaceholders = true
      promisePool = pool.promise()
    } catch (error) {
      console.log(`Could not connect - ${error}`)
      // return
      throw error
    }
  }
  
  async function query(dbQuery, params = []) {
    // Check we have no undefined bind parameters, because they create
    // a nasty exception that somehow doesn't get caught by the catch here.
    for (let i = 0; i < params.length; i++) {
      if (params[i] === undefined) {
        throw new Error(`Bind parameter must not be undefined [index=${i}]`)
      }
    }
  
    await checkPool()
  
    const [rows, fields] = await promisePool.query(dbQuery, params)
  
    return rows
  }
  
  module.exports = query