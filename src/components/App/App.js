import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { injectGlobal } from 'styled-components';
import { closeSnackbar } from 'actions/appActions';

injectGlobal`
body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #0f0f0f;
}`

const snackbarStyle = {
  width: '500px',
  height: '60px',
};

const snackbarTextStyle = {
  fontSize: '18px',
};

const App = props => (
  <MuiThemeProvider muiTheme={healthcheckTheme}>
    <div>
      <Snackbar
        open={props.snackbarIsOpen}
        onRequestClose={props.closeSnackbar}
        message={props.snackbarMessage}
        onActionTouchTap={props.closeSnackbar}
        action="ok"
        autoHideDuration={4000}
        bodyStyle={snackbarStyle}
        contentStyle={snackbarTextStyle}
      />
    </div>
  </MuiThemeProvider>
);

const mapStateToProps = state => ({
	snackbarIsOpen: state.appReducer.snackbarIsOpen,
	snackbarMessage: state.appReducer.snackbarMessage,
});

const mapDispatchToProps = dispatch => ({
	closeSnackbar: () => {
		dispatch(closeSnackbar());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);