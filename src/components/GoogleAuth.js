import { Component} from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

    componentDidMount () {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                clientId: '612433648541-gcshmtc9n1mavuvrfdcpkku7dvpnirs8.apps.googleusercontent.com',
                scope: 'email'
            })
            .then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    };

    onAuthChange = (isSignedIn) => { 
        if(isSignedIn) this.props.signIn(this.auth.currentUser.get().getId());
        else this.props.signOut();
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if(this.props.isSignedIn === null)
            return null;
        else if(this.props.isSignedIn)
            return (
                <div onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    SignOut
                </div>
            )
        else
            return (
                <div onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>
                    SignIn
                </div>
            )
    };
    
    render() { 
        return ( <div>{this.renderAuthButton()}</div> );
    };
};
 

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
};

export default connect( mapStateToProps, { signIn, signOut })(GoogleAuth);