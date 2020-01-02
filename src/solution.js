import { filterData, KEY_VALUE_SPACED } from "./utils";

const prepare = data => {
  let filteredData = filterData(data);
  return filteredData;
};

const output = data => {
  let outputText = [];
  outputText.push(`[`);
  let length = data.length;
  let i = 0;
  for (const item of data) {
    i++;
    outputText.push(` {`);
    let keys = Object.keys(item).length;
    let j = 0;
    for (const property in item) {
      j++;
      const key = property;
      const value = item[key];
      if (j < keys) {
        if (typeof value === "string") {
          outputText.push(`   "${key}": "${value}",`);
        } else {
          outputText.push(`   "${key}": ${value},`);
        }
      } else {
        if (typeof value === "string") {
          outputText.push(`   "${key}": "${value}"`);
        } else {
          outputText.push(`   "${key}": ${value}`);
        }
      }
    }
    if (i < length) {
      outputText.push(` },`);
    } else {
      outputText.push(` }`);
    }
  }
  outputText.push(`]`);
  outputText = outputText.join("\n");

  document.getElementById("out").innerHTML = outputText;
};

module.exports = {
  prepareData: prepare,
  renderData: output
};
