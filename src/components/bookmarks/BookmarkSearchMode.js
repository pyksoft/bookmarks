import React, {Component} from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './BookmarkSearchMode.css';

class BookmarkSearchMode extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        autoBind(this);
    }

    onToggle() {
        if (this.props.onToggle) this.props.onToggle(this.props.id);
    }

    render() {
        let headerClass = classnames({
            'header': true,
            'col-xs-12': true,
            'header-active': this.props.active
        });

        let iconClass = classnames({
            'fa': true,
            'fa-check-circle-o': this.props.active,
            'fa-circle-o': !this.props.active
        });

        return (
            <div className={headerClass}>
                <i className={iconClass}></i>

                <span onClick={this.onToggle}>{this.props.title}</span>

                {this.props.active ? (
                    <div className="content">
                        {this.props.children}
                    </div>
                ) : null}
            </div>
        );
    }
}

export default BookmarkSearchMode;