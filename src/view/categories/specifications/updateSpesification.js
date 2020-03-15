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
import {Axios} from '../../axiosConfig';

const useStyles = makeStyles({
  btn: {
    margin: 20,
  },
  AddBtn: {
    margin: 5,
  },
});

export default function UpdateSpacification(props) {
  const {update, categoryId, updateSpecification} = props
  const [open, setOpen] = React.useState(false);
  const [spacificationArray, setSpacArray] = React.useState([]);

  const classes = useStyles()

  const handleClickOpen = () => {
    Axios.get(`/categories/${categoryId}/specifications`)
  .then(res => {
    setSpacArray(res.data.data)
    console.log(res.data.data)
  })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [showTextForm, setShowTextForm] = React.useState(false);
  const [showDefault, setShowDefault] = React.useState(true);
  const [showNumberForm, setShowNumberForm] = React.useState(false);

  const showTextFormAction = () => {
      setShowTextForm(!showTextForm)
      setShowDefault(false)
  }

  const showNumberFormAction = () => {
    setShowNumberForm(!showNumberForm)
    setShowDefault(false)
}

  const [expanded, setExpanded] = React.useState(false);

  const expandText = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const expandNumber = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const textsSpacArray = spacificationArray.filter((spac)=> {
    return spac.type === 'text'
})
console.log(textsSpacArray)

  const numberSpacArray = spacificationArray.filter((spac)=> {
      return spac.type === 'number'
  })
  console.log(numberSpacArray)

  return (
    <div>
      <Button className={classes.btn} variant="contained" color="primary" onClick={handleClickOpen}>
        update specification
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
          <Button variant="contained" color="secondary">list</Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Button variant="contained" color="secondary">date</Button>
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
          {textsSpacArray.map(spacification =>
             <ExpansionPanel expanded={expanded === spacification._id} onChange={expandText(spacification._id)}>
            <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant='h6'>Text Specification</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
         <TextForm update={update} updateSpecification={updateSpecification} textSpacification={spacification}/>
        </ExpansionPanelDetails>
            </ExpansionPanel>
            )}

        </DialogContent>}


        {showNumberForm &&<DialogContent>
          {numberSpacArray.map(spacification =>
             <ExpansionPanel expanded={expanded === spacification._id} onChange={expandText(spacification._id)}>
            <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant='h6'>Number Specification</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
         <NumberForm update={update} updateSpecification={updateSpecification} numberSpacification={spacification}/>
        </ExpansionPanelDetails>
            </ExpansionPanel>
            )}

        </DialogContent>}

      </Dialog>
    </div>
  );
}