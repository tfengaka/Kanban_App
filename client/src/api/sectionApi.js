import axiosClient from './axiosClient';

const sectionApi = {
  createSection: (boardID) => axiosClient.post(`boards/${boardID}/sections`),
  updateSelection: (boardID, sectionID, data) => axiosClient.put(`boards/${boardID}/sections/${sectionID}`, data),
  deleteSection: (boardID, sectionID) => axiosClient.delete(`boards/${boardID}/sections/${sectionID}`),
};

export default sectionApi;
