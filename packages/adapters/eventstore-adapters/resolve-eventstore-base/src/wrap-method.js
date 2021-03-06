const wrappedMethod = async (pool, method, wrappedArgs, ...args) => {
  if (pool.disposed) {
    throw new Error('Adapter has been already disposed')
  }

  pool.isInitialized = true
  pool.connectPromiseResolve()
  await pool.connectPromise

  return await method(pool, ...wrappedArgs, ...args)
}

const wrapMethod = (pool, method, ...wrappedArgs) =>
  typeof method === 'function'
    ? wrappedMethod.bind(null, pool, method, wrappedArgs)
    : null

export default wrapMethod
