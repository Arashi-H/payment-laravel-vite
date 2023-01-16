import React, { memo } from 'react';
import { pure } from 'recompose';
import { DropDownList, ListItem } from 'smart-webcomponents-react/dropdownlist';

import './AutoConstruction.scss'

const AutoConstruction = (props) => {
  return (
    <DropDownList className="budget_add_input" selectedIndexes={[0]} filterable>
      {
        props.constructions.map((construction, idx) => {
          if(idx < 100) {
            return <ListItem value={"" + construction.id} key={idx}>{construction.name}</ListItem>
          }
        })
      }
    </DropDownList>
  )
}

// Wrap component using the `pure` HOC from recompose
export default memo(AutoConstruction);