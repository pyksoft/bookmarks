import React, {Component} from 'react';
import autoBind from 'react-autobind';
import ListAction from '../common/ListAction';
import Confirm from '../common/Confirm';
import TagItem from './TagItem';
import SaveTag from './SaveTag';
import './TagsList.css';
import tagService from '../../services/tagService';

class TagsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            tagToDeleteId: null,
            tagToEdit: null
        };

        autoBind(this);
    }

    componentDidMount() {
        tagService.getTags()
            .then((tags) => {
                this.setState({
                    tags
                });
            });
    }

    addTag() {
        this.setState({
            tagToEdit: Object.assign({}, {})
        });
    }

    editTag(tag) {
        this.setState({
            tagToEdit: Object.assign({}, tag)
        });
    }

    cancelEditTag() {
        this.setState({
            tagToEdit: null
        });
    }

    updateTagState(field, value) {
        let tag = this.state.tagToEdit;

        tag[field] = value;

        return this.setState({tagToEdit: tag});
    }

    saveTag() {
        console.log('todo');

        this.setState({
            tagToEdit: null
        });
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
        let editTagVisible = this.state.tagToEdit ? true : false;

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

                <Confirm visible={deleteConfirmVisible} action={this.deleteTag} close={this.cancelDeleteTag} />

                <SaveTag visible={editTagVisible} tag={this.state.tagToEdit} save={this.saveTag}
                         close={this.cancelEditTag} onChange={this.updateTagState} />
            </div>
        );
    }
}

export default TagsList;
