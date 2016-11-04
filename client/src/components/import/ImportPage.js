import React, {Component} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import toastr from 'toastr';
import apiService from '../../services/apiService';
import settingsService from '../../services/settingsService';
import './ImportPage.css';

class ImportPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            added: 0,
            skipped: 0
        };

        autoBind(this);
    }

    importAction(from) {
        let importAction = from === 'browser' ? apiService.importBrowserBookmarks : apiService.importBackupBookmarks;

        // TODO get real path
        let path  = settingsService.importPath;
        
        importAction(path)
            .then(() => {
                toastr.success('Bookmarks was imported successfully');
            });
    }

    exportBookmarks() {
        // TODO get real path
        let path  = settingsService.exportPath;
        
        apiService.exportBookmarks(path)
            .then(() => {
                toastr.success('Bookmarks was exported successfully');
            });
    }

    render() {
        let resultClass = classnames({
            'col-xs-12': true,
            'form-group': true,
            'display-none': this.state.added === 0 && this.state.skipped === 0
        });

        return (
            <div id="import-div">
                <div className="col-xs-12 form-group">
                    <div className="col-xs-5 import-row">
                        From browser bookmarks - bookmarks will be merged
                    </div>
                    <div className="col-xs-3 col-sm-height">
                        <button className="btn btn-default" onClick={() => this.importAction('browser')}>Import bookmarks</button>
                    </div>
                </div>

                <div className="col-xs-12 form-group">
                    <div className="col-xs-5 import-row">
                        From backup file - bookmarks will be overridden
                    </div>
                    <div className="col-xs-3">
                        <button className="btn btn-default" onClick={() => this.importAction('backup')}>Import from backup</button>
                    </div>
                </div>

                <div className="col-xs-12 form-group">
                    <div className="col-xs-5 import-row">
                        Export to backup file
                    </div>
                    <div className="col-xs-3">
                        <button className="btn btn-default" onClick={() => this.exportBookmarks}>Export to backup</button>
                    </div>
                </div>

                <div className={resultClass}>
                    <h3>Import results</h3>

                    <p>Added: {this.state.added}</p>
                    <p>Skipped: {this.state.skipped}</p>
                </div>
            </div>
        );
    }
}

export default ImportPage;
