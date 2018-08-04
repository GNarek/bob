import Polyglot from 'node-polyglot';

class Translation {

    constructor() {
        this.polyglot = new Polyglot();
        this.t = this.t.bind(this);
        this.initTranslations();

        // Define supported languages
        this.supportedLanguages = {
            en: true,
            ru: true,
            hy: true,
        };

        // Default language
        this.language = 'en';
    }

    setLanguage(language) {

        // If passed language is not supported then choose {en} as a default language
        if(this.supportedLanguages[language]) {
            this.language = language;
        } else {
            this.language = 'en';
        }
    }

    initTranslations() {
        this.polyglot.extend({
            errors: {
                email: {
                    en: 'Email is not valid',
                    ru: 'Неправильный адрес электронной почты',
                    hy: 'Էլեկտրոնային հասցեն սխալ է',
                },
                password: {
                    en: 'Password must be at least %{count} char',
                    ru: 'Пароль должен быть не менее %{count} символов',
                    hy: 'Գաղտնաբառը պետք է լինի առնվազն %{count} տառ',
                },
                oops: {
                    en: 'Oops! Something went wrong. Please try again',
                    ru: 'Ой! Что-то пошло не так. Пожалуйста повторите еще раз.  ',
                    hy: 'Վայ`, ինչվոր բան են չեղավ. Նորից պորցեք',
                },
            },
            common: {
                time: {
                    en: 'Time',
                    ru: 'Время',
                    hy: 'Ժամանակ',
                },
                true: {
                    en: 'Success',
                    ru: 'Правильно',
                    hy: 'Ճիշտ է',
                },
                false: {
                    en: 'Wrong',
                    ru: 'Не правильно',
                    hy: 'Սխալ է',
                },
                expired: {
                    en: 'Expired',
                    ru: 'Время вышла',
                    hy: 'Ժամանակը լրացել է',
                },
            },
            menu: {
                menu: {
                    en: 'Menu',
                    ru: 'Меню',
                    hy: 'Մենյու',
                },
                home: {
                    en: 'Home',
                    ru: 'Главный',
                    hy: 'Գլխավոր',
                },
                about: {
                    en: 'About',
                    ru: 'О нас',
                    hy: 'Մեր մասին',
                },
                topics: {
                    en: 'Topics',
                    ru: 'Темы',
                    hy: 'Թեմաներ',
                },
                math: {
                    en: 'Math',
                    ru: 'Математика',
                    hy: 'Մաթեմ',
                },
            },

            page: {
                login: {
                    en: 'Log in',
                    ru: 'Вход',
                    hy: 'Մուտք գործել',
                },
                home: {
                    en: 'There should be something interesting.',
                    ru: 'Здесь должно быть что то интересное',
                    hy: 'Գլխավոր էջում պետք է լինի ինչոր հետաքրքիր բան',
                },
                about: {
                    en: 'About',
                    ru: 'О нас',
                    hy: 'Մեր մասին',
                },
                math: {
                    empty: {
                        en: 'Please select a game',
                        ru: 'Пожалуйста выберите игру',
                        hy: 'Խնդրում ենք ընտրել խաղը',
                    },
                    road: {
                        title: {
                            en: 'Road game',
                            ru: 'Дорожная игра',
                            hy: 'Ճանապարհային խաղ',
                        },
                    },
                    menu: {
                        road: {
                            en: 'Road',
                            ru: 'Дорога',
                            hy: 'Ճանապարհ',
                        },
                        logic: {
                            en: 'Logic',
                            ru: 'Логика',
                            hy: 'Տրամաբանություն',
                        },
                        cipher: {
                            en: 'Cipher',
                            ru: 'Шифрование',
                            hy: 'Կոդավորում',
                        },
                    },
                },
            },

            button: {
                send: {
                    en: 'Send',
                    ru: 'Отправить',
                    hy: 'ՈՒղարկել',
                },
                newGame: {
                    en: 'New Game',
                    ru: 'Новая Игра',
                    hy: 'Նոր խաղ',
                },
            },

            label: {
                email: {
                    en: 'E-mail',
                    ru: 'Электронный адрес',
                    hy: 'Էլ.փոստ',
                },
                password: {
                    en: 'Password',
                    ru: 'Пароль',
                    hy: 'Գաղտնաբառ',
                },
                login: {
                    en: 'Log in',
                    ru: 'Вход',
                    hy: 'Մուտք գործել',
                },
            },
        });
    }

    t(key, options) {
        // Concat language with key
        const keyWithLanguage = `${key}.${this.language}`;

        // Do translation
        return this.polyglot.t(keyWithLanguage, options);
    }
}

const tr = new Translation();

export default tr;
