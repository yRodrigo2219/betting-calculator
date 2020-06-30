import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import LabelInput from '../common/LabelInput';
import ResetButton from '../common/ResetButton';

class Odd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fracOdd: '',
            decOdd: '',
            amerOdd: '',
            impOdd: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(target, value) {
        this.setState({
            [target.name]: value
        }, () => this.calcOdd(target));
    }

    calcOdd(target) {
        const decToFrac = (dec) => {
            const gcd = (a, b) => {
                if (b < 0.0000001) return a;

                return gcd(b, Math.floor(a % b));
            }

            let len = dec.toString().length - 2;
            let den = Math.pow(10, len);
            let num = dec * den;

            let div = gcd(num, den);

            num /= div;
            den /= div;

            return `${num}/${den}`
        }

        switch (target.name) {
            case 'fracOdd':
                let reg = new RegExp(/^([1-9]+[0-9]*\.?[0-9]*)\/([1-9]+[0-9]*\.*[0-9]*)$/);
                let f = this.state.fracOdd;
                if (reg.test(f)) {
                    let fraction = f.split('/');
                    let num = Number.parseFloat(fraction[0]);
                    let den = Number.parseFloat(fraction[1]);
                    this.setState({
                        decOdd: (num / den + 1).toFixed(2),
                        amerOdd: num >= den ? (num / den).toFixed(2) * 100 : (den / num).toFixed(2) * -100,
                        impOdd: (den / (den + num) * 100).toFixed(2)
                    });
                }
                break;
            case 'decOdd':
                let odd = Number.parseFloat(this.state.decOdd);
                if (isFinite(odd) && odd > 1) {
                    this.setState({
                        fracOdd: decToFrac((odd - 1).toFixed(2)),
                        impOdd: ((1 / odd) * 100).toFixed(2),
                        amerOdd: odd >= 2 ? ((odd - 1) * 100).toFixed(0) : (-100 / (odd - 1)).toFixed(0)
                    });
                }
                break;
            case 'amerOdd':
                let amr = Number.parseInt(this.state.amerOdd);
                if (isFinite(amr)) {
                    if (amr >= 100) {
                        this.setState({
                            impOdd: (100 / (amr + 100) * 100).toFixed(2),
                            decOdd: (amr / 100 + 1).toFixed(2),
                            fracOdd: decToFrac((amr / 100).toFixed(2))
                        });
                    } else if (amr <= -100) {
                        this.setState({
                            impOdd: (-amr / (-amr + 100) * 100).toFixed(2),
                            decOdd: (-100 / amr + 1).toFixed(2),
                            fracOdd: decToFrac((-100 / amr).toFixed(2))
                        });
                    }
                }
                break;
            case 'impOdd':
                let imp = Number.parseFloat(this.state.impOdd);
                if (isFinite(imp) && imp < 100 && imp > 0) {
                    this.setState({
                        decOdd: (100 / imp).toFixed(2),
                        fracOdd: decToFrac((100 / imp - 1).toFixed(2)),
                        amerOdd: imp <= 50 ? ((100 / imp - 1) * 100).toFixed(0) : (-100 / (100 / imp - 1)).toFixed(0)
                    });
                }
                break;
            default:
                break;
        }
    }


    render() {
        const { t } = this.props;

        const amrOdd = ({ target }) => {
            let amrValue = Number.parseInt(target.value);
            if (amrValue < 100 && amrValue > -100) {
                if (amrValue >= 0)
                    amrValue = 100;
                else
                    amrValue = -100;
            }

            if (isFinite(amrOdd))
                this.handleInputChange(target, amrValue);
        }

        const frcOdd = ({ target }) => {
            let reg = new RegExp(/^([1-9]+[0-9]*\.?[0-9]*)\/([1-9]+[0-9]*\.*[0-9]*)$/);
            if (!reg.test(target.value))
                this.setState({
                    [target.name]: ''
                });

        }

        const handleInputChange = ({ target }) => {
            this.setState({
                [target.name]: target.value
            }, () => this.calcOdd(target));
        }


        return (
            <div className='content'>
                <div className='odd-converter'>
                    <h1>{t('main:odd.title')}</h1>
                    <strong>{t('main:odd.descripiton')}</strong>

                    <div className='inputs interface'>
                        <LabelInput value={this.state.decOdd} label={t('common:forms.decimal-odd')} type='odd' symbol='X' onChange={this.handleInputChange} name='decOdd' min={1.01} />
                        <LabelInput value={this.state.impOdd} label={t('common:forms.implied-odd')} type='odd' symbol='%' onChange={this.handleInputChange} name='impOdd' min={0.01} max={99.99} />
                        <label>
                            {t('common:forms.american-odd')}
                            <div className='odd symbol'>
                                <input onBlur={amrOdd} onChange={handleInputChange} type='number' value={this.state.amerOdd} name='amerOdd' />
                            </div>
                        </label>
                        <label>
                            {t('common:forms.fractional-odd')}
                            <div className='odd symbol'>
                                <input onBlur={frcOdd} onChange={handleInputChange} type='text' value={this.state.fracOdd} name='fracOdd' placeholder='X/Y' />
                            </div>
                        </label>
                    </div>
                    <div className='outputs interface'>
                        <ResetButton label={t('common:forms.reset')} reset={this.handleInputChange} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation(['main', 'common'])(Odd);