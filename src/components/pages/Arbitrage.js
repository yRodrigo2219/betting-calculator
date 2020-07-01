import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import LabelInput from '../common/LabelInput';
import ResetButton from '../common/ResetButton';

class Arbitrage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalWager: '',
            fstOdd: '',
            sndOdd: '',
            fstUnbBet: '',
            fstUnbProfit: '',
            sndUnbBet: '',
            sndUnbProfit: '',
            fstBiFBet: '',
            fstBiFProfit: '',
            sndBiFBet: '',
            sndBiFProfit: '',
            fstBiSBet: '',
            fstBiSProfit: '',
            sndBiSBet: '',
            sndBiSProfit: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(target, value) {
        this.setState({
            [target.name]: value
        }, this.calcArbitrage);
    }

    calcArbitrage() {
        let w = Number.parseFloat(this.state.totalWager);
        let o1 = Number.parseFloat(this.state.fstOdd);
        let o2 = Number.parseFloat(this.state.sndOdd);

        if (isFinite(w) && isFinite(o1) && isFinite(o2)) {
            // unbiased
            let unbW1 = w / (o1 / o2 + 1);
            let unbW2 = w / (o2 / o1 + 1);

            // biased fst odd
            let bifW2 = w / o2;
            let bifW1 = w - bifW2;

            // biased snd odd
            let bisW1 = w / o1;
            let bisW2 = w - bisW1;

            this.setState({
                // unbiased
                fstUnbBet: unbW1.toFixed(2),
                sndUnbBet: unbW2.toFixed(2),
                fstUnbProfit: (unbW1 * o1 - w).toFixed(2),
                sndUnbProfit: (unbW2 * o2 - w).toFixed(2),
                // biased fst
                fstBiFBet: bifW1.toFixed(2),
                sndBiFBet: bifW2.toFixed(2),
                fstBiFProfit: (bifW1 * o1 - w).toFixed(2),
                sndBiFProfit: (bifW2 * o2 - w).toFixed(2),
                //biased snd
                fstBiSBet: bisW1.toFixed(2),
                sndBiSBet: bisW2.toFixed(2),
                fstBiSProfit: (bisW1 * o1 - w).toFixed(2),
                sndBiSProfit: (bisW2 * o2 - w).toFixed(2)
            });
        }
    }

    render() {
        const { t } = this.props;

        return (
            <div className='content'>
                <div className='arbitrage'>
                    <h1>{t('main:arbitrage.title')}</h1>
                    <strong>{t('main:arbitrage.description')}</strong>

                    <div className='inputs interface'>
                        <LabelInput value={this.state.totalWager} label={t('common:forms.total-wager')} type='currency' symbol='$' onChange={this.handleInputChange} name='totalWager' min={0.01} />
                        <LabelInput value={this.state.fstOdd} label={t('common:forms.fst-odd')} type='odd' symbol='X' onChange={this.handleInputChange} name='fstOdd' min={1.01} />
                        <LabelInput value={this.state.sndOdd} label={t('common:forms.snd-odd')} type='odd' symbol='X' onChange={this.handleInputChange} name='sndOdd' min={1.01} />
                    </div>
                    <div className='outputs interface multi-cont'>
                        <div>
                            <h1>{t('main:arbitrage.strategies.unbiased')}</h1>
                            <LabelInput value={this.state.fstUnbBet} label={t('main:arbitrage.strategies.bet')} type='currency' symbol='$' name='fstUnbBet' readOnly />
                            <LabelInput value={this.state.sndUnbBet} label={t('main:arbitrage.strategies.bet')} type='currency' symbol='$' name='sndUnbBet' readOnly />
                            <LabelInput value={this.state.fstUnbProfit} label={t('main:arbitrage.strategies.profit-og')} type='currency' symbol='$' name='fstUnbProfit' readOnly />
                            <LabelInput value={this.state.sndUnbProfit} label={t('main:arbitrage.strategies.profit-hedge')} type='currency' symbol='$' name='sndUnbProfit' readOnly />
                        </div>

                        <div>
                            <h1>{t('main:arbitrage.strategies.biased-fst')}</h1>
                            <LabelInput value={this.state.fstBiFBet} label={t('main:arbitrage.strategies.bet')} type='currency' symbol='$' name='fstBiFBet' readOnly />
                            <LabelInput value={this.state.sndBiFBet} label={t('main:arbitrage.strategies.bet')} type='currency' symbol='$' name='sndBiFBet' readOnly />
                            <LabelInput value={this.state.fstBiFProfit} label={t('main:arbitrage.strategies.profit-og')} type='currency' symbol='$' name='fstBiFProfit' readOnly />
                            <LabelInput value={this.state.sndBiFProfit} label={t('main:arbitrage.strategies.profit-hedge')} type='currency' symbol='$' name='sndBiFProfit' readOnly />
                        </div>

                        <div>
                            <h1>{t('main:arbitrage.strategies.biased-snd')}</h1>
                            <LabelInput value={this.state.fstBiSBet} label={t('main:arbitrage.strategies.bet')} type='currency' symbol='$' name='fstBiSBet' readOnly />
                            <LabelInput value={this.state.sndBiSBet} label={t('main:arbitrage.strategies.bet')} type='currency' symbol='$' name='sndBiSBet' readOnly />
                            <LabelInput value={this.state.fstBiSProfit} label={t('main:arbitrage.strategies.profit-og')} type='currency' symbol='$' name='fstBiSProfit' readOnly />
                            <LabelInput value={this.state.sndBiSProfit} label={t('main:arbitrage.strategies.profit-hedge')} type='currency' symbol='$' name='sndBiSProfit' readOnly />
                        </div>

                        <ResetButton label={t('common:forms.reset')} reset={this.handleInputChange} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation(['main', 'common'])(Arbitrage);