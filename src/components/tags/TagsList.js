import React, {Component} from 'react';
import autoBind from 'react-autobind';
import ListAction from '../common/ListAction';
import Confirm from '../common/Confirm';
import TagItem from './TagItem';
import './TagsList.css';

class TagsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [
                { id: 1, title: "programming", description: ""},
                { id: 2, title: "Australia", description: ""},
                { id: 3, title: "informative", description: "interesting information"},
                { id: 4, title: "travel", description: ""},
                { id: 5, title: "news", description: ""}
            ],
            tagToDeleteId: null
        };

        autoBind(this);
    }

    addTag() {
        console.log('todo');
    }

    editTag(tag) {
        console.log('todo');
    }

    deleteTag(tagId) {
        console.log('todo');

        this.setState({
            tagToDeleteId: null
        });
    }

    confirmDeleteTag(id) {
        this.setState({
            tagToDeleteId: id
        });
    }

    cancelDeleteTag() {
        this.setState({
            tagToDeleteId: null
        });
    }

    get anyTags() {
        let tags = this.state.tags;
        return tags && tags.length;
    }

    render() {
        if (!this.anyTags) return (
            <div id="info-message">You do not have any tags.</div>
        );

        let deleteConfirmVisible = this.state.tagToDeleteId ? true : false;

        return (
            <div>
                <div className="tag-list-header">
                    <ListAction
                        action={this.addTag}
                        tooltip="Add new tag."
                        icon="fa-plus"
                    />
                </div>

                <div className="tag-list-body-header">
                    <div className="tag-row">
                        <div className="tag-cell title">Title</div>
                        <div className="tag-cell description">Description</div>
                        <div className="tag-cell tools"></div>
                    </div>
                </div>

                <div className="tag-list-body">
                    {
                        this.state.tags.map(tag => {
                            return <TagItem key={tag.id}
                                            tag={tag}
                                            editTagAction={this.editTag} 
                                            deleteTagAction={this.confirmDeleteTag} 
                            />
                        })
                    }
                </div>

                <Confirm visible={deleteConfirmVisible} action={this.deleteTag} close={this.cancelDeleteTag}/>
            </div>
        );
    }
}

export default TagsList;
