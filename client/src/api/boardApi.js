import axiosClient from './axiosClient';

const boardApi = {
  createBoard: () => axiosClient.post('boards'),
  getAllBoards: () => axiosClient.get('boards'),
  updatePosition: (boards) => axiosClient.put('boards', boards),
  getBoardDetail: (id) => axiosClient.get(`boards/${id}`),
  updateBoardData: (id, data) => axiosClient.put(`boards/${id}`, data),
  getFavoriteBoards: () => axiosClient.get('boards/favorites'),
  updateFavoritePosition: (boards) => axiosClient.put('boards/favorites', boards),
  deleteBoard: (id) => axiosClient.delete(`boards/${id}`),
};

export default boardApi;
