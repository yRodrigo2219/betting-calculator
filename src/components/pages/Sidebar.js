import React from 'react';
import { useTranslation } from "react-i18next";

import MenuButton from '../common/MenuButton';
import { ReactComponent as Wallet } from '../../assets/wallet.svg';
import { ReactComponent as Odd } from '../../assets/odd.svg';
import { ReactComponent as Whistle } from '../../assets/whistle.svg';
import { ReactComponent as Home } from '../../assets/home.svg';
import { ReactComponent as Percentage } from '../../assets/percentage.svg';
import { ReactComponent as Pie } from '../../assets/pie.svg';
import { ReactComponent as Chart } from '../../assets/chart.svg';

import './Sidebar.css';

export default function Sidebar() {
    const { t } = useTranslation('common');

    return (
        <div className='sidebar'>
            <div>
                <MenuButton to='/odd' svg={Odd} name={t('menu.odd')} />
                <MenuButton to='/hedge' svg={Wallet} name={t('menu.hedge')} />
                <MenuButton to='/arbitrage' svg={Whistle} name={t('menu.arbitrage')} />
                <MenuButton to='/hold' svg={Percentage} name={t('menu.hold')} />
                <MenuButton to='/kelly' svg={Pie} name={t('menu.kelly')} />
                <MenuButton to='/evalue' svg={Chart} name={t('menu.evalue')} />
            </div>
            <div>
                <MenuButton exact to='/' svg={Home} name={t('menu.home')} />
            </div>
        </div>
    );
}