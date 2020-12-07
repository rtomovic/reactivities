import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => {
      resolve(response);
    }, ms)
  );

const request = {
  get: async (url: string) =>
    await axios.get(url).then(sleep(1000)).then(responseBody),
  post: async (url: string, body: {}) =>
    await axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: async (url: string, body: {}) =>
    await axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: async (url: string) =>
    await axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Activities = {
  list: async (): Promise<IActivity[]> => await request.get("/activities"),
  details: async (id: string): Promise<IActivity> =>
    await request.get(`/activities/${id}`),
  create: async (activity: IActivity) =>
    await request.post("/activities", activity),
  update: async (activity: IActivity) =>
    await request.put(`/activities/${activity.id}`, activity),
  delete: async (id: string) => await request.del(`/activities/${id}`),
};

export default {
  Activities,
};
