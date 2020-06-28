import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import LabelInput from '../common/LabelInput';
import ResetButton from '../common/ResetButton';

class Kelly extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: '',
            odds: '',
            prob: '',
            fkelly: '1.00',
            wager: '',
            wper: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(target, value) {
        if (target.classList.contains('fkelly') && value === '')
            value = '1.00';

        this.setState({
            [target.classList[0]]: value
        }, this.calcKelly);
    }

    calcKelly() {
        let bal = Number.parseFloat(this.state.balance);
        let odd = Number.parseFloat(this.state.odds);
        let win = Number.parseFloat(this.state.prob) / 100;
        let fk = Number.parseFloat(this.state.fkelly);
        let totalPercentage = (win - ((1 - win) / (odd - 1))) * fk;

        if (isFinite(totalPercentage)) {


            this.setState({
                wager: (bal * totalPercentage).toFixed(2),
                wper: (totalPercentage * 100).toFixed(2)
            });
        }

    }

    render() {
        const { t } = this.props;

        return (
            <div className='content'>
                <div className='kelly'>
                    <h1>{t('main:kelly.title')}</h1>
                    <strong>{t('main:kelly.description')}</strong>

                    <div className='inputs interface'>
                        <LabelInput value={this.state.balance} name={t('common:forms.balance')} type='currency' symbol='$' onChange={this.handleInputChange} className='balance' min={0.01} />
                        <LabelInput value={this.state.odds} name={t('common:forms.odds')} type='odd' symbol='X' onChange={this.handleInputChange} className='odds' min={1.01} />
                        <LabelInput value={this.state.prob} name={t('common:forms.win-prob')} type='odd' symbol='%' onChange={this.handleInputChange} className='prob' min={0.01} max={100} />
                        <LabelInput value={this.state.fkelly} name={t('common:forms.fkelly')} type='odd' symbol='X' onChange={this.handleInputChange} className='fkelly' min={0.01} max={1} />
                    </div>
                    <div className='outputs interface multi'>
                        <LabelInput value={this.state.wager} name={t('common:forms.wager')} type='currency' symbol='$' className='wager' readOnly />
                        <div>
                            <LabelInput value={this.state.wper} name={t('common:forms.balance-perc')} type='odd' symbol='%' className='wper' readOnly />
                            <ResetButton name={t('common:forms.reset')} reset={this.handleInputChange} />
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
}

export default withTranslation(['main', 'common'])(Kelly);