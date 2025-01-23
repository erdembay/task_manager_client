import { nodeApiAxiosTaff } from "./appAxios";
export const loginService = async (body) => {
  try {
    const { data, status, statusText } = await nodeApiAxiosTaff.post(
      `/auth/login`,
      body
    );
    if (!data)
      return {
        status: false,
        statusCode: status,
        message: statusText,
        data: null,
      };
    return { status: true, statusCode: status, message: statusText, data };
  } catch (error) {
    return {
      status: false,
      statusCode: error?.response?.status || 500,
      message: error?.response?.data?.error?.message || error?.message,
      data: null,
    };
  }
};
export const registerService = async (body) => {
  try {
    const { data, status, statusText } = await nodeApiAxiosTaff.post(
      `/auth/register`,
      body
    );
    if (!data)
      return {
        status: false,
        statusCode: status,
        message: statusText,
        data: null,
      };
    return { status: true, statusCode: status, message: statusText, data };
  } catch (error) {
    return {
      status: false,
      statusCode: error?.response?.status || 500,
      message: error?.response?.data?.error?.message || error?.message,
      data: null,
    };
  }
};
