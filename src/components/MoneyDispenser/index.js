import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    padding: '5px',
  },
};


class MoneyDispenser extends Component {
  state = {
    amount: '',
  }

  // handles change in form input field
  handleChange = fieldName => event => {
    this.setState({ [fieldName]: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state.amount);
  }

  render() {
    const { classes, dispensedNotes } = this.props;
    let totalNotes = 0;
    let dispensedNotesContent;
    if (dispensedNotes.length) {
      dispensedNotesContent = dispensedNotes.map((value) => {
        totalNotes += value.numberOfNotes;
        return (<ListItem key={value.denomination}><ListItemText primary={`${value.numberOfNotes} notes of Rs ${value.denomination}`} /></ListItem>)
      })
    }

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <h1>Welcome to ATM</h1>
              <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <TextField
                  id="amount"
                  label="Enter the Amount"
                  value={this.state.amount}
                  onChange={this.handleChange('amount')}
                  margin="normal"
                  type="number"
                />
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!this.state.amount}
                  >
                    Get Money
                  </Button>
                </div>
              </form>
            </Paper>
          </Grid>
          <Grid item xs>
            {this.props.dispensedNotes.length !== 0 && <Paper className={classes.paper}>
              <h4>You will get the following amount</h4>
              <List>{dispensedNotesContent}</List>
              <h4>Total notes dispensed: {totalNotes}</h4>
            </Paper>}
          </Grid>
        </Grid>
      </>
    );
  }
}

MoneyDispenser.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispensedNotes: PropTypes.array.isRequired,
};

export default withStyles(styles)(MoneyDispenser);
