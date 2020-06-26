import React from 'react';

import LabelInput from '../common/LabelInput';

export default function EValue() {
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

    const resetEV = () => {
        document.getElementsByClassName('wager')[0].value =
            document.getElementsByClassName('odds')[0].value =
            document.getElementsByClassName('prob')[0].value =
            document.getElementsByClassName('evalue')[0].value = '';
    }

    return (
        <div className='content'>
            <div className='ev'>
                <h1>Expected Value</h1>
                <strong>Using the expected value calculator allows you to see what you can expect to recieve from a bet based on the probability of that outcome occurring.</strong>

                <div className='inputs interface'>
                    <LabelInput name='Wager' type='currency' symbol='$' onChange={calcEV} className='wager' min={0} />
                    <LabelInput name='Odds' type='odd' symbol='X' onChange={calcEV} className='odds' min={1} />
                    <LabelInput name='Win Probability' type='odd' symbol='%' onChange={calcEV} className='prob' min={0} max={100} />
                </div>
                <div className='outputs interface'>
                    <LabelInput name='Expected' type='currency' symbol='$' className='evalue' readOnly />
                    <button onClick={resetEV}>Reset</button>
                </div>
            </div>
            <div className='explanation'>
                <h1>Expected Value Definition</h1>
                <p>
                    Expected value is the amount of money you can expect to win or lose if you placed the same bet on
                    the same event at the same probability an infinite number of times. Of course,
                    events are only played once in sports betting, so they may lose, but if you’re making bets
                    with positive expected value (+EV), you should win in the long run.
                </p>
                <h1>How do you calculate expected value?</h1>
                <p>
                    Take the (Probability of Win x Money Won per Bet) - (Probability of Loss x Money Lost per Bet).
                </p>
                <p>
                    Let’s say you were flipping a coin against a friend for $10 and you choose heads.
                    Since the probability of each side is 50%, your expected value is 0.
                </p>
                <p>
                    But then your friend decides to offer you 2.5 odds on heads, so you’ll win $15.
                    Now you have a +EV bet, because your probability of winning is better than the odds you’re being offered.
                </p>
            </div>
        </div>
    );
}