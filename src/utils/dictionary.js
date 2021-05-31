let DICTIONARY = {}
let givenWords = {}


export const loadDictionary = async (minLength, maxLength)=>{
  const wordArray = await (await fetch('/data/dictionary.json')).json();
  DICTIONARY = wordArray.reduce((acc, word) => {
    const length = word.length;

    if (length < minLength || length > maxLength) { //only serving 4-12characters words
      return acc;
    }

    if (acc[length]) {
      acc[length].push(word);
    }
    else {
      acc[length] = [word];
    }

    return acc;

  }, {})

  return DICTIONARY;
} 

export const getRandomWordFromDictionary = (length)=>{
  const words = DICTIONARY[length];

  if(!words){
    return null;
  }

  const randomIndex = parseInt(Math.random() * words.length);
  const word = words[randomIndex];
  if(givenWords[word]){
    return getRandomWordFromDictionary(length);
  }
  givenWords[word] = true;
  return word;
}
