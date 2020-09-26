import {
    updateProfile,
    updateUI,
} from './updateActions';

import { apiConfig } from '../../../../authServices/azure/authConfig';

export const getProfile = (id) => (dispatch, getState) => {
    return fetch(apiConfig.resourceUri + '/' + id, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${getState().auth.accessToken}`,
            "Content-Type": 'application/json'
        }
    }).then(response => {
        if (response && response.status !== 404) {
            return response.json();
        }
    })
    .then((response) => {
        if (response) {
            dispatch(updateProfile(response));

            // if the user exists, skip registration
            if (getState().ui.component === 1) {
                dispatch(updateUI(3));
            }
        }
    })
    .catch(err => console.log(err));
};
