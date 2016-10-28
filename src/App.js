import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import toastr from 'toastr';
import autoBind from 'react-autobind';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        autoBind(this);
    }

    test() {
        toastr.success('Hey');
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <button onClick={this.test}>Test</button>
            </div>
        );
    }
}

export default App;
