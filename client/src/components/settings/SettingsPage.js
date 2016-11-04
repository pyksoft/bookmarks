import React, {Component} from 'react';
import autoBind from 'react-autobind';
import toastr from 'toastr';
import apiService from '../../services/apiService';
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

    componentDidMount() {
        apiService.getDbPath()
            .then((data) => {
                this.setState({
                    dbPath: data.dbPath,
                    defaultDbPath: data.defaultDbPath
                });
            });
    }

    updateDbPath() {
        console.log('todo');
    }

    clearDbPath() {
        apiService.updateDbPath('')
            .then(() => {
                toastr.success('Database location was changed. Please, reopen application.');
            });
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
