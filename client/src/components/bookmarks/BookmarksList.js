import React, {Component} from 'react';
import {Pagination, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';
import autoBind from 'react-autobind';
import './BookmarksList.css';
import ListAction from '../common/ListAction';
import Confirm from '../common/Confirm';
import BookmarkItem from './BookmarkItem';
import SaveBookmark from './SaveBookmark';
import apiService from '../../services/apiService';

class BookmarksList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookmarks: [],
            tags: [],
            total: 0,
            bookmarkToEdit: null,
            bookmarkToDeleteId: null,
            selectedBookmarks: [],
            allSelected: false,
            activePage: 1,
            sortBy: 'title',
            searchStr: ''
        };

        autoBind(this);
    }

    componentDidMount() {
        apiService.getTags()
            .then((tags) => {
                this.setState({
                    tags
                }, () => {
                    this.loadData();
                });
            });
    }

    loadData() {
        apiService.getBookmarks(this.state.activePage, this.state.sortBy, this.state.searchStr)
            .then((data) => {
                this.setState({
                    bookmarks: data.dataItems,
                    total: data.total
                })
            });
    }

    pageSelection(eventKey) {
        this.setState({
            activePage: eventKey
        }, () => {
            //after setSate is completed
            this.loadData();
        });
    }

    sortBy(key) {
        this.setState({
            sortBy: key,
            activePage: 1
        }, () => {
            this.loadData();
        });
    }

    addBookmark() {
        this.setState({
            bookmarkToEdit: {
                title: '',
                url: '',
                tags: []
            }
        });
    }

    editBookmark(bookmark) {
        this.setState({
            bookmarkToEdit: Object.assign({}, bookmark)
        });
    }

    addTagForBookmarks() {
        console.log('todo');
    }

    deleteBookmarks() {
        console.log('todo');
    }

    deleteBookmark() {
        this.setState({
            bookmarkToDeleteId: null
        });
        console.log('todo');
    }

    cancelDeleteBookmark() {
        this.setState({
            bookmarkToDeleteId: null
        });
    }

    confirmDeleteBookmark(id) {
        this.setState({
            bookmarkToDeleteId: id
        });
    }

    saveBookmark() {
        console.log('todo');

        this.setState({
            bookmarkToEdit: null
        });
    }

    cancelEditBookmark() {
        this.setState({
            bookmarkToEdit: null
        });
    }

    updateBookmarkState(field, value) {
        let bookmark = this.state.bookmarkToEdit;

        bookmark[field] = value;

        return this.setState({bookmarkToEdit: bookmark});
    }
    
    restoreBookmarkAction() {
        console.log('todo'); 
    }

    selectAllBookmarks() {
        this.setState({
            selectedBookmarks: []
        });

        if (!this.state.allSelected) {
            let selectedBookmarks = [];

            for (let bookmark of this.state.bookmarks) {
                selectedBookmarks.push(bookmark.id.toString());
            }

            this.setState({
                selectedBookmarks: selectedBookmarks
            });
        }
    }
    
    get anyBookmarks() {
        let bookmarks = this.state.bookmarks;
        return bookmarks && bookmarks.length;
    }

    get onlyOneSelected() {
        return this.state.selectedBookmarks.length !== 1;
    }

    get noSelection() {
        return this.state.selectedBookmarks.length === 0;
    }

    render() {
        let pageNumber = Math.ceil(this.state.total / 15);

        let sortByOptions = [
            {key: 'title', text: 'Title'},
            {key: 'lastEditDate', text: 'Last edit'},
            {key: 'creationDate', text: 'Created date'}
        ];

        let deleteConfirmVisible = this.state.bookmarkToDeleteId ? true : false;
        let editBookmarkVisible = this.state.bookmarkToEdit ? true : false;

        if (!this.anyBookmarks) return (
            <div id="message">No bookmarks</div>
        );
        
        return (
            <div>
                <div className="bookmark-list-header">
                    <div className="bookmarks-actions">
                        <ListAction
                            action={this.addBookmark}
                            tooltip="Add new bookmark."
                            icon="fa-plus"
                        />

                        <ListAction
                            action={this.editBookmark}
                            tooltip="Edit bookmark"
                            icon="fa-pencil"
                            disabled={this.onlyOneSelected}
                        />

                        <ListAction
                            action={this.addTagForBookmarks}
                            tooltip="Add tag for multiple bookmarks."
                            icon="fa-tag"
                            disabled={this.noSelection}
                        />

                        <ListAction
                            action={this.deleteBookmarks}
                            tooltip="Delete multiple bookmarks."
                            icon="fa-trash-o"
                            disabled={this.noSelection}
                        />
                    </div>
                    
                    <div>
                        <Pagination
                            bsSize="medium"
                            first
                            last
                            ellipsis
                            boundaryLinks
                            maxButtons={8}
                            items={pageNumber}
                            activePage={this.state.activePage}
                            onSelect={this.pageSelection}
                        />
                    </div>

                    <div id="sort-order">
                        <ButtonToolbar>
                            <DropdownButton bsSize="small" title="Sort By:" id="sort-by-dropdown">
                                {sortByOptions.map(item => {
                                    return (
                                        <MenuItem key={item.key} onClick={() => this.sortBy(item.key)}
                                                  active={this.state.sortBy === item.key}>{item.text}</MenuItem>
                                    )
                                })}
                            </DropdownButton>
                        </ButtonToolbar>
                    </div>
                </div>

                <div className="bookmark-list-body-header">
                    <div className="bookmark-row">
                        <div className="bookmark-cell checkbox">
                            <input type="checkbox" onClick={() => this.selectAllBookmarks} value={this.state.allSelected} />
                        </div>
                        <div className="bookmark-cell title">Title</div>
                        <div className="bookmark-cell url">Url</div>
                        <div className="bookmark-cell tags">Tags</div>
                        <div className="bookmark-cell tools"></div>
                        <div className="bookmark-cell info"></div>
                    </div>
                </div>

                <div className="bookmark-list-body">
                    {
                        this.state.bookmarks.map(bookmark => {
                            return <BookmarkItem key={bookmark.id}
                                                 bookmark={bookmark}
                                                 selectedBookmarks={this.state.selectedBookmarks}
                                                 editBookmarkAction={this.editBookmark}
                                                 deleteBookmarkAction={this.confirmDeleteBookmark}
                                                 restoreBookmarkAction={this.restoreBookmarkAction}
                            />
                        })
                    }
                </div>

                <Confirm visible={deleteConfirmVisible} action={this.deleteBookmark} close={this.cancelDeleteBookmark} />
                
                <SaveBookmark visible={editBookmarkVisible} bookmark={this.state.bookmarkToEdit} tags={this.state.tags}
                              save={this.saveBookmark} close={this.cancelEditBookmark} onChange={this.updateBookmarkState} />
            </div>
        );
    }
}

export default BookmarksList;
