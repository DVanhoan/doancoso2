import { apiRequest } from '../../utils/apiRequest';

export const fetchJobs = () => async (dispatch) => {
  dispatch({ type: 'FETCH_JOBS_REQUEST' });
  try {
    const response = await apiRequest.get('/jobs');
    dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_JOBS_FAILURE', payload: error.response.data.message });
  }
};
