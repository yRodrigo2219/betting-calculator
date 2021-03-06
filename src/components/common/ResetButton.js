import React from 'react';

export default function ResetButton(props) {
    const reset = () => {
        const inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++)
            props.reset(inputs[i], '');
    }

    return (
        <button onClick={reset}>{props.label}</button>
    );
}