import axios from "axios";

export const getAllExchages = async () => {
  try {
    //today
    const actualTick = new Date();
    //yesterday (today -1)
    const yesterdayTick = new Date(actualTick);
    yesterdayTick.setDate(actualTick.getDate() - 1);

    //formating the dat for the api
    const formattedTick = yesterdayTick.toISOString();

    const response = await axios.get(
      `${process.env.SIMCOMPANIES_API_V2}/market-ticker/0/${formattedTick}`,
      {
        headers: {
          "sec-ch-ua":
            '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
        },
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    // console.error(error);
  }
};
