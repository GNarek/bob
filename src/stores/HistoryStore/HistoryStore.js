import {types} from 'mobx-state-tree';


import {requestService} from '../../RequestService';
import {_common_, _auth_} from '../../stores/';
import configs from '../../configs';
import tr from '../../translation';

const HistoryStore = types
    .model('Road', {
        games: types.frozen(),
    })
    .actions((self) => ({
        getHistory() {
            self.doGetHistory();
        },

        setGames(games) {
            self.games = games;
        },

        async doGetHistory() {

            const url = `${configs.apiUrl}/${_common_.language}/games/history`;
            const options = {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    jwt: _auth_.jwtToken,
                },
                method: 'GET',
            };

            const response = await requestService.getRequest(url, options);

            if(response && response.status) {

                if(response.status === 'success') {
                    self.setGames(response.data);

                    return {
                        status: 'success',
                        error: null,
                        data: null,
                    };
                }

                return response;
            }

            return {
                status: 'error',
                error: {
                    errorCode: '',
                    errorMessage: tr.t('errors.oops'),
                },
                data: null,
            };

        },
    }));

const _history_ = HistoryStore.create({games: []});

export {_history_};
