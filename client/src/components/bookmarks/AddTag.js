import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import TagSelector from '../common/TagSelector';
import autoBind from 'react-autobind';

class AddTag extends Component {
    constructor(props) {
        super(props);

        let tagsOptions = this.props.tags.map(tag => ({
            value: tag.id,
            label: tag.title
        }));
        
        this.state = {
            tagsOptions,
            selectedTags: []
        };

        autoBind(this);
    }


    updateSelectedTagState(field, value) {
        let selectedTags = this.state.tagsOptions.filter(to => {
            return this.props.tags.indexOf(to.value) !== -1;
        });

        return this.setState({
            selectedTags
        });
    }

    render() {
        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Add tag</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{minHeight: 200}}>
                        <TagSelector
                            name="tags"
                            label="Select tags"
                            multi={true}
                            options={this.state.tagsOptions}
                            value={this.state.selectedTags}
                            onChange={this.updateSelectedTagState}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.props.save}>Update</Button>
                        <Button onClick={this.props.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

AddTag.propTypes = {
    save: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
    tags: React.PropTypes.array,
    visible: React.PropTypes.bool
};

export default AddTag;