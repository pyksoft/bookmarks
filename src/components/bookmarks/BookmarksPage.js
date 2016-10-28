import React, {Component} from 'react';
import autoBind from 'react-autobind';
import BookmarksSearchFilter from './BookmarksSearchFilter';
import BookmarksList from './BookmarksList';

class BookmarksPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        autoBind(this);
    }

    render() {
        return (
            <div className="container">
                <div id="search">
                    <BookmarksSearchFilter searchString="searchString">
                    </BookmarksSearchFilter>
                </div>
                <div id="bookmarks-list">
                    <BookmarksList></BookmarksList>
                </div>
            </div>
        );
    }
}

export default BookmarksPage;
