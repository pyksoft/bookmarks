import React, {Component} from 'react';
import autoBind from 'react-autobind';
import BookmarksSearchFilter from './BookmarksSearchFilter';
import BookmarksList from './BookmarksList';
import BookmarkStatistics from './BookmarkStatistics';
import './BookmarksPage.css';
import apiService from '../../services/apiService';
import settings from '../../services/settingsService';
import storage from '../../storage';

class BookmarksPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookmarks: [],
            tags: [],
            total: 0,
            searchQuery: storage.getState().searchQuery,
            stat: {
                totalBookmarksCount: 0,
                taggedBookmarksCount: 0,
                deletedBookmarksCount: 0
            }
        };

        autoBind(this);
    }

    async componentDidMount() {
        let tags = await apiService.getTags();

        this.setState({
            tags
        }, () => {
            this.loadData();
        });

        await this.loadStatistic();

        storage.state.on('update', () => {
            this.setState({
                searchQuery: storage.getState().searchQuery
            }, () => {
                this.loadData();
            });
        });
    }

    async loadData() {
        let data = await apiService.getBookmarks(this.state.searchQuery);

        let page = this.state.searchQuery.activePage;
        let pageNumber = Math.ceil(data.total / settings.PAGE_SIZE);

        //when delete the last element on the last page
        if (page > pageNumber) {
            page = pageNumber;

            return storage.searchQuery.setActivePage(page);
        }

        this.setState({
            bookmarks: data.dataItems,
            total: data.total
        });

        this.loadStatistic();
    }

    async loadTags() {
        let tags = await apiService.getTags();

        this.setState({
            tags
        });
    }

    async loadStatistic() {
        let stat = await apiService.getStatistic();

        this.setState({
            stat: {
                ...this.state.stat,
                totalBookmarksCount: stat.totalBookmarksCount,
                taggedBookmarksCount: stat.taggedBookmarksCount,
                deletedBookmarksCount: stat.deletedBookmarksCount
            }
        });
    }

    onPageChange(page) {
        storage.searchQuery.setActivePage(page);
    }

    onSortByChange(key) {
        storage.searchQuery.setSortBy(key);
    }

    onSortDirectionChange() {
        this.setState({
            searchQuery: {
                ...this.state.searchQuery,
                sortAsc: !this.state.searchQuery.sortAsc,
                activePage: 1
            }
        }, () => {
            this.loadData();
        });
    }

    onSearch(searchStr, searchMode, searchTags) {
        storage.searchQuery.setSearchParams(searchStr, searchMode, searchTags);
    }

    render() {
        return (
            <div className="container">
                <div id="search">
                    <BookmarkStatistics {...this.state.stat}/>

                    <BookmarksSearchFilter tags={this.state.tags}
                                           total={this.state.total}
                                           onSearch={this.onSearch}/>
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
                                   onLoadTags={this.loadTags}
                    />
                </div>
            </div>
        );
    }
}

export default BookmarksPage;
