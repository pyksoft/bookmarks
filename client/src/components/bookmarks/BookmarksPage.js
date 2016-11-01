import React, {Component} from 'react';
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
        this.setState({
            searchQuery: {
                activePage: page
            }
        }, () => {
            //after setSate is completed
            this.loadData();
        });
    }

    onSortByChange(key) {
        this.setState({
            searchQuery: {
                sortBy: key,
                activePage: 1
            }
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
                    />
                </div>
            </div>
        );
    }
}

export default BookmarksPage;
