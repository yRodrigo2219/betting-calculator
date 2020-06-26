import React from 'react';

export default function LabelInput(props) {
    const fixedTwo = ({ target }) => {
        if (target.value !== '' && target.min !== '') {
            if (Number.parseFloat(target.min) > Number.parseFloat(target.value))
                target.value = target.min;
        }
        if (target.value !== '' && target.max !== '') {
            if (Number.parseFloat(target.max) < Number.parseFloat(target.value))
                target.value = target.max;
        }
        if (target.value !== '') {
            target.value = Number.parseFloat(target.value).toFixed(2);
        }

        if (props.onChange)
            props.onChange();
    };

    return (
        <label>
            {props.name}
            <div className={`${props.type} symbol`}>
                <span>{props.symbol}</span>
                <input onChange={props.onChange} className={props.className} onBlur={fixedTwo}
                    type='number' min={props.min} max={props.max} step={0.01} defaultValue={props.defaultValue}
                    readOnly={props.readOnly} />
            </div>
        </label>
    );
}