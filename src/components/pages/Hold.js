import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import LabelInput from '../common/LabelInput';
import ResetButton from '../common/ResetButton';

class Hold extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fstOdd: '',
            sndOdd: '',
            fstProb: '',
            sndProb: '',
            holdPerc: '',
        };

        this.handleOddChange = this.handleOddChange.bind(this);
    }

    handleOddChange(target, value) {
        this.setState({
            [target.classList[0]]: value
        }, this.calcHold);
    }

    calcHold() {
        let p1 = (1 / Number.parseFloat(this.state.fstOdd)) * 100;
        let p2 = (1 / Number.parseFloat(this.state.sndOdd)) * 100;
        let h = (p1 + p2) - 100;


        if (isFinite(h))
            this.setState({
                holdPerc: h.toFixed(2),
                fstProb: (p1 / (p1 + p2) * 100).toFixed(2),
                sndProb: (p2 / (p1 + p2) * 100).toFixed(2)
            });
    }

    render() {
        const { t } = this.props;

        return (
            <div className='content'>
                <div className='hold'>
                    <h1>{t('main:hold.title')}</h1>
                    <strong>{t('main:hold.description')}</strong>

                    <div className='inputs interface'>
                        <LabelInput value={this.state.fstOdd} name={t('common:forms.fst-odd')} type='odd' symbol='X' onChange={this.handleOddChange} className='fstOdd' min={1.01} />
                        <LabelInput value={this.state.sndOdd} name={t('common:forms.snd-odd')} type='odd' symbol='X' onChange={this.handleOddChange} className='sndOdd' min={1.01} />
                    </div>
                    <div className='outputs interface multi'>
                        <div>
                            <LabelInput value={this.state.fstProb} name={t('common:forms.fst-prob')} type='odd' symbol='%' className='fstProb' readOnly />
                            <LabelInput value={this.state.sndProb} name={t('common:forms.snd-prob')} type='odd' symbol='%' className='sndProb' readOnly />
                        </div>
                        <div>
                            <LabelInput value={this.state.holdPerc} name={t('common:forms.hold-perc')} type='odd' symbol='%' className='holdPerc' readOnly />
                            <ResetButton name={t('common:forms.reset')} reset={this.handleOddChange} />
                        </div>
                    </div>
                </div>
                <div className='explanation'>
                    <h1>{t('main:hold.explanation.fst-title')}</h1>
                    <p>{t('main:hold.explanation.fst-topic')}</p>
                    <h1>{t('main:hold.explanation.snd-title')}</h1>
                    <p>{t('main:hold.explanation.snd-topic.fst')}</p>
                    <p>{t('main:hold.explanation.snd-topic.snd')}</p>
                    <p>{t('main:hold.explanation.snd-topic.trd')}</p>
                </div>
            </div>
        );
    }
}

export default withTranslation(['main', 'common'])(Hold);