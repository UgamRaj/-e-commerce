import axios from "axios";

const BASR_URL = "http://localhost:10000/v1/product/";

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(BASR_URL + url);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
