import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import tr from '../../../translation';

class Rating extends Component {
    constructor(props) {
        super(props);

        this.language = props.language;

        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
        const {_common_} = this.props;

        this.language = _common_.language;
        this.getRating();
    }

    getRating() {
        const {_rating_} = this.props;

        _rating_.getRating();
    }


    renderRow(user, index) {

        const {_rating_: {sortBy}} = this.props;
        const {points} = user;
        const gamePointsClass = sortBy === 'GAME_POINTS' ? 'active' : '';
        const mathPointsClass = sortBy === 'MATH_POINTS' ? 'active' : '';
        const gamesCountClass = sortBy === 'GAMES_COUNT' ? 'active' : '';
        const solvedCountClass = sortBy === 'SOLVED_COUNT' ? 'active' : '';
        const solvedPercentClass = sortBy === 'SOLVED_PERCENT' ? 'active' : '';
        const middleGamePointsClass = sortBy === 'MIDDLE_GAME_POINTS' ? 'active' : '';
        const middleMathPointsClass = sortBy === 'MIDDLE_MATH_POINTS' ? 'active' : '';
        const middleAnswersTimeClass = sortBy === 'MIDDLE_ANSWERS_TIME' ? 'active' : '';


        return (
            <div key={user._id} className="tr">
                <div className="td flex-1">
                    {index + 1}
                </div>

                <div className="td flex-5">{user.profile.firstName} {user.profile.lastName}</div>
                <div className={`td flex-2 ${gamePointsClass}`}>{points.gamePoints}</div>
                <div className={`td flex-2 ${mathPointsClass}`}>{points.mathPoints}</div>
                <div className={`td flex-2 ${gamesCountClass}`}>{points.gamesCount}</div>
                <div className={`td flex-2 ${solvedCountClass}`}>{points.solvedCount}</div>
                <div className={`td flex-2 ${solvedPercentClass}`}>{points.solvedPercent.toFixed(0)}%</div>
                <div className={`td flex-2 ${middleGamePointsClass}`}>{points.middleGamePoints.toFixed(0)}</div>
                <div className={`td flex-2 ${middleMathPointsClass}`}>{points.middleMathPoints.toFixed(0)}</div>
                <div className={`td flex-2 ${middleAnswersTimeClass}`}>{points.middleAnswersTime.toFixed(0)}</div>
            </div>
        );
    }

    renderRatings(users) {
        if(users) {

            const {_rating_, _rating_: {sortBy}} = this.props;
            const gamePointsClass = sortBy === 'GAME_POINTS' ? 'active' : '';
            const mathPointsClass = sortBy === 'MATH_POINTS' ? 'active' : '';
            const gamesCountClass = sortBy === 'GAMES_COUNT' ? 'active' : '';
            const solvedCountClass = sortBy === 'SOLVED_COUNT' ? 'active' : '';
            const solvedPercentClass = sortBy === 'SOLVED_PERCENT' ? 'active' : '';
            const middleGamePointsClass = sortBy === 'MIDDLE_GAME_POINTS' ? 'active' : '';
            const middleMathPointsClass = sortBy === 'MIDDLE_MATH_POINTS' ? 'active' : '';
            const middleAnswersTimeClass = sortBy === 'MIDDLE_ANSWERS_TIME' ? 'active' : '';

            return (
                <div id="historyGamesContainer">
                    <div id="historyGamesWrapper">
                        <div className="tr">
                            <div className="th flex-1">#</div>

                            <div className="th flex-5">Full Name</div>
                            <div className={`th flex-2 sortable ${gamePointsClass}`} onClick={_rating_.setSortBy.bind(null, 'GAME_POINTS')}>GP</div>
                            <div className={`th flex-2 sortable ${mathPointsClass}`} onClick={_rating_.setSortBy.bind(null, 'MATH_POINTS')}>MP</div>
                            <div className={`th flex-2 sortable ${gamesCountClass}`} onClick={_rating_.setSortBy.bind(null, 'GAMES_COUNT')}>GC</div>
                            <div className={`th flex-2 sortable ${solvedCountClass}`} onClick={_rating_.setSortBy.bind(null, 'SOLVED_COUNT')}>SC</div>
                            <div className={`th flex-2 sortable ${solvedPercentClass}`} onClick={_rating_.setSortBy.bind(null, 'SOLVED_PERCENT')}>SP</div>
                            <div className={`th flex-2 sortable ${middleGamePointsClass}`} onClick={_rating_.setSortBy.bind(null, 'MIDDLE_GAME_POINTS')}>MGP</div>
                            <div className={`th flex-2 sortable ${middleMathPointsClass}`} onClick={_rating_.setSortBy.bind(null, 'MIDDLE_MATH_POINTS')}>MMP</div>
                            <div className={`th flex-2 sortable ${middleAnswersTimeClass}`} onClick={_rating_.setSortBy.bind(null, 'MIDDLE_ANSWERS_TIME')}>MAT</div>
                        </div>
                        {users.map(this.renderRow)}
                    </div>
                </div>
            );
        }

        return <div>Empty</div>;
    }

    render() {
        const {_rating_: {users}} = this.props;

        return (
            <div id="rating">
                <h2>{tr.t('menu.rating')}</h2>
                {this.renderRatings(users)}
            </div>
        );
    }
}

export default inject('_common_', '_rating_')(observer(Rating));
