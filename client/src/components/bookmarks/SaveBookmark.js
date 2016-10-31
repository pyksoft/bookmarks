import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import TagSelector from '../common/TagSelector';
import autoBind from 'react-autobind';

class SaveBookmark extends Component {
    constructor(props) {
        super(props);

        let tagsOptions = this.props.tags.map(tag => ({
            value: tag.title,
            label: tag.title
        }));

        this.state = {
            tagsOptions,
            errors: {}
        };

        autoBind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            errors: {}
        });
    }

    formIsValid() {
        let errors = {};
        let fieldIsRequired = 'Field is required.';
        let bookmark = this.props.bookmark;

        if (!bookmark.title) {
            errors.title = fieldIsRequired;
        }

        if (!bookmark.url) {
            errors.url = fieldIsRequired;
        }

        if (!this.validateUrl(bookmark.url)) {
            errors.url = 'Url is not valid.';
        }

        this.setState({errors: errors});

        return Object.keys(errors).length === 0;
    }

    validateUrl (url) {
        return /^(http:\/\/|https:\/\/)(.{4,})$/.test(url);
    }

    save() {
        if (!this.formIsValid()) return;

        this.props.save();
    }

    showTagModal() {
        console.log('todo');
    }

    render() {
        if (!this.props.bookmark) return null;

        let title = this.props.bookmark.id ? 'Edit bookmark' : 'Add bookmark';
        let btnText = this.props.bookmark.id ? 'Update' : 'Add';

        let selectedTags = this.state.tagsOptions.filter(to => {
            return this.props.bookmark.tags.indexOf(to.value) !== -1;
        });

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TextAreaInput
                            name="title"
                            rows={2}
                            isLargeText={true}
                            label="Title"
                            value={this.props.bookmark.title}
                            onChange={this.props.onChange}
                            placeholder="Title"
                            error={this.state.errors.title}
                        />

                        <TextInput
                            name="url"
                            label="Url"
                            value={this.props.bookmark.url}
                            onChange={this.props.onChange}
                            placeholder="Url"
                            error={this.state.errors.url}
                        />

                        <TagSelector
                            name="tags"
                            label="Tags"
                            multi={true}
                            options={this.state.tagsOptions}
                            value={selectedTags}
                            onChange={this.props.onChange}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.showTagModal}>Add new tag</Button>
                        <Button bsStyle="primary" onClick={this.save}>{btnText}</Button>
                        <Button onClick={this.props.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

SaveBookmark.propTypes = {
    save: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
    bookmark: React.PropTypes.object,
    tags: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired,
    visible: React.PropTypes.bool
};

export default SaveBookmark;