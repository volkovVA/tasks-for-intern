import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decoded(encoded, translations) {
  const excludedKeys = ["groupId", "service", "formatSize", "ca"];
  const uniqueIds = new Set();

  const decodedData = encoded.map(obj => {
    const decodedObj = {};

    for (const key in obj) {
      if (key.endsWith("Id") && !excludedKeys.includes(key)) {
        const decodedValue = translations[obj[key]];
        if (decodedValue) {
          decodedObj[key] = decodedValue;
        }
      } else {
        decodedObj[key] = obj[key];
      }

      if (key.endsWith("Id")) {
        uniqueIds.add(key);
      }
    }

    return decodedObj;
  });

  return { decodedData, uniqueIds: Array.from(uniqueIds) };
}

const { decodedData, uniqueIds } = decoded(encoded, translations);
console.log("Раскодированные данные:", decodedData);
console.log("Уникальные id:", uniqueIds);
