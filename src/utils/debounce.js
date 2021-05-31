export default function debounceFunc(func, timeInMS=500){
  let timeout;
  return (...args)=>{
    timeout && clearTimeout(timeout);
    timeout = setTimeout(()=>{
      func(...args);
    }, timeInMS)  
  }
}