import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


import LanguageItem from './LanguageItem';
import {toggleLeftNavBar} from '../../../actions/leftNavBar';

class Languages extends Component {

    constructor(props) {
        super(props);

        this._handleToggleLeftNavBar = this._handleToggleLeftNavBar.bind(this);
    }

    _handleToggleLeftNavBar() {
        this.props.toggleLeftNavBarHandler('close');
    }


    render() {
        const url = this.props.url.substr(3);

        return (
            <ul id="Language" className="menu">
                <LanguageItem title="Eng" pathnames={[`/en${url}`]} val="en" />
                <LanguageItem title="Рус" pathnames={[`/ru${url}`]} val="ru" />
                <LanguageItem title="Հայ" pathnames={[`/hy${url}`]} val="hy" />
            </ul>
        );
    }
}

const mapStateToProps = (state) => ({
    url: state.url,
});

const mapDispatchToProps = (dispatch) => ({
    toggleLeftNavBarHandler: (arg) => dispatch(toggleLeftNavBar(arg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Languages));
