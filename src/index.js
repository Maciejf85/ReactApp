import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import Contact from './components/contact';
import NotFound from './components/notFound';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';
import './scss/main.scss';



class App extends React.Component {

    state = {
        step: 1
    }


    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/' component={Contact} />
                    <Route component={NotFound} />
                </Switch>
            </HashRouter>
        );

    }
}





ReactDOM.render(
    <App />,
    document.getElementById('root')
)