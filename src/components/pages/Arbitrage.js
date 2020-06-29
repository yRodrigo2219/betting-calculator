import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

class Arbitrage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(target, value) {
        this.setState({
            [target.name]: value
        }, this.calcArbitrage);
    }

    calcArbitrage() {

    }

    render() {
        const { t } = this.props;

        return (
            <div className='content'>
                <div className='Arbitrage'>
                    <h1>{t('main:arbitrage.title')}</h1>
                    <strong>{t('main:arbitrage.description')}</strong>

                    <div className='inputs interface'>

                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation(['main', 'common'])(Arbitrage);