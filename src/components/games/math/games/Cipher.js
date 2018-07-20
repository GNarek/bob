import React, {Component} from 'react';
import {connect} from 'react-redux';

import {changeCountAction} from '../../../../actions/count';

class Cipher extends Component {
    constructor(props) {
        super(props);

        this._handleIncrement = this._handleIncrement.bind(this);
        this._handleDecrement = this._handleDecrement.bind(this);
    }

    _handleIncrement() {
        this.props.changeCountHandler('increase');
    }
    _handleDecrement() {
        this.props.changeCountHandler('decrease');
    }

    render() {
        const {match} = this.props;

        return (
            <div>
                <h2>Do Cipher</h2>
                <h3>{match.params.topicId}</h3>
                <h3>{match.params.userId}</h3>
                <button onClick={this._handleDecrement}>Decrease: {this.props.count}</button>
                <button onClick={this._handleIncrement}>Increase: {this.props.count}</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    count: state.count,
});

const mapDispatchToProps = (dispatch) => ({
    changeCountHandler: (arg) => dispatch(changeCountAction(arg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cipher);
