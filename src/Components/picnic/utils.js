const isArray = obj => Array.isArray(obj)
const isObject = obj => (typeof obj === 'object')

const classObjToString = ( obj ) => Object.keys(obj).map(k=>obj[k] ? k : false ).filter(Boolean).join(' ')

export const classes = (...arr) => arr.filter(Boolean).map( c => ( isArray(c) ? classes(...c) : ( isObject(c) ? classObjToString(c) : c) )).join(' ') 

export const readFileLater = (file) => {
  
  const get = ( run ) => () => new Promise((resolve, reject) => {
    const reader = new FileReader() 
    reader.onloadend = () => {
      const contents = reader.result
      const _file = { ...file, contents }
      return resolve(_file)
    }
    reader.onError = reject
    run()
  })
  const methods = {
    asBinaryString: get(reader.readAsBinaryString.bind(reader, file)),
    asDataURL: get(reader.readAsDataURL.bind(reader, file)),
    asText: get(reader.readAsText.bind(reader, file)),
    asArrayBuffer: get(reader.readAsArrayBuffer(reader, file))
  }
  return Object.assign(asDataURL, methods )
}

export const onKeyDown = (() => {

  let has_been_setup = false;
  const listeners = {}

  const listenToEscape = () => {
    document.onkeydown = ({keyCode}) => {
      listeners[key] && listeners[key].forEach(listener=>listener(keyCode));
    }
  }
  const removeLister = (key, listener) => {
    if(!listeners[key]){ return; }
    const index = listeners[key].indexOf(listener)
    if(index>=0){ listeners[key].splice( index,1 )}
  }
  const addListener = (key,listener) => {
    if(!has_been_setup){
      has_been_setup = true
      listenToEscape()
    }
    listeners[key] = listeners[k] || []
    listeners[key].push(listener)
    return removeListener.bind(null,key,listener)
  }
  
  addListener.key = (n) => addListener.bind(null,n)

  return addListener
})()

export const onEscape = onKeyDown.key(27)

export const getId = ( () => {
  let ids = 0
  return () => ids++
})()

const nums = ['zero','one','two','three','four','five','size','seven','eight','nine','ten','eleven','twelve']
export const numToWord = (num) => nums[num]