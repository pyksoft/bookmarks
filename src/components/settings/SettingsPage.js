import React, {Component} from 'react';
import autoBind from 'react-autobind';
import './SettingsPage.css';

class SettingsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dbPath: '',
            defaultDbPath: ''
        };

        autoBind(this);
    }

    updateDbPath() {
        console.log('todo');
    }

    clearDbPath() {
        console.log('todo');
    }

    render() {
        let dbLocationLabel = '';
        
        let isCustom = (this.state.dbPath && this.state.dbPath !== this.state.defaultDbPath);

        if (isCustom) {
            dbLocationLabel = this.state.dbPath;
        } else {
            dbLocationLabel = `${this.state.defaultDbPath} (default)`;
        }
        
        return (
            <div id="panel">
                <div className="col-xs-12 form-group">
                    <div className="col-xs-5 text-right">
                        DB location:
                    </div>
                    <div className="col-xs-3">
                        {dbLocationLabel}
                    </div>
                </div>

                <div className="col-xs-12 form-group">
                    <div className="col-xs-5 text-right">
                        <button className="btn btn-default" onClick={this.updateDbPath}>Change</button>
                    </div>
                    <div className="col-xs-3 col-sm-height">
                        <button className="btn btn-default" onClick={this.clearDbPath}>Clear</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SettingsPage;
