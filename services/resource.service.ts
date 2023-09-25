import axios from "axios";

export const getAllResources = async () => {
  try {
    const response = await axios(
      `${process.env.SIMCOMPANIES_API_V4}/en/0/encyclopedia/resources/`,
      {
        headers: {
          "sec-ch-ua":
            '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("torrroto", error);
  }
};
