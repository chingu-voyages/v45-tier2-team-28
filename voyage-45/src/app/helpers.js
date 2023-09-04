const fetchLocationData = async (batchData, geoAPi) => {
    const sendData = {
      api: "/v1/geocode/reverse",
      params: {
        lang: "en",
        limit: "10",
      },
      inputs: batchData,
    };
    try {
      const baseUrl = `https://api.geoapify.com/v1/batch?apiKey=${geoAPi}`;
      
      fetch(baseUrl, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
        .then(getBodyAndStatus)
        .then((result) => {
          if (result.status !== 202) {
            return Promise.reject(result);
          } else {
            return getAsyncResult(
              `${baseUrl}&id=${result.body.id}`,
              5000,
              100
            ).then((queryResult) => {
              console.log(queryResult);
              return queryResult;
            });
          }
        })
        .catch((err) => console.log(err));

        function getBodyAndStatus(response) {
          return response.json().then((responceBody) => {
            return {
            status: response.status,
            body: responceBody,
          };
        });
      }

      function getAsyncResult(url, timeout, maxAttempt) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            repeatUntilSuccess(resolve, reject, 0);
          }, timeout);
        });

        function repeatUntilSuccess(resolve, reject, attempt) {
          console.log("Attempt: " + attempt);
          fetch(url)
            .then(getBodyAndStatus)
            .then((result) => {
              if (result.status === 200) {
                resolve(result.body);
              } else if (attempt >= maxAttempt) {
                reject("Max amount of attempt achived");
              } else if (result.status === 202) {
                // Check again after timeout
                setTimeout(() => {
                  repeatUntilSuccess(resolve, reject, attempt + 1);
                }, timeout);
              } else {
                // Something went wrong
                reject(result.body);
              }
            })
            .catch((err) => reject(err));
        }
      }
    } catch (error) {
      console.error("Error fetching location data", error);
      return "Unknown";
    }
  };

  export default fetchLocationData;