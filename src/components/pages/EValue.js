import React from 'react';
import { useTranslation } from "react-i18next";

import LabelInput from '../common/LabelInput';
import ResetButton from '../common/ResetButton';

export default function EValue() {
    const { t } = useTranslation(['main', 'common']);

    const calcEV = () => {
        var wager = document.getElementsByClassName('wager')[0].value;
        var odds = document.getElementsByClassName('odds')[0].value;
        var prob = document.getElementsByClassName('prob')[0].value;

        if (wager !== '' && odds !== '' && prob !== '') {
            wager = Number.parseFloat(wager);
            odds = Number.parseFloat(odds);
            prob = Number.parseFloat(prob) / 100;
            document.getElementsByClassName('evalue')[0].value = ((((odds - 1) * wager) * prob) - (wager * (1 - prob))).toFixed(2);
        }

    }

    return (
        <div className='content'>
            <div className='ev'>
                <h1>{t('main:evalue.title')}</h1>
                <strong>{t('main:evalue.description')}</strong>

                <div className='inputs interface'>
                    <LabelInput name={t('common:forms.wager')} type='currency' symbol='$' onChange={calcEV} className='wager' min={0} />
                    <LabelInput name={t('common:forms.odds')} type='odd' symbol='X' onChange={calcEV} className='odds' min={1} />
                    <LabelInput name={t('common:forms.win-prob')} type='odd' symbol='%' onChange={calcEV} className='prob' min={0} max={100} />
                </div>
                <div className='outputs interface'>
                    <LabelInput name={t('common:forms.expected')} type='currency' symbol='$' className='evalue' readOnly />
                    <ResetButton name={t('common:forms.reset')} />
                </div>
            </div>
            <div className='explanation'>
                <h1>{t('main:evalue.explanation.fst-title')}</h1>
                <p>{t('main:evalue.explanation.fst-topic')}</p>
                <h1>{t('main:evalue.explanation.snd-title')}</h1>
                <p><strong>{t('main:evalue.explanation.snd-topic.fst')}</strong></p>
                <p>{t('main:evalue.explanation.snd-topic.snd')}</p>
                <p>{t('main:evalue.explanation.snd-topic.trd')}</p>
            </div>
        </div>
    );
}