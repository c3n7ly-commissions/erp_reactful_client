import React from 'react';
import { Typography, Card, CardContent } from '@material-ui/core';
import BasePage01 from './base01';

function BlankScreen01() {
  return (
    <BasePage01
      crumb={['Blanks', 'Blank 01']}
      title="Blank 01"
      actions={<Typography variant="span">Actions</Typography>}
    >
      <Card>
        <CardContent>
          <Typography paragraph>Content goes here</Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </CardContent>
      </Card>
    </BasePage01>
  );
}

export default BlankScreen01;
