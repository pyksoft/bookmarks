import React, {Component} from 'react';
import '../App.css';
//import toastr from 'toastr';
import autoBind from 'react-autobind';
import Navigation from './Navigation';
import BookmarksPage from './bookmarks/BookmarksPage';
import TagsPage from './tags/TagsPage';
import ImportPage from './import/ImportPage';
import SettingsPage from './settings/SettingsPage';
import HelpPage from './help/HelpPage';

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
            case 'Import':
                return (
                    <ImportPage/>
                );
            case 'Settings':
                return (
                    <SettingsPage/>  
                );
            case 'Help':
                return (
                    <HelpPage/>
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
