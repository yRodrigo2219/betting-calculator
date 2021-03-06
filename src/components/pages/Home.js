import React from 'react';
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t, i18n } = useTranslation(['main', 'common']);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        try {
            localStorage.setItem('lang', lang);
        } catch (error) {
            // ignore
        }
    }

    return (
        <div className='content'>
            <div>
                <h1>{t('main:home.lang')}</h1>
                <button onClick={() => changeLanguage('br')}>Português</button>
                <button onClick={() => changeLanguage('en')}>English</button>
            </div>
        </div>
    );
}