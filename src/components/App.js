import React, {Component} from 'react';
import '../App.css';
import toastr from 'toastr';
import autoBind from 'react-autobind';
import Navigation from './Navigation';
import BookmarksPage from './bookmarks/BookmarksPage';
import TagsPage from './tags/TagsPage';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 'Bookmarks'
        };

        autoBind(this);
    }

    onPageChange(page) {
        this.setState({
            currentPage: page
        });
    }

    renderPage() {
        switch (this.state.currentPage){
            case 'Bookmarks':
                return (
                    <BookmarksPage/>
                );
            case 'Tags':
                return (
                    <TagsPage/>
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div id="wrapper">
                <Navigation onPageChange={this.onPageChange}></Navigation>

                <div id="main">
                    {this.renderPage()}
                </div>
            </div>
        );
    }
}

export default App;
