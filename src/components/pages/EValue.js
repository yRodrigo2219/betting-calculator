import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import LabelInput from '../common/LabelInput';
import ResetButton from '../common/ResetButton';

class EValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wager: '',
            odds: '',
            prob: '',
            evalue: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(target, value) {
        this.setState({
            [target.classList[0]]: value
        }, this.calcEV);
    }

    calcEV() {
        let wager = Number.parseFloat(this.state.wager);
        let odds = Number.parseFloat(this.state.odds);
        let prob = Number.parseFloat(this.state.prob) / 100;

        let evalue = (((odds - 1) * wager) * prob) - (wager * (1 - prob));

        if (isFinite(evalue))
            this.setState({
                evalue: evalue.toFixed(2)
            });

    }

    render() {
        const { t } = this.props;

        return (
            <div className='content'>
                <div className='ev'>
                    <h1>{t('main:evalue.title')}</h1>
                    <strong>{t('main:evalue.description')}</strong>

                    <div className='inputs interface'>
                        <LabelInput value={this.state.wager} name={t('common:forms.wager')} type='currency' symbol='$' onChange={this.handleInputChange} className='wager' min={0.01} />
                        <LabelInput value={this.state.odds} name={t('common:forms.odds')} type='odd' symbol='X' onChange={this.handleInputChange} className='odds' min={1.01} />
                        <LabelInput value={this.state.prob} name={t('common:forms.win-prob')} type='odd' symbol='%' onChange={this.handleInputChange} className='prob' min={0.01} max={100} />
                    </div>
                    <div className='outputs interface'>
                        <LabelInput value={this.state.evalue} name={t('common:forms.expected')} type='currency' symbol='$' className='evalue' readOnly />
                        <ResetButton name={t('common:forms.reset')} reset={this.handleInputChange} />
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
}

export default withTranslation(['main', 'common'])(EValue);