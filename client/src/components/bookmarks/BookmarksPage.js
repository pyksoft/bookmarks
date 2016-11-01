import React, {Component} from 'react';
import update from 'react-addons-update';
import autoBind from 'react-autobind';
import BookmarksSearchFilter from './BookmarksSearchFilter';
import BookmarksList from './BookmarksList';
import BookmarkStatistics from './BookmarkStatistics';
import './BookmarksPage.css';
import apiService from '../../services/apiService';

class BookmarksPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookmarks: [],
            tags: [],
            total: 0,
            searchQuery: {
                activePage: 1,
                sortBy: 'title',
                sortAsc: true,
                searchStr: ''
            },
            stat: {
                totalBookmarksCount: 0,
                taggedBookmarksCount: 0,
                deletedBookmarksCount: 0
            }
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
        apiService.getBookmarks(this.state.searchQuery)
            .then((data) => {
                this.setState({
                    bookmarks: data.dataItems,
                    total: data.total
                })
            });
    }

    onPageChange(page) {
        let searchQuery = update(this.state.searchQuery, {
            activePage: {$set: page}
        });
        
        this.setState({
            searchQuery
        }, () => {
            //after setSate is completed
            this.loadData();
        });
    }

    onSortByChange(key) {
        let searchQuery = update(this.state.searchQuery, {
            sortBy: {$set: key},
            activePage: {$set: 1}
        });

        this.setState({
            searchQuery
        }, () => {
            this.loadData();
        });
    }

    onSortDirectionChange() {
        let searchQuery = update(this.state.searchQuery, {
            sortAsc: {$set: !this.state.searchQuery.sortAsc},
            activePage: {$set: 1}
        });

        this.setState({
            searchQuery
        }, () => {
            this.loadData();
        });
    }

    render() {
        return (
            <div className="container">
                <div id="search">
                    <BookmarkStatistics {...this.state.stat}/>
                    <BookmarksSearchFilter/>
                </div>
                <div id="bookmarks-list">
                    <BookmarksList bookmarks={this.state.bookmarks}
                                   total={this.state.total}
                                   tags={this.state.tags}
                                   searchQuery={this.state.searchQuery}
                                   onPageChange={this.onPageChange}
                                   onSortByChange={this.onSortByChange}
                                   onSortDirectionChange={this.onSortDirectionChange}
                                   onLoadData={this.loadData}
                    />
                </div>
            </div>
        );
    }
}

export default BookmarksPage;
