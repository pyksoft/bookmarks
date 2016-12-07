import React, {Component} from 'react';
import autoBind from 'react-autobind';
import BookmarksSearchFilter from './BookmarksSearchFilter';
import BookmarksList from './BookmarksList';
import BookmarkStatistics from './BookmarkStatistics';
import './BookmarksPage.css';
import apiService from '../../services/apiService';
import settings from '../../services/settingsService';

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
                searchStr: '',
                searchMode: '',
                searchTags: []
            },
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
    }

    async loadData() {
        let data = await apiService.getBookmarks(this.state.searchQuery);

        let page = this.state.searchQuery.activePage;
        let pageNumber = Math.ceil(data.total / settings.PAGE_SIZE);

        //when delete the last element on the last page or add first element
        if (page > pageNumber || (page === 0 && data.total === 1)) {
            page = pageNumber;

            return this.setState({
                searchQuery: Object.assign({}, this.state.searchQuery, {
                    activePage: page
                })
            }, () => {
                //load data again with updated page
                this.loadData();
            });
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
        this.setState({
            searchQuery: {
                ...this.state.searchQuery,
                activePage: page
            }
        }, () => {
            this.loadData();
        });
    }

    onSortByChange(key) {
        this.setState({
            searchQuery: {
                ...this.state.searchQuery,
                sortBy: key,
                activePage: 1
            }
        }, () => {
            this.loadData();
        });
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
        this.setState({
            searchQuery: Object.assign({}, this.state.searchQuery, {
                activePage: 1,
                searchStr,
                searchMode,
                searchTags
            })
        }, () => {
            this.loadData();
        });
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
