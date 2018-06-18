import React from 'react';
import { Meteor } from 'meteor/meteor';

import Header from './Header';

export default () => {
    return <div>
      <div>
        <Header title="Notes"/>
        <div className="page-content">
        </div>
      </div>
    </div>
};
