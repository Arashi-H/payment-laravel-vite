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

import CreatePayment from '../../components/CreatePayment'

import './Company.scss';

const Company = () => {

  const [page, setPage] = useState('list')

  const companyColumns = [
    {
      label: 'Id',
      dataField: 'id',
      dataType: 'number',
      width: 100
    }, {
      label: 'Company Name',
      dataField: 'name',
      dataType: 'string'
    }, {
      label: 'Detail',
      dataField: '',
      width: 100,
      allowSort: false,
      formatFunction(settings) {
        settings.template = renderToString(<a className="table_company_detail_btn" data-id={settings.data.id}>Detail</a>);
      }
    }
  ];
  
  const companyData = new Smart.DataAdapter({
		dataSource: [{
      id: 1,
      name: 'awegsaewrg',
      bank_code: '123',
      bank_name: 'sdhgsre',
      bank_branch_code: '123',
      bank_branch_name: 'dsrhd',
      bank_deposit_type_id: 1,
      bank_account_number: '12334',
      bank_account_holder: 'srehdrth',
      supplier: null,
      subcontractor: null,
      transfer_fee_id: 2
    }, {
      id: 2,
      name: 'drthd',
      bank_code: '22',
      bank_name: 'rth',
      bank_branch_code: '543',
      bank_branch_name: 'hrth',
      bank_deposit_type_id: 1,
      bank_account_number: '7666',
      bank_account_holder: 'ftnyyh',
      supplier: null,
      subcontractor: null,
      transfer_fee_id: 2
    }, {
      id: 3,
      name: 'fgh',
      bank_code: '3',
      bank_name: 'er',
      bank_branch_code: '333',
      bank_branch_name: 'gtr',
      bank_deposit_type_id: 1,
      bank_account_number: '5643',
      bank_account_holder: 'g',
      supplier: null,
      subcontractor: null,
      transfer_fee_id: 2
    }, {
      id: 4,
      name: 'ytjty',
      bank_code: '454',
      bank_name: 'myh',
      bank_branch_code: '443',
      bank_branch_name: 'ftyjfty',
      bank_deposit_type_id: 1,
      bank_account_number: '6',
      bank_account_holder: 'ftnyyh',
      supplier: null,
      subcontractor: null,
      transfer_fee_id: 2
    }, {
      id: 5,
      name: 'fty',
      bank_code: '5',
      bank_name: 'ser',
      bank_branch_code: '322',
      bank_branch_name: 'tyj',
      bank_deposit_type_id: 1,
      bank_account_number: '65',
      bank_account_holder: 'ftnyyh',
      supplier: null,
      subcontractor: null,
      transfer_fee_id: 2
    }, {
      id: 2,
      name: 'jyts',
      bank_code: '55432',
      bank_name: 'fyjfty',
      bank_branch_code: '65',
      bank_branch_name: 'ftyjf',
      bank_deposit_type_id: 1,
      bank_account_number: '7666',
      bank_account_holder: 'ftnyyh',
      supplier: null,
      subcontractor: null,
      transfer_fee_id: 2
    }],
		dataFields: [
			'id: number',
			'name: string',
			'bank_code: string',
      'bank_name: string',
      'bank_branch_code: string',
      'bank_branch_name: string',
      'bank_deposit_type_id: number',
      'bank_account_number: string',
      'bank_account_holder: string',
      'supplier: number',
      'subcontractor: number',
      'transfer_fee_id: number',
		]
	});

  const clickSearchBtn = () => {
    console.log('click search btn')
  }

  const goCompanyDetail = (article_id) => {
    setPage('edit')
  }

  const handleCompanyTableClick = (event) => {
    const detail_btn = event.target.closest('.table_company_detail_btn')

    if(detail_btn) {
      goCompanyDetail(detail_btn.getAttribute('data-id'))
    }
	}

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                {
                  page == 'list' &&
                    <h5 className="m-b-10">Company list </h5>
                }
                {
                  page == 'edit' &&
                    <h5 className="m-b-10">Company edit </h5>
                }
                {
                  page == 'add' &&
                    <h5 className="m-b-10">Company add </h5>
                }
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/"><i className="feather icon-home"></i></a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#!">Industry management</a>
                </li>
                {
                  page == 'list' &&
                    <li className="breadcrumb-item">
                      <a href="/article">List of Properties</a>
                    </li>
                }
                {
                  page == 'edit' &&
                    <li className="breadcrumb-item">
                      <a href="/article">Company edit</a>
                    </li>
                }
                {
                  page == 'add' &&
                    <li className="breadcrumb-item">
                      <a href="/article">Company add</a>
                    </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="main-body">
        <div className="page-wrapper">
          <div className="row">
            <div className="col">
              {
                page == 'list' && 
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title">list</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label className="form-label">Merchant ID</label>
                            <input className="form-control" type="text" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">company name</label>
                            <input className="form-control" type="text" />
                          </div>
                          <hr />
                          <button type="button" className="btn btn-primary" onClick={() => clickSearchBtn()}>Search</button>
                        </div>
                        <div className="col-md-9">
                          <div className="table_container">
                            <Table 
                              dataSource={companyData} 
                              // keyboardNavigation 
                              paging
                              filtering
                              // tooltip={tooltip}
                              columns={companyColumns} 
                              columnMenu
                              // editing
                              sortMode='many'
                              onClick={(e) => handleCompanyTableClick(e)}
                            />
                            <button type="button" className="btn btn-primary table_btn">Create</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              }
              {
                (page == 'edit' || page == 'add') &&
                  <>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title">basic information</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Company Name</label>
                                </div>
                                <div className="col-md-6">
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Remittance bank</label>
                                </div>
                                <div className="col-md-6">
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Remittance bank</label>
                                </div>
                                <div className="col-md-6">
                                  <input className="form-control" type="text" />
                                  <small class="text-muted form-text">Please enter in half-width katakana</small>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Branch number</label>
                                </div>
                                <div className="col-md-6">
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Branch</label>
                                </div>
                                <div className="col-md-6">
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Deposit</label>
                                </div>
                                <div className="col-md-6">
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input name="supportedRadio" type="radio" id="supportedRadio21" className="custom-control-input" defaultChecked/>
                                    <label title="" type="checkbox" htmlFor="supportedRadio21" className="custom-control-label">Savings account</label>
                                  </div>
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input name="supportedRadio" type="radio" id="supportedRadio22" className="custom-control-input" />
                                    <label title="" type="checkbox" htmlFor="supportedRadio22" className="custom-control-label">current account</label>
                                  </div>
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input name="supportedRadio" type="radio" id="supportedRadio23" className="custom-control-input" />
                                    <label title="" type="checkbox" htmlFor="supportedRadio23" className="custom-control-label">others</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">account</label>
                                </div>
                                <div className="col-md-6">
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Beneficiary</label>
                                </div>
                                <div className="col-md-6">
                                  <input className="form-control" type="text" />
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Transfer fee</label>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-check">
                                    <input type="checkbox" className="form-check-input" />
                                    <label title="" type="checkbox" className="form-check-label">Self-pay</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="action_btn_group">
                              <button type="button" className="btn btn-secondary" onClick={() => clickCancelBtn()}>Cancel</button>
                              <button type="button" className="btn btn-primary" onClick={() => clickSaveBtn()}>Save</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Company