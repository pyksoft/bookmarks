import React, {Component} from 'react';
import autoBind from 'react-autobind';
import './BookmarksSearchFilter.css';
import BookmarkSearchMode from './BookmarkSearchMode';
import TagSelector from '../common/TagSelector';

class BookmarksSearchFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchStr: '',
            searchMode: {
                noTags: {
                    id: 'no_tags',
                    active: false
                },
                tagsSelection: {
                    id: 'tag_selection',
                    active: false
                },
                deleted: {
                    id: 'deleted',
                    active: false
                }
            },
            selectedTags: [],
            tagsOptions: []
        };

        autoBind(this);
    }

    componentWillReceiveProps(nextProps) {
        let tagsOptions = nextProps.tags.map(tag => ({
            value: tag.id,
            label: tag.title
        }));

        this.setState({
            tagsOptions
        });
    }

    search() {
        let searchMode = '';
        
        for (let key of Object.keys(this.state.searchMode)) {
            let searchModeItem = this.state.searchMode[key];
            
            if(searchModeItem.active) {
                searchMode = searchModeItem.id;
            }
        }
        
        this.props.onSearch(this.state.searchStr, searchMode, this.state.selectedTags);
    }

    clear() {
        this.setState({
            searchStr: '',
            searchMode: {
                noTags: {
                    id: 'no_tags',
                    active: false
                },
                tagsSelection: {
                    id: 'tag_selection',
                    active: false
                },
                deleted: {
                    id: 'deleted',
                    active: false
                }
            },
            selectedTags: []
        }, () => {
            this.search();
        });
    }

    toggleSearchMode(id) {
        for (let key of Object.keys(this.state.searchMode)) {
            let searchModeItem = this.state.searchMode[key];
            if (searchModeItem.id === id) {
                searchModeItem.active = !searchModeItem.active;
            } else {
                searchModeItem.active = false;
            }
        }

        this.setState(this.state);
        this.setState({
            selectedTags: []
        });
    }

    updateState(field, value) {
        let selectedTags = this.state.tagsOptions.filter(to => {
            return value.indexOf(to.value) !== -1;
        });

        return this.setState({
            selectedTags
        });
    }

    render() {
        return (
            <div>
                <div className="col-xs-12 title-row">
                    <h3>Search</h3>
                </div>

                <div className="form-group">
                    <h4 className="col-xs-12">Filter:</h4>
                    <div className="col-xs-12">
                        <input type="text"
                               value={this.state.searchStr}
                               className="form-control"
                               onChange={(event) => {
                                   this.setState({
                                       searchStr: event.target.value
                                   });
                               }}
                               onKeyPress={(target) => {
                                   if (target.charCode === 13) {
                                       this.search();
                                   }
                               }}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <h4 className="col-xs-12" style={{marginTop: 30}}>Mode:</h4>

                    <BookmarkSearchMode title="New bookmarks (no tags)"
                                        id={this.state.searchMode.noTags.id}
                                        active={this.state.searchMode.noTags.active}
                                        onToggle={this.toggleSearchMode}>
                        Search for bookmarks with no tags. Useful when soring newly imported bookmarks.
                    </BookmarkSearchMode>
                    <BookmarkSearchMode title="Tags selection"
                                        id={this.state.searchMode.tagsSelection.id}
                                        active={this.state.searchMode.tagsSelection.active}
                                        onToggle={this.toggleSearchMode}>

                        <TagSelector
                            name="tags"
                            label="Select tags:"
                            multi={true}
                            options={this.state.tagsOptions}
                            value={this.state.selectedTags}
                            onChange={this.updateState}
                        />
                    </BookmarkSearchMode>
                    <BookmarkSearchMode title="Deleted bookmarks"
                                        id={this.state.searchMode.deleted.id}
                                        active={this.state.searchMode.deleted.active}
                                        onToggle={this.toggleSearchMode}>
                        Search for deleted bookmarks.
                    </BookmarkSearchMode>
                </div>

                <div className="form-group">
                    <div className="col-xs-12 results-row">
                        Results found: <strong>{this.props.total}</strong>
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
