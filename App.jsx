import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import {
    Container
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import "react-tabs/style/react-tabs.css";
import 'assets/common_styles/style.scss';
import Header from './src/pages/Header/header';
import Home from './src/pages/Home/home';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Container className='p-2'>
                        <Switch>
                            <Route path='/home' exact component={Home} />
                            <Route path='/messages' exact component={Home} />
                            <Route path='/notifications' exact component={Home} />
                            <Route path='/moments' exact component={Home} />
                            <Redirect to='/home' />
                        </Switch>
                    </Container>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;