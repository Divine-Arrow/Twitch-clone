import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions/index';

class StreamDelete extends Component {
    
    state = { cancelRedirectUrl: '/' };
    
    componentDidMount() {
        const streamId = this.props.match.params.id;
        this.props.fetchStream(streamId);
    }
    
    renderActions () {
        const { id } = this.props.match.params;
        return (
            <>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to={this.state.cancelRedirectUrl} className="ui button">Cancel</Link>
            </>
        )
    }
    
    renderContent() {
        if(this.props.stream) 
            return `Are you sure you want to delete this Stream with Title: ${this.props.stream.title}?`;
        return `Are you sure you want to delete this Stream ?`;
    }

    render() { 
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push(this.state.cancelRedirectUrl)}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const streamId = ownProps.match.params.id;
    return {stream: state.streams[streamId]};
}
 
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);