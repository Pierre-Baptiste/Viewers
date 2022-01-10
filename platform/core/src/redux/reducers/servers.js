import uniqBy from 'lodash/uniqBy';

export const defaultState = {
  servers: [],
};

const servers = (state = defaultState, action) => {
  let servers;
  switch (action.type) {
    case 'ADD_SERVER':
      servers = [...state.servers, action.server];
      servers.forEach((s) => (s.active = true));
      return { ...state, servers };

    case 'ACTIVATE_SERVER': {
      const newServer = { ...action.server, active: true };
      const newServers = state.servers;
      newServers.forEach((s) => (s.active = false));
      return {
        ...state,
        servers: uniqBy([...newServers, newServer], 'wadoRoot'),
      };
    }

    case 'SET_SERVERS':
      return { ...state, servers: action.servers };

    default:
      return state;
  }
};

export default servers;
