import React, {Component} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';

class BookmarksPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        autoBind(this);
    }

    render() {
        return (
            <div>
                Tags Page
            </div>
        );
    }
}

export default BookmarksPage;
