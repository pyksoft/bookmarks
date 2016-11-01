import React, {Component} from 'react';
import './BookmarkItem.css';

const MAX_URL_DISPLAY_LENGTH = 50;

class BookmarkItem extends Component {
    render() {
        let displayTags = '';

        if(this.props.bookmark.tags && this.props.bookmark.tags.length) {
            for (let tag of this.props.bookmark.tags) {
                displayTags += `- ${tag.title} \n`;
            }
        }

        let displayBookmarkInfo = '';

        //let date = moment(this.bookmark.creationDate).format('D MMM YYYY');

        displayBookmarkInfo += `Created: ${this.props.bookmark.creationDate} \n`;

        if (this.props.bookmark.originalPath) {
            displayBookmarkInfo += `Original path: ${this.props.bookmark.originalPath}`;
        }

        let displayTitle = '';

        displayTitle += `${displayBookmarkInfo} \n`;

        if (displayTags) {
            displayTitle += `Tags: \n`;

            for (let tag of this.props.bookmark.tags) {
                displayTitle += `      - ${tag.title} \n`;
            }
        }

        let shortenedUrl = this.props.bookmark.url;

        if (shortenedUrl.length > MAX_URL_DISPLAY_LENGTH) {
            shortenedUrl = shortenedUrl.substring(0, MAX_URL_DISPLAY_LENGTH) + '...';
        }

        let openUrl = () => {
            console.log('todo');
        };

        let editClick = () => {
            this.props.editBookmarkAction(this.props.bookmark);
        };

        let deleteClick = () => {
            this.props.deleteBookmarkAction(this.props.bookmark.id);
        };

        let restoreClick = () => {
            this.props.restoreBookmarkAction(this.props.bookmark.id);
        };

        return (
            <div className="bookmark-row">
                <div className="bookmark-cell checkbox">
                    <input type="checkbox" id={this.props.bookmark.id} value={this.props.bookmark.id} />
                </div>

                <div className="bookmark-cell title">
                    <label htmlFor={this.props.bookmark.id} data-toggle="tooltip" title={displayTitle}>
                        {this.props.bookmark.title}
                    </label>
                </div>

                <div className="bookmark-cell url">
                    <a onClick={openUrl} target="_blank" data-toggle="tooltip" title={this.props.bookmark.url}>
                        {shortenedUrl}
                    </a>
                </div>

                <div className="bookmark-cell tags">
                    {this.props.bookmark.isTagged ? (
                        <span data-toggle="tooltip" title={displayTags}>
                            <i className="fa fa-search fa-flip-horizontal fa-lg"></i>
                        </span>
                    ) : <span data-toggle="tooltip" title="No tags for this bookmark.">
                            <i className="fa fa-minus fa-lg"></i>
                        </span>
                    }
                </div>

                <div className="bookmark-cell tools">
                    <div id="buttons-div">
                        <span>
                            <a onClick={editClick} title="Edit bookmark"><i className="fa fa-pencil fa-lg"></i></a>
                        </span>

                        <span className="actions-panel">
                            {this.props.bookmark.isDeleted ? (
                                <a onClick={restoreClick} title="Restore bookmark">
                                    <i className="fa fa-undo"></i>
                                </a>
                            ) : <a onClick={deleteClick} title="Delete bookmark">
                                    <i className="fa fa-trash-o fa-lg"></i>
                                </a>
                            }

                            <span data-toggle="tooltip" title={displayBookmarkInfo}>
                                <i className="fa fa-exclamation-circle fa-lg"></i>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

BookmarkItem.propTypes = {
    bookmark: React.PropTypes.object.isRequired,
    selectedBookmarks: React.PropTypes.array.isRequired,
    editBookmarkAction: React.PropTypes.func.isRequired,
    deleteBookmarkAction: React.PropTypes.func.isRequired,
    restoreBookmarkAction: React.PropTypes.func.isRequired
};

export default BookmarkItem;