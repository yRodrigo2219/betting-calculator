import React from 'react';

import LabelInput from '../common/LabelInput';

export default function Kelly() {
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

    const resetKelly = () => {
        document.getElementsByClassName('balance')[0].value =
            document.getElementsByClassName('odds')[0].value =
            document.getElementsByClassName('prob')[0].value =
            document.getElementsByClassName('wager')[0].value =
            document.getElementsByClassName('wper')[0].value = '';

        document.getElementsByClassName('fkelly')[0].value = '1.00';
    }

    return (
        <div className='content'>
            <div className='kelly'>
                <h1>Kelly Criterion</h1>
                <strong>The Kelly criterion calculator can tell you the optimal, long term growth, bet sizing (but it is the user's responsibilities to find the right inputs).</strong>

                <div className='inputs interface'>
                    <LabelInput name='Balance' type='currency' symbol='$' onChange={calcKelly} className='balance' min={0} />
                    <LabelInput name='Odds' type='odd' symbol='X' onChange={calcKelly} className='odds' min={1.01} />
                    <LabelInput name='Win Probability' type='odd' symbol='%' onChange={calcKelly} className='prob' min={0} max={100} />
                    <LabelInput name='Fractional Kelly' type='odd' symbol='X' onChange={calcKelly} defaultValue='1.00' className='fkelly' min={0.01} max={1} />
                </div>
                <div className='outputs interface multi'>
                    <LabelInput name='Wager' type='currency' symbol='$' className='wager' readOnly />
                    <div>
                        <LabelInput name='Balance percentage' type='odd' symbol='%' className='wper' readOnly />
                        <button onClick={resetKelly}>Reset</button>
                    </div>
                </div>
            </div>
            <div className='explanation'>
                <h1>The Kelly Criterion</h1>
                <p>
                    The Kelly criterion is a formula for bet sizing that leads almost surely to higher wealth compared
                    to any other strategy in the long run (as the number of bets goes to infinity).
                    The Kelly bet size is found by maximizing the expected value of the logarithm of wealth, which is equivalent
                    to maximizing the expected geometric growth rate. The Kelly Criterion is to bet a predetermined fraction of
                    assets, and it can seem counterintuitive.
                </p>
                <h1>How is it calculated?</h1>
                <p>
                    For simple bets with two outcomes, one involving losing the entire amount bet, and the other involving winning the bet amount
                    multiplied by the payoff odds, the Kelly bet is: <strong>Balance% = ( Win% ) - ( Loss% / Net Odds )</strong>.
                </p>
                <p>
                    Here is important to note that <strong>Net Odds</strong> means the net result of the odd (e.g. a 2.40x odd has an 1.4 net odd).
                </p>
                <h1>So, what is the Fractional Kelly usage?</h1>
                <p>
                    The Fractional Kelly is a multiplier that can be used to get a safer approach, because the Kelly criterion result
                    can seem too much of a risk (mathematically it is designed to never get you bankrupt, but it count with an infinitely divisible
                    wager and unlimited amounts of bets).
                </p>
            </div>
        </div>
    );
}