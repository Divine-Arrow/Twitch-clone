import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import FlvJs from "flv.js";

import { fetchStream } from "../../actions";

class StreamShow extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    buildPlayer () {
        if(this.player || !this.props.stream) {
            return;
        }
        const { id } = this.props.match.params;
        this.player = FlvJs.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
        // this.player.play();
    }
    
    render() {
        if(!this.props.stream)
            return (<div>Loading...</div>)

        const { id, title, description } = this.props.stream;
        /* return (
            <div>
                <h1>{title}</h1>
                <video
                    ref={this.videoRef}
                    style={{width: '100%'}}
                    controls
                ></video>
                <p>Stream Id is: <strong>{id}</strong></p>
                <h5>{description}</h5>
            </div>
        ); */

        return(
            <div className="ui link cards">
                <div  style={{width: "100vw"}} className="card">
                    <div className="image">
                    {/* <img src="/images/avatar2/large/matthew.png"/> */}
                    <video
                        ref={this.videoRef}
                        style={{width: '100%'}}
                        controls
                    ></video>
                    </div>
                    <div className="content">
                        <div className="header">{title}</div>
                        <div className="meta">
                            <a>StreamId: <strong>{id}</strong></a>
                        </div>
                        <div className="description"> {description} </div>
                    </div>
                    <div className="extra content">
                    <span className="right floated"> 2000 Views </span>
                    <span> <i className="user icon"></i> 5 Live </span>
                    </div>
                </div>
            </div>
        )

        
    }
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps.match.params;
    return { stream: state.streams[id] };
}
 
export default connect(mapStateToProps, { fetchStream })(StreamShow);