import React, {Component} from 'react';

class MathLogic extends Component {

    render() {
        const {match} = this.props;

        return (
            <div>
                <h2>Do MathLogic</h2>
                <h3>{match.params.topicId}</h3>
                <h3>{match.params.userId}</h3>
            </div>
        );
    }
}

export default MathLogic;
