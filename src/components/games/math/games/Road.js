import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import roadSocket from '../../../../socket/math/road';
import tr from '../../../../translation';

class Road extends Component {
    constructor(props) {
        super(props);

        this.setGame = this.setGame.bind(this);
        this.setTime = this.setTime.bind(this);
        this._handleNewGame = this._handleNewGame.bind(this);
        this._handleSetAnswer = this._handleSetAnswer.bind(this);
        this._handleEnter = this._handleEnter.bind(this);
        this._handleSendAnswer = this._handleSendAnswer.bind(this);
        this._handleSuccess = this._handleSuccess.bind(this);
        this._handleError = this._handleError.bind(this);
        this._handleExpired = this._handleExpired.bind(this);
        this.language = props.language;
    }

    componentDidMount() {
        const {_common_} = this.props;

        this.language = _common_.language;
        this.initNewGame(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const {_common_} = nextProps;

        if(this.language !== _common_.language) {
            this.language = _common_.language;

            this.removeGame();
            this.initNewGame(nextProps);
        }
    }

    componentWillUnmount() {
        this.removeGame();
    }

    initNewGame(props) {
        const {_common_, _road_} = props;

        const params = {lng: _common_.language};
        const listeners = {
            onGame: _road_.setGame,
            onTime: _road_.setTime,
            onSuccess: this._handleSuccess,
            onError: this._handleError,
            onExpired: this._handleExpired,
        };

        roadSocket.start(params, listeners);
    }

    removeGame() {
        const {_road_} = this.props;
        const listeners = {
            onGame: _road_.setGame,
            onTime: _road_.setTime,
            onSuccess: this._handleSuccess,
            onError: this._handleError,
            onExpired: this._handleExpired,
        };

        roadSocket.close(listeners);
    }

    _handleNewGame() {
        this.removeGame();
        this.initNewGame(this.props);
    }

    _handleSuccess() {
        const {_road_} = this.props;
        const result = tr.t('common.true');

        _road_.setResult(result);
    }

    _handleError() {
        const {_road_} = this.props;
        const result = tr.t('common.false');

        _road_.setResult(result);
    }

    _handleExpired() {
        const {_road_} = this.props;
        const result = tr.t('common.expired');

        _road_.setResult(result);
    }

    setGame(game) {
        const {_road_} = this.props;

        _road_.setGame(game);
    }

    setTime(time) {
        const {_road_} = this.props;

        _road_.setTime(time);
    }

    _handleSetAnswer(event) {
        const {_road_} = this.props;
        const answer = event.target.value;

        _road_.setAnswer(answer);
    }

    _handleSendAnswer() {
        const {_road_} = this.props;
        const answer = parseInt(_road_.answer, 10);

        roadSocket.emit(':answer', {answer});
    }

    _handleEnter(event) {
        if (event.key === 'Enter') {
            this._handleSendAnswer();
        }
    }

    render() {
        const {_road_: {game, time, answer, result}} = this.props;

        let problem = '';

        // wrap numbers with span tag
        if(game.problem) {
            problem = game.problem.replace(/([0-9]+)/ig, '<span class="number">$1</span>');
        }

        return (
            <div>
                <h2 className="page_title">{tr.t('page.math.road.title')}</h2>

                <div className="problem_description" dangerouslySetInnerHTML={{__html: problem}} />
                <div className="margin-top-20">
                    <div className="flex">
                        <input
                            type="text"
                            value={answer}
                            className="input margin-right-10"
                            onChange={this._handleSetAnswer}
                            onKeyPress={this._handleEnter}
                        />
                        <button className="button margin-right-10" onClick={this._handleSendAnswer}>{tr.t('button.send')}</button>
                        <button className="button" onClick={this._handleNewGame}>{tr.t('button.newGame')}</button>
                    </div>
                    <div>{result}</div>
                    <div className={`time ${time <= 10 ? 'color-red' : ''}`}>{time}</div>
                </div>
            </div>
        );
    }
}

export default inject('_common_', '_road_')(observer(Road));
