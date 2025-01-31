import { nodeApiAxiosTaff } from "./appAxios";
import { tokenFunc } from "./tokenService";
export const listService = async (params) => {
  try {
    const { data, status, statusText } = await nodeApiAxiosTaff.get(`/tasks`, {
      params,
      headers: {
        Authorization: await tokenFunc(),
      },
    });
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
export const createService = async (body) => {
  try {
    const { data, status, statusText } = await nodeApiAxiosTaff.post(
      `/tasks`,
      body,
      {
        headers: {
          Authorization: await tokenFunc(),
        },
      }
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
export const updateService = async (id, body) => {
  try {
    const { data, status, statusText } = await nodeApiAxiosTaff.put(
      `/tasks/${id}`,
      body,
      {
        headers: {
          Authorization: await tokenFunc(),
        },
      }
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
export const getByIdService = async (id) => {
  try {
    const { data, status, statusText } = await nodeApiAxiosTaff.get(
      `/tasks/${id}`,
      {
        headers: {
          Authorization: await tokenFunc(),
        },
      }
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
export const deleteService = async (id) => {
  try {
    const { data, status, statusText } = await nodeApiAxiosTaff.delete(
      `/tasks/${id}`,
      {
        headers: {
          Authorization: await tokenFunc(),
        },
      }
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
