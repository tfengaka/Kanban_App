import axiosClient from './axiosClient';

const boardApi = {
  createBoard: () => axiosClient.post('boards'),
  getAllBoards: () => axiosClient.get('boards'),
  updatePosition: (boards) => axiosClient.put('boards', boards),
};

export default boardApi;
