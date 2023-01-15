import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom'
import { renderToString } from "react-dom/server";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import { Table } from 'smart-webcomponents-react/table';
import { CheckBox } from 'smart-webcomponents-react/checkbox';
import { Smart, Form, FormGroup, FormControl } from 'smart-webcomponents-react/form';
import { DropDownList, ListItem } from 'smart-webcomponents-react/dropdownlist';
import { NumberInput } from 'smart-webcomponents-react/numberinput';
import { Input } from 'smart-webcomponents-react/input';
import { RadioButton } from 'smart-webcomponents-react/radiobutton';
import { Button } from  'smart-webcomponents-react/button';

import SimpleReactValidator from 'simple-react-validator';

import { FaYenSign } from "react-icons/fa"
import { IoMdRemoveCircle, IoMdAddCircle } from "react-icons/io"

import './Construction.scss';

const Construction = (props) => {

  const constructionTable = useRef()

  const constructionColumns = [
    {
      label: 'Id',
      dataField: 'id',
      dataType: 'number',
      allowEdit: false,
      width: 100
    }, {
      label: 'Construction Name',
      dataField: 'name',
      dataType: 'string'
    }, {
      label: 'Edit',
      dataField: '',
      width: 100,
      allowSort: false,
      allowEdit: false,
      formatFunction(settings) {
        settings.template = renderToString(<a className="table_construction_delete_btn" data-id={settings.data.id}><IoMdRemoveCircle /></a>);
      }
    }
  ];
  
  const constructionData = new Smart.DataAdapter({
		dataSource: [{
      id: 1,
      name: 'awegsaewrg',
      sort: 1,
      house: 1,
    }, {
      id: 2,
      name: 'drthd',
      sort: 2,
      house: 1,
    }, {
      id: 3,
      name: 'dth',
      sort: 3,
      house: 1,
    }, {
      id: 4,
      name: 'myu',
      sort: 4,
      house: 1,
    }, {
      id: 5,
      name: 'drt',
      sort: 5,
      house: 1,
    }, {
      id: 6,
      name: 'u',
      sort: 6,
      house: 1,

    }],
		dataFields: [
			'id: number',
			'name: string',
			'sort: number',
      'house: number'
		]
	});

  const ConstructionTableInit = () => {
    const headerTemplate = document.createElement('template');
		headerTemplate.id = 'constructionHeader';

		headerTemplate.innerHTML = renderToString(
      <tr>
				<th></th>
				<th id="name_add_input"></th>
				<th id="construction_add_btn"></th>
			</tr>
    )

		document.body.appendChild(headerTemplate);

		constructionTable.current.headerRow = headerTemplate.id;

    ReactDOM.render(
      <Input className="table_name_add_input"/>,
      document.querySelector(`#name_add_input`)
    )
    ReactDOM.render(
      <a className="table_construction_add_btn" ><IoMdAddCircle /></a>,
      document.querySelector(`#construction_add_btn`)
    )
  }

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Company add </h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/"><i className="feather icon-home"></i></a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#!">Construction management</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/article">List of Properties</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="main-body">
        <div className="page-wrapper">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">list</h5>
                </div>
                <div className="card-body">
                  <Table 
                    id="construction_table"
                    ref={constructionTable}
                    dataSource={constructionData} 
                    // keyboardNavigation
                    paging
                    filtering
                    // tooltip={tooltip}
                    freezeHeader
                    columns={constructionColumns} 
                    columnMenu
                    editing
                    editMode="row"
                    sortMode='many'
                    onClick={(e) => handleConstructionTableClick(e)}
                    onLoad={() => ConstructionTableInit()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Construction