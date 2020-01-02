import { prepareData, renderData } from "./solution";
import { makeRequest, API_URL } from "./utils";

makeRequest(API_URL)
  .then(function(item) {
    renderData(prepareData(JSON.parse(item.response)));
  })
  .catch(function(error) {
    console.log("Something went wrong", error);
  });
