import axiosClient from './axiosClient';

const taskApi = {
  createTask: (boardID, params) => axiosClient.post(`boards/${boardID}/tasks`, params),
  updatePosition: (boardID, params) => axiosClient.put(`boards/${boardID}/tasks/position`, params),
  deleteTask: (boardID, taskID) => axiosClient.delete(`boards/${boardID}/tasks/${taskID}`),
  updateTask: (boardID, taskID, data) => axiosClient.put(`boards/${boardID}/tasks/${taskID}`, data),
};

export default taskApi;
