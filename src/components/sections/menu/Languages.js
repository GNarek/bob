import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {inject, observer} from 'mobx-react';

import LanguageItem from './LanguageItem';

class Languages extends Component {

    render() {
        const {_common_} = this.props;

        const url = _common_.url.substr(3);

        return (
            <ul id="Language" className="menu">
                <LanguageItem title="Eng" pathnames={[`/en${url}`]} val="en" />
                <LanguageItem title="Рус" pathnames={[`/ru${url}`]} val="ru" />
                <LanguageItem title="Հայ" pathnames={[`/hy${url}`]} val="hy" />
            </ul>
        );
    }
}


export default inject('_common_')(withRouter(observer(Languages)));
