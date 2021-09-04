import { useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';

import BasePage01 from '../base/base01';

export function DashboardScreen1() {
  useEffect(() => {
    console.log('updated component');
    // getAuthDetails().then((response) => {
    // console.log(response);
    // });
  });

  return (
    <div>
      <BasePage01 title="Sales Dashboard" crumb={['Dashboards', 'Sales']}>
        <Card>
          <CardContent>Dashboards</CardContent>
        </Card>
      </BasePage01>
    </div>
  );
}
