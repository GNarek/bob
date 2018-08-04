import {types} from 'mobx-state-tree';

import tr from '../../translation';

const CommonStore = types
    .model('Common', {
        language: types.string,
        url: types.string,
    })
    .actions((self) => ({
        setLanguage(language) {
            // Change language also in translation
            tr.setLanguage(language);
            self.language = language;
        },
        setUrl(url) {
            self.url = url;
        },
    }));

const _common_ = CommonStore.create({language: 'en', url: '/'});

export {_common_};
