import React, { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom'
import { renderToString } from "react-dom/server";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'

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

import {
  startAction,
  endAction,
  showToast
} from '../../actions/common'
import { logout } from "../../actions/auth";
import agent from '../../api/'

const Construction = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  let { house } = useParams();
  const [constructions, setConstructions] = useState([])
  const [addConstruction, setAddConstruction] = useState({
    name: '',
    house: house
  })
  const [editConstruction, setEditConstruction] = useState({})

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
		dataSource: constructions,
		dataFields: [
			'id: number',
			'name: string',
			'sort: number',
      'house: number'
		]
	});

  useEffect(() => {
    async function getConstructionData() {
      dispatch(startAction())
      try {
        const resConstruction = await agent.common.getConstruction(house)
        console.log('resConstruction data=', resConstruction.data.data)
        // if (resConstruction.data.success) {
          setConstructions([...resConstruction.data.data])
        // }
        dispatch(endAction())
      } catch (error) {
        if (error.response.status >= 400 && error.response.status <= 500) {
          dispatch(endAction())
          dispatch(showToast('error', error.response.data.message))
          if (error.response.data.message == 'Unauthorized') {
            localStorage.removeItem('token')
            dispatch(logout())
            navigate('/')
          }
        }
      }
    }
    getConstructionData()
  }, [house])

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
      <Input className="table_name_add_input" onChange={(e) => setAddConstruction({...addConstruction, name: e.target.value})}/>,
      document.querySelector(`#name_add_input`)
    )
    ReactDOM.render(
      <a className="table_construction_add_btn" ><IoMdAddCircle /></a>,
      document.querySelector(`#construction_add_btn`)
    )
  }

  const handleConstructionTableClick = (event) => {
    const delete_btn = event.target.closest('.table_construction_delete_btn')

    if(delete_btn) {
      constructionDeleteSubmit(delete_btn.getAttribute('data-id'))
    }
	}

  const constructionDeleteSubmit = (id) => {
    console.log('delete construction with id=', id)
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