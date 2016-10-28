import React, {Component} from 'react';
import autoBind from 'react-autobind';
import Todo from '../Todo';
import './BookmarksSearchFilter.css';

class BookmarksSearchFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foundBookmarksCount: 0,
            totalBookmarksCount: 0,
            taggedBookmarksCount: 0,
            deletedBookmarksCount: 0
        };

        autoBind(this);
    }

    search() {
        console.log('todo');
    }

    clear() {
        console.log('todo');
    }

    render() {
        return (
            <div>
                <div className="col-xs-12 title-row">
                    <h3>Statistics</h3>
                </div>
                <div className="col-xs-12 statistic-row">
                    All bookmarks: <strong>{this.state.totalBookmarksCount}</strong>
                </div>
                <div className="col-xs-12 statistic-row">
                    Tagged bookmarks: <strong>{this.state.taggedBookmarksCount}</strong>
                </div>
                <div className="col-xs-12 statistic-row">
                    Deleted bookmarks: <strong>{this.state.deletedBookmarksCount}</strong>
                </div>

                <div className="col-xs-12 title-row">
                    <h3>Search</h3>
                </div>

                <div className="form-group">
                    <h4 className="col-xs-12">Filter:</h4>
                    <div className="col-xs-12">
                        <input type="text" className="form-control"/>
                    </div>
                </div>
                <Todo>Implement mode selection</Todo>

                <div className="form-group">
                    <div className="col-xs-12 results-row">
                        Results found: <strong>{this.state.foundBookmarksCount}</strong>
                    </div>
                    <div className="col-xs-12 search-actions">
                        <button id="btn-search" className="btn btn-primary" onClick={this.search}>Search</button>
                        <button id="btn-clear" className="btn btn-default" onClick={this.clear}>Clear</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BookmarksSearchFilter;
