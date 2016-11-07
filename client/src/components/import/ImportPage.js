import React, {Component} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import toastr from 'toastr';
import Dropzone from 'react-dropzone';
import apiService from '../../services/apiService';
import settingsService from '../../services/settingsService';
import './ImportPage.css';
import {Button} from 'react-bootstrap';

class ImportPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            added: 0,
            skipped: 0,
            fileToImport: null
        };

        autoBind(this);
    }

    importAction(from) {
        let importAction = from === 'browser' ? apiService.importBrowserBookmarks : apiService.importBackupBookmarks;

        // TODO get real path
        let path = settingsService.importPath;

        importAction(path)
            .then(() => {
                toastr.success('Bookmarks was imported successfully');
            });
    }

    onDrop(acceptedFiles) {
        if (acceptedFiles.length) {
            this.setState({
                fileToImport: acceptedFiles[0]
            });
        }
    }

    importBookmarks() {
        let data = new FormData();
        data.append('bookmarks', this.state.fileToImport);

        let request = new Request('/api/import/browserBookmarks', {
            headers: new Headers({
                //'Content-Type': 'application/json'
            }),
            method: 'POST',
            body: data
        });

        return fetch(request)
            .then((response) => {
                //checkStatus(response);
                console.log('ok');
            })
            .catch((err) => {
                //handleError(err);
                console.log('error');
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
                        <Dropzone onDrop={this.onDrop} multiple={false}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>

                    </div>
                    <div className="col-xs-4 col-sm-height">
                        {this.state.fileToImport &&
                        <div>
                            <Button onClick={this.importBookmarks}>Import</Button>
                            {this.state.fileToImport.name}
                        </div>
                        }
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
