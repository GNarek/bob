import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import tr from '../../../translation';

class History extends Component {
    constructor(props) {
        super(props);

        this.language = props.language;

        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
        const {_common_} = this.props;

        this.language = _common_.language;
        this.getHistory();
    }

    getHistory() {
        const {_history_} = this.props;

        _history_.getHistory();
    }

    renderRow(game, index, games) {
        const className = `indicator indicator-${game.solved === '1' ? 'green' : 'red'}`;

        const timeLeft = isNaN(game.time - game.solvedTime) ? 0 : game.time - game.solvedTime;

        return (
            <div key={game._id} className="tr">
                <div className="td flex-1">
                    {games.length - index})
                    <div className={className} />
                </div>

                <div className="td flex-1">{game.gamePoints}</div>
                <div className="td flex-1">{game.mathPoints}</div>
                <div className="td flex-1">{game.rightAnswer}</div>
                <div className="td flex-1">{game.userAnswer}</div>
                <div className="td flex-1">{game.time}</div>
                <div className="td flex-1">{timeLeft}</div>
                <div className="td flex-1">{game.solvedTime}</div>
                <div className="td flex-11">{game.problem}</div>
            </div>
        );
    }

    renderGames(games) {
        if(games) {
            return (
                <div id="historyGamesContainer">
                    <div id="historyGamesWrapper">
                        <div className="tr">
                            <div className="th flex-1">#</div>

                            <div className="th flex-1">GP</div>
                            <div className="th flex-1">MP</div>
                            <div className="th flex-1">RA</div>
                            <div className="th flex-1">YA</div>
                            <div className="th flex-1">T</div>
                            <div className="th flex-1">TL</div>
                            <div className="th flex-1">ST</div>
                            <div className="th flex-11">Problem description</div>
                        </div>
                        {games.map(this.renderRow)}
                    </div>
                </div>
            );
        }

        return <div>Empty</div>;
    }

    render() {
        const {_history_: {games}} = this.props;

        return (
            <div id="history">
                <h2>{tr.t('menu.history')}</h2>
                {this.renderGames(games)}
            </div>
        );
    }
}

export default inject('_common_', '_history_')(observer(History));
