import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Sidebar from './components/pages/Sidebar';
import Odd from './components/pages/Odd';
import Hedge from './components/pages/Hedge';
import Arbitrage from './components/pages/Arbitrage';
import Hold from './components/pages/Hold';
import Home from './components/pages/Home';
import Kelly from './components/pages/Kelly';
import EValue from './components/pages/EValue';

export default function Routes() {
    return (
        <BrowserRouter basename='betting-calculator'>
            <Sidebar />
            <Switch>
                <Route path='/odd'>
                    <Odd />
                </Route>
                <Route path='/hedge'>
                    <Hedge />
                </Route>
                <Route path='/arbitrage'>
                    <Arbitrage />
                </Route>
                <Route path='/hold'>
                    <Hold />
                </Route>
                <Route path='/kelly'>
                    <Kelly />
                </Route>
                <Route path='/evalue'>
                    <EValue />
                </Route>
                <Route path='/'>
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}