import update from '@madappgang/update-by-path';
import types from './types';

export const CONNECTION_ESTABLISHED = 'connection_established';
export const CONNECTION_FAILED = 'connection_failed';

const INITIAL_STATE = {
  checking: false,
  state: CONNECTION_FAILED,
};

const reducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
    case types.TEST_CONNECTION_ATTEMPT:
      return update(state, 'checking', true);
    case types.TEST_CONNECTION_SUCCESS:
      return update(state, {
        checking: false,
        state: CONNECTION_ESTABLISHED,
      });
    case types.TEST_CONNECTION_FAILURE:
      return update(state, {
        checking: false,
        state: CONNECTION_FAILED,
      });
    default:
      return state;
  }
};

export default reducer;
