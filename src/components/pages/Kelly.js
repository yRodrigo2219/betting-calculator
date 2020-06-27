import React from 'react';
import { useTranslation } from "react-i18next";

import LabelInput from '../common/LabelInput';
import ResetButton from '../common/ResetButton';

export default function Kelly() {
    const { t } = useTranslation(['main', 'common']);

    const calcKelly = () => {
        var bal = document.getElementsByClassName('balance')[0].value;
        var odd = document.getElementsByClassName('odds')[0].value;
        var win = document.getElementsByClassName('prob')[0].value;
        var fk = document.getElementsByClassName('fkelly')[0].value;

        if (bal && odd && win && fk) {
            bal = Number.parseFloat(bal);
            odd = Number.parseFloat(odd);
            win = Number.parseFloat(win) / 100;
            fk = Number.parseFloat(fk);
            let totalPercentage = (win - ((1 - win) / (odd - 1))) * fk;

            document.getElementsByClassName('wper')[0].value = (totalPercentage * 100).toFixed(2);
            document.getElementsByClassName('wager')[0].value = (bal * totalPercentage).toFixed(2);
        }

    }

    return (
        <div className='content'>
            <div className='kelly'>
                <h1>{t('main:kelly.title')}</h1>
                <strong>{t('main:kelly.description')}</strong>

                <div className='inputs interface'>
                    <LabelInput name={t('common:forms.balance')} type='currency' symbol='$' onChange={calcKelly} className='balance' min={0} />
                    <LabelInput name={t('common:forms.odds')} type='odd' symbol='X' onChange={calcKelly} className='odds' min={1.01} />
                    <LabelInput name={t('common:forms.win-prob')} type='odd' symbol='%' onChange={calcKelly} className='prob' min={0} max={100} />
                    <LabelInput name={t('common:forms.fkelly')} type='odd' symbol='X' onChange={calcKelly} defaultValue='1.00' className='fkelly' min={0.01} max={1} />
                </div>
                <div className='outputs interface multi'>
                    <LabelInput name={t('common:forms.wager')} type='currency' symbol='$' className='wager' readOnly />
                    <div>
                        <LabelInput name={t('common:forms.balance-perc')} type='odd' symbol='%' className='wper' readOnly />
                        <ResetButton name={t('common:forms.reset')} />
                    </div>
                </div>
            </div>
            <div className='explanation'>
                <h1>{t('main:kelly.explanation.fst-title')}</h1>
                <p>{t('main:kelly.explanation.fst-topic')}</p>
                <h1>{t('main:kelly.explanation.snd-title')}</h1>
                <p>{t('main:kelly.explanation.snd-topic.fst.span')}<br /><strong>{t('main:kelly.explanation.snd-topic.fst.strong')}</strong></p>
                <p>{t('main:kelly.explanation.snd-topic.snd.fst-span')}<strong>{t('main:kelly.explanation.snd-topic.snd.strong')}</strong>
                    {t('main:kelly.explanation.snd-topic.snd.snd-span')}</p>
                <h1>{t('main:kelly.explanation.trd-title')}</h1>
                <p>{t('main:kelly.explanation.trd-topic')}</p>
            </div>
        </div>
    );
}