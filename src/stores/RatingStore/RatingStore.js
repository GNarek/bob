import {types} from 'mobx-state-tree';


import {requestService} from '../../RequestService';
import {_common_, _auth_} from '../../stores/';
import configs from '../../configs';
import tr from '../../translation';

const RatingStore = types
    .model('Rating', {
        users: types.frozen(),
        sortBy: types.string,
    })
    .actions((self) => ({
        getRating() {
            self.doGetRating();
        },

        setRating(users) {
            self.users = users;

            self.doSort();
        },

        setSortBy(sortBy) {
            self.sortBy = sortBy;

            self.doSort();
        },

        doSort() {
            const users = JSON.parse(JSON.stringify(self.users));

            switch (self.sortBy) {
                case 'GAME_POINTS':
                    users.sort(self.sortByGamePoints);
                    break;

                case 'MATH_POINTS':
                    users.sort(self.sortByMathPoints);
                    break;

                case 'SOLVED_COUNT':
                    users.sort(self.sortBySolvedCount);
                    break;

                case 'GAMES_COUNT':
                    users.sort(self.sortByGamesCount);
                    break;

                case 'SOLVED_PERCENT':
                    users.sort(self.sortBySolvedPercent);
                    break;

                case 'MIDDLE_GAME_POINTS':
                    users.sort(self.sortByMiddleGamePoints);
                    break;

                case 'MIDDLE_MATH_POINTS':
                    users.sort(self.sortByMiddleMathPoints);
                    break;

                case 'MIDDLE_ANSWERS_TIME':
                    users.sort(self.sortByMiddleAnswersTime);
                    break;

                default:

            }

            self.users = users;

        },

        sortByGamePoints(a, b) {
            if (a.points.gamePoints < b.points.gamePoints) {
                return 1;
            }

            if (a.points.gamePoints > b.points.gamePoints) {
                return -1;
            }

            return 0;
        },

        sortByMathPoints(a, b) {
            if (a.points.mathPoints < b.points.mathPoints) {
                return 1;
            }

            if (a.points.mathPoints > b.points.mathPoints) {
                return -1;
            }

            return 0;
        },

        sortBySolvedCount(a, b) {
            if (a.points.solvedCount < b.points.solvedCount) {
                return 1;
            }

            if (a.points.solvedCount > b.points.solvedCount) {
                return -1;
            }

            return 0;
        },

        sortByGamesCount(a, b) {
            if (a.points.gamesCount < b.points.gamesCount) {
                return 1;
            }

            if (a.points.gamesCount > b.points.gamesCount) {
                return -1;
            }

            return 0;
        },

        sortByMiddleGamePoints(a, b) {
            if (a.points.middleGamePoints < b.points.middleGamePoints) {
                return 1;
            }

            if (a.points.middleGamePoints > b.points.middleGamePoints) {
                return -1;
            }

            return 0;
        },

        sortByMiddleMathPoints(a, b) {
            if (a.points.middleMathPoints < b.points.middleMathPoints) {
                return 1;
            }

            if (a.points.middleMathPoints > b.points.middleMathPoints) {
                return -1;
            }

            return 0;
        },

        sortBySolvedPercent(a, b) {
            if (a.points.solvedPercent < b.points.solvedPercent) {
                return 1;
            }

            if (a.points.solvedPercent > b.points.solvedPercent) {
                return -1;
            }

            return 0;
        },

        sortByMiddleAnswersTime(a, b) {

            const aPoint = a.points.middleAnswersTime === 0 ? Infinity : a.points.middleAnswersTime;
            const bPoint = b.points.middleAnswersTime === 0 ? Infinity : b.points.middleAnswersTime;

            if (aPoint < bPoint) {
                return -1;
            }

            if (aPoint > bPoint) {
                return 1;
            }

            return 0;
        },

        async doGetRating() {

            const url = `${configs.apiUrl}/${_common_.language}/games/rating`;
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
                    self.setRating(response.data);

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

const _rating_ = RatingStore.create({games: [], sortBy: 'GAME_POINTS'});

export {_rating_};
