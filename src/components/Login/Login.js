import React from 'react';
import tr from '../../translation';

const Login = () => (
    <div>
        <h2>{tr.t('page.login')}</h2>
        <div className="formWrapper">
            <form>
                <div>
                    <input
                        type="text"
                        placeholder={tr.t('label.email')}
                        name="email"
                    />

                    <input
                        type="password"
                        placeholder={tr.t('label.password')}
                        name="password"
                    />
                    
                    <button>{tr.t('label.login')}</button>
                </div>
            </form>
        </div>
    </div>
);

export default Login;
