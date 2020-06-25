import React from 'react';

import './EValue.css';

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

    const fixedTwo = ({ target }) => {
        if (target.value !== '' && target.max !== '') {
            if (Number.parseFloat(target.max) < Number.parseFloat(target.value))
                target.value = target.max

        }
        if (target.value !== '') {
            target.value = Number.parseFloat(target.value).toFixed(2);
        }

        calcEV();
    }

    const restEV = () => {
        document.getElementsByClassName('wager')[0].value =
            document.getElementsByClassName('odds')[0].value =
            document.getElementsByClassName('prob')[0].value =
            document.getElementsByClassName('evalue')[0].value = '';
    }

    return (
        <div className='content ev'>
            <h1>Expected Value</h1>
            <strong>Using the expected value calculator allows you to see what you can expect to recieve from a bet.</strong>


            <div className='inputs interface'>
                <label>Wager<label className='currency symbol'><span>$</span><input onChange={calcEV} className='wager' onBlur={fixedTwo} type='number' min={0} step={0.01} /></label></label>
                <label>Odds<label className='odd symbol'><span>X</span><input onChange={calcEV} className='odds' onBlur={fixedTwo} type='number' min={1} step={0.01} max={999} /></label></label>
                <label>Win Probability<label className='odd symbol'><span>%</span><input onChange={calcEV} className='prob' onBlur={fixedTwo} type='number' min={0} step={0.01} max={100} /></label></label>
            </div>
            <div className='outputs interface'>
                <label>Expected<label className='currency symbol'><span>$</span><input className='evalue' readOnly type='number' min={0} step={0.01} /></label></label>
                <button onClick={restEV}>Reset</button>
            </div>
        </div>
    );
}