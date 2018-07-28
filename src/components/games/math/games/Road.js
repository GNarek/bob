import React, {Component} from 'react';
import {connect} from 'react-redux';

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

    state = {
        timestamp: 0,
        game: {},
        answer: '',
        result: '',
    };

    componentDidMount() {

        this.language = this.props.language;
        this.initNewGame(this.props);
    }

    componentWillReceiveProps(nextProps) {

        if(this.language !== nextProps.language) {
            this.language = nextProps.language;

            this.removeGame();
            this.initNewGame(nextProps);
        }
    }

    componentWillUnmount() {
        this.removeGame();
    }

    initNewGame(props) {
        const params = {lng: props.language};
        const listeners = {
            onGame: this.setGame,
            onTime: this.setTime,
            onSuccess: this._handleSuccess,
            onError: this._handleError,
            onExpired: this._handleExpired,
        };

        roadSocket.start(params, listeners);
    }

    removeGame() {
        const listeners = {
            onGame: this.setGame,
            onTime: this.setTime,
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
        this.setState({
            result: tr.t('common.true'),
        });
    }

    _handleError() {
        this.setState({
            result: tr.t('common.false'),
        });
    }

    _handleExpired() {
        this.setState({
            result: tr.t('common.expired'),
        });
    }

    setGame(game) {
        this.setState({
            game,
            answer: '',
            result: '',
        });
    }

    setTime(timestamp) {
        this.setState({
            timestamp
        });
    }

    _handleSetAnswer(event) {
        const answer = event.target.value;

        this.setState({
            answer
        });
    }

    _handleSendAnswer() {
        const answer = parseInt(this.state.answer, 10);

        roadSocket.emit(':answer', {answer});
    }

    _handleEnter(event) {
        if (event.key === 'Enter') {
            this._handleSendAnswer();
        }
    }

    render() {
        const {game, timestamp, answer, result} = this.state;

        return (
            <div>
                <h2>{tr.t('page.math.road.title')}</h2>

                <div>{game.problem}</div>
                <div>{tr.t('common.time')}: {timestamp}</div>
                <input
                    type="text"
                    value={answer}
                    onChange={this._handleSetAnswer}
                    onKeyPress={this._handleEnter}
                />
                <button onClick={this._handleSendAnswer}>{tr.t('button.send')}</button>
                <button onClick={this._handleNewGame}>{tr.t('button.newGame')}</button>
                <div>{result}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.language,
});

export default connect(mapStateToProps, null)(Road);
