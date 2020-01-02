// api end point
export const API_URL = "https://api.spacexdata.com/v3/launches/past";
const LAUNCH_YEAR = "2018";
// generic function to get the api result
export const makeRequest = function(url, method) {
  var request = new XMLHttpRequest();

  return new Promise(function(resolve, reject) {
    request.onreadystatechange = function() {
      if (request.readyState !== 4) return;
      if (request.status >= 200 && request.status < 300) {
        resolve(request);
      } else {
        reject({
          status: request.status,
          statusText: request.statusText
        });
      }
    };
    request.open(method || "GET", url, true);
    request.send();
  });
};

// main method to filter out the data with sorting
export const filterData = data => {
  let filteredData = [];

  if (data && data.length > 0) {
    filteredData = data.reduce((acc, item) => {
      const {
        launch_year,
        rocket,
        flight_number,
        mission_name,
        launch_date_utc
      } = item;
      // get the payload
      const {
        second_stage: { payloads }
      } = rocket;

      if (launch_year === LAUNCH_YEAR && checkPayload(payloads)) {
        acc.push({
          flight_number,
          mission_name,
          payloads_count: payloads.length,
          date: Date.parse(launch_date_utc)
        });
      }
      return acc;
    }, []);
  }
  // filteredData filtered data
  const sortedData = sortData(filteredData);
  const finalData = removeDate(sortedData);
  return finalData;
};
// filter based on nasa
export const checkPayload = payloads => {
  for (const payload of payloads) {
    const { customers } = payload;
    for (const customer of customers) {
      if (customer.indexOf("NASA") !== -1) return true;
    }
  }
  return false;
};

// sort data
const sortData = data => {
  if (data && data.length > 0) {
    data.sort((first, second) => {
      if (first.payloads_count > second.payloads_count) {
        return -1;
      } else {
        if (first.payloads_count < second.payloads_count) {
          return 1;
        } else {
          return first.date < second.date ? 1 : -1;
        }
      }
    });
  }

  return data;
};

// remove date from object
const removeDate = data => {
  for (const item of data) {
    delete item.date;
  }
  return data;
};
