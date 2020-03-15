import React from 'react';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Dialog from '@material-ui/core/Dialog';
import {DialogContent, DialogContentText, Typography, IconButton, Tooltip} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Grid,} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextForm from '../specificationsForms/textFormSpacification';
import NumberForm from '../specificationsForms/numberFormSpasification';
import DateForm from '../specificationsForms/dateForm';
import ListForm from '../specificationsForms/listForm';

const useStyles = makeStyles({
  btn: {
    margin: 20,
  },
  AddBtn: {
    margin: 5,
  },
});

export default function SpacificationForm(props) {
  const {update, categoryId, addSpecification} = props
  const [open, setOpen] = React.useState(false);

  const classes = useStyles()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [showTextForm, setShowTextForm] = React.useState(false);
  const [showDefault, setShowDefault] = React.useState(true);
  const [showNumberForm, setShowNumberForm] = React.useState(false);
  const [showDateForm, setShowDateForm] = React.useState(false);
  const [showListForm, setShowListForm] = React.useState(false);

  const showTextFormAction = () => {
      setShowTextForm(!showTextForm)
      setShowDefault(false)
  }

  const showNumberFormAction = () => {
    setShowNumberForm(!showNumberForm)
    setShowDefault(false)
}

const showDateFormAction = () => {
  setShowDateForm(!showDateForm)
  setShowDefault(false)
}

const showListFormAction = () => {
  setShowListForm(!showListForm)
  setShowDefault(false)
}

  const [expanded, setExpanded] = React.useState(false);

  const expandText = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const expandNumber = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Button className={classes.btn} variant="contained" color="primary" onClick={handleClickOpen}>
        add specification
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
        <AppBar position="static">
        <Toolbar variant="dense">
        <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <Button 
          onClick={showTextFormAction}
          variant="contained" color="secondary">text</Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
          onClick={showNumberFormAction}
          variant="contained" color="secondary">number</Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button 
          onClick={showListFormAction}
          variant="contained" color="secondary">list</Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button
          onClick={showDateFormAction}
          variant="contained" color="secondary">date</Button>
        </Grid>
      </Grid>
        </Toolbar>
      </AppBar>
        </DialogTitle>
        {showDefault&&<DialogContent>
            <DialogContentText>
                Please Choose spesification type to show the form that you need
            </DialogContentText>
        </DialogContent>}

        {showTextForm &&<DialogContent>
            <ExpansionPanel expanded={expanded === 'text'} onChange={expandText('text')}>
            <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant='h6'>Text Specification</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <TextForm addSpecification={addSpecification} categoryId={categoryId} update={update}/>
        </ExpansionPanelDetails>
            </ExpansionPanel>
        </DialogContent>}
        

        {showNumberForm &&<DialogContent>
            <ExpansionPanel expanded={expanded === 'number'} onChange={expandNumber('number')}>
            <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant='h6'>Number Specification</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <NumberForm addSpecification={addSpecification} categoryId={categoryId} update={update}/>
        </ExpansionPanelDetails>
            </ExpansionPanel>
        </DialogContent>}

        {showDateForm &&<DialogContent>
            <ExpansionPanel expanded={expanded === 'date'} onChange={expandNumber('date')}>
            <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant='h6'>Date Specification</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <DateForm addSpecification={addSpecification} categoryId={categoryId} update={update}/>
        </ExpansionPanelDetails>
            </ExpansionPanel>
        </DialogContent>}

        {showListForm &&<DialogContent>
            <ExpansionPanel expanded={expanded === 'list'} onChange={expandNumber('list')}>
            <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant='h6'>List Specification</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <ListForm addSpecification={addSpecification} categoryId={categoryId} update={update}/>
        </ExpansionPanelDetails>
            </ExpansionPanel>
        </DialogContent>}

      </Dialog>
    </div>
  );
}