import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import './scss/main.scss';


class App extends React.Component {

    state = {
        step: 1
    }


    render() {
        return (
            <Login />
        )

    }
}


ReactDOM.render(
    <App />,
    document.getElementById('root')
)