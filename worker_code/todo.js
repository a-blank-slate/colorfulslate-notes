addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request))
})

const defaultData = []
const cacheKey = KV_NAME;
const setCache = (key, data) => KV.put(key, data)
const getCache = key => KV.get(key)

  const myHeaders = new Headers();
    myHeaders.set("Access-Control-Allow-Origin", '*');
    myHeaders.set("Access-Control-Allow-Methods", "GET,OPTIONS,PUT");
    myHeaders.set("Access-Control-Max-Age", "86400",);
    myHeaders.set("Access-Control-Allow-Headers", "hackingCode",);

async function handleRequest(request) {
   if (request.method === 'PUT') {
    return updateTodos(request)
  } if (request.method === 'GET') {
    return getTodos(request)
  }
    return new Response(("OK"), {status: 200, headers: myHeaders}) 
}

async function getTodos(request) {
  if(verifyHeader(request)){
      return new Response('Unauthorized', { status: 401 , headers : myHeaders})
  }
  let data
  const cache = await getCache(cacheKey)
  if (!cache) {
    await setCache(cacheKey, JSON.stringify(defaultData))
    data = defaultData
  } else {
    data = JSON.parse(cache)
  }
  return new Response(data, {
    headers: myHeaders,
  })
}

async function updateTodos(request) {
    if(verifyHeader(request)){
      return new Response('Unauthorized', { status: 401 , headers : myHeaders})
  }
  const body = await request.text()
  try {
    await setCache(cacheKey, JSON.stringify(body))
    const data = {result: 'OK'};
    const json = JSON.stringify(data, null, 2);
    return new Response(json, { status: 200 , headers : myHeaders})
  } catch (err) {
    return new Response(err, { status: 500 , headers : myHeaders})
  }
}

function verifyHeader(request){
    
   if(!request.headers.has('hackingCode')){
       return true;
   } if(request.headers.get('hackingCode') != HACKING_CODE){
      return true;
   }
   return false;
}
