import {types} from 'mobx-state-tree';


const RoadStore = types
    .model('Road', {
        time: types.number,
        game: types.frozen(),
        answer: types.string,
        result: types.string,
    })
    .actions((self) => ({
        setTime(time) {
            self.time = time;
        },
        setGame(game) {
            self.game = game;
            self.answer = '';
            self.result = '';
        },
        setAnswer(answer) {
            self.answer = answer;
        },
        setResult(result) {
            self.result = result;
        },
    }));

const _road_ = RoadStore.create({time: 0, game: {}, answer: '', result: ''});

export {_road_};
