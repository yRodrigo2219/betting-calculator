import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import LabelInput from '../common/LabelInput';
import ResetButton from '../common/ResetButton';

class Hedge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ogBet: '',
            ogOdd: '',
            hedgeOdd: '',
            unbiasedBet: '',
            unbiasedProfitOg: '',
            unbiasedProfitHedge: '',
            biasedOgBet: '',
            biasedOgProfitOg: '',
            biasedOgProfitHedge: '',
            biasedHedgeBet: '',
            biasedHedgeProfitOg: '',
            biasedHedgeProfitHedge: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    handleInputChange(target, value) {
        this.setState({
            [target.name]: value
        }, this.calcHedge);
    }

    calcHedge() {
        let ogBet = Number.parseFloat(this.state.ogBet);
        let ogOdd = Number.parseFloat(this.state.ogOdd);
        let hedgeOdd = Number.parseFloat(this.state.hedgeOdd);

        let unbiasedBet = ogBet * (ogOdd / hedgeOdd);
        let unbiasedProfitOg = (ogBet * ogOdd) - (ogBet + unbiasedBet);
        let unbiasedProfitHedge = (unbiasedBet * hedgeOdd) - (ogBet + unbiasedBet);

        let biasedOgBet = ogBet / (hedgeOdd - 1);
        let biasedOgProfitOg = (ogBet * ogOdd) - (ogBet + biasedOgBet);
        let biasedOgProfitHedge = (biasedOgBet * hedgeOdd) - (ogBet + biasedOgBet);

        let biasedHedgeBet = ogBet * (ogOdd - 1);
        let biasedHedgeProfitOg = (ogBet * ogOdd) - (ogBet + biasedHedgeBet);
        let biasedHedgeProfitHedge = (biasedHedgeBet * hedgeOdd) - (ogBet + biasedHedgeBet);

        if (isFinite(unbiasedBet) && isFinite(biasedOgBet) && isFinite(biasedHedgeBet))
            this.setState({
                unbiasedBet: unbiasedBet.toFixed(2),
                unbiasedProfitOg: unbiasedProfitOg.toFixed(2),
                unbiasedProfitHedge: unbiasedProfitHedge.toFixed(2),
                biasedOgBet: biasedOgBet.toFixed(2),
                biasedOgProfitOg: biasedOgProfitOg.toFixed(2),
                biasedOgProfitHedge: biasedOgProfitHedge.toFixed(2),
                biasedHedgeBet: biasedHedgeBet.toFixed(2),
                biasedHedgeProfitOg: biasedHedgeProfitOg.toFixed(2),
                biasedHedgeProfitHedge: biasedHedgeProfitHedge.toFixed(2)
            });
    }

    render() {
        const { t } = this.props;

        return (
            <div className='content' >
                <div className='hedge'>
                    <h1>{t('main:hedge.title')}</h1>
                    <strong>{t('main:hedge.description')}</strong>

                    <div className='inputs interface'>
                        <LabelInput value={this.state.ogBet} label={t('common:forms.original-bet')} type='currency' symbol='$' onChange={this.handleInputChange} name='ogBet' min={0.01} />
                        <LabelInput value={this.state.ogOdd} label={t('common:forms.original-odd')} type='odd' symbol='X' onChange={this.handleInputChange} name='ogOdd' min={1.01} />
                        <LabelInput value={this.state.hedgeOdd} label={t('common:forms.hedge-odd')} type='odd' symbol='X' onChange={this.handleInputChange} name='hedgeOdd' min={1.01} />
                    </div>

                    <div className='outputs interface multi-cont'>
                        <div>
                            <h1>{t('main:hedge.strategies.unbiased')}</h1>
                            <LabelInput value={this.state.unbiasedBet} label={t('main:hedge.strategies.bet')} type='currency' symbol='$' name='unbiasedBet' readOnly />
                            <LabelInput value={this.state.unbiasedProfitOg} label={t('main:hedge.strategies.profit-og')} type='currency' symbol='$' name='unbiasedProfitOg' readOnly />
                            <LabelInput value={this.state.unbiasedProfitHedge} label={t('main:hedge.strategies.profit-hedge')} type='currency' symbol='$' name='unbiasedProfitHedge' readOnly />
                        </div>

                        <div>
                            <h1>{t('main:hedge.strategies.biased-original')}</h1>
                            <LabelInput value={this.state.biasedOgBet} label={t('main:hedge.strategies.bet')} type='currency' symbol='$' name='biasedOgBet' readOnly />
                            <LabelInput value={this.state.biasedOgProfitOg} label={t('main:hedge.strategies.profit-og')} type='currency' symbol='$' name='biasedOgProfitOg' readOnly />
                            <LabelInput value={this.state.biasedOgProfitHedge} label={t('main:hedge.strategies.profit-hedge')} type='currency' symbol='$' name='biasedOgProfitHedge' readOnly />
                        </div>

                        <div>
                            <h1>{t('main:hedge.strategies.biased-hedge')}</h1>
                            <LabelInput value={this.state.biasedHedgeBet} label={t('main:hedge.strategies.bet')} type='currency' symbol='$' name='biasedHedgeBet' readOnly />
                            <LabelInput value={this.state.biasedHedgeProfitOg} label={t('main:hedge.strategies.profit-og')} type='currency' symbol='$' name='biasedHedgeProfitOg' readOnly />
                            <LabelInput value={this.state.biasedHedgeProfitHedge} label={t('main:hedge.strategies.profit-hedge')} type='currency' symbol='$' name='biasedHedgeProfitHedge' readOnly />
                        </div>

                        <ResetButton label={t('common:forms.reset')} reset={this.handleInputChange} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation(['main', 'common'])(Hedge);