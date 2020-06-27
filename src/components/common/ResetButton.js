import React from 'react';

export default function ResetButton(props) {
    const reset = () => {
        const inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++)
            if (inputs[i].type === 'number')
                inputs[i].value = inputs[i].defaultValue;
    }

    return (
        <button onClick={reset}>{props.name}</button>
    );
}