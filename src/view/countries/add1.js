import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Layout from '../../layOut';
import Details from './detailsForm';
import Card from './card'

const useStyles = makeStyles(theme => ({
  root: {
    
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Layout>
        <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <Card />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <Details />
        </Grid>
      </Grid>
    </div>
    </Layout>
  );
};

export default Account;