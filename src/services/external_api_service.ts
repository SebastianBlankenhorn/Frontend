import axios from "axios";

const callExternalApi = async (options : any) => {
  try {
    const response = await axios(options.config);
    const { data } = response;

    console.log(response)

    return {
      data,
      error: null,
    };
  } catch (error : any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error;

      const { response } = axiosError;

      let message = "http request failed";

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      if (response && response.data && response.data.message) {
        message = response.data.message;
      }

      return {
        data: null,
        error: {
          message,
        },
      };
    }

    return {
      data: null,
      error: {
        message: error.message,
      },
    };
  }
};

export {callExternalApi}