import React from 'react';
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t, i18n } = useTranslation(['main', 'common']);

    return (
        <div className='content'>
            <div>
                <h1>{t('main:home.lang')}</h1>
                <button onClick={() => i18n.changeLanguage('br')}>Português</button>
                <button onClick={() => i18n.changeLanguage('en')}>English</button>
            </div>
        </div>
    );
}