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
import UpdateHistory from "../../components/UpdateHistory";
import AutoConstruction from "../../components/AutoConstruction";

import './Article.scss';

import {
  startAction,
  endAction,
  showToast
} from '../../actions/common'
import { logout } from "../../actions/auth";
import agent from '../../api/'

const Article = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const budgetEditTable = useRef()
  const budgetAddTable = useRef()

  const [page, setPage] = useState('list')
  const [articles, setArticles] = useState([])
  const [constructions, setConstructions] = useState([])
  const [editArticle, setEditArticle] = useState({})
  const [addArticle, setAddArticle] = useState({name: '', contract_amount: 0, is_house: 1, ended: 0, budget: []})
  const [budgets, setBudgets] = useState([])

  const [firstLoadTable, setFirstLoadTable] = useState(true)

  const articleColumns = [
    {
      label: 'Id',
      dataField: 'id',
      dataType: 'number',
      width: 100
    }, {
      label: 'Object Name',
      dataField: 'name',
      dataType: 'string'
    }, {
      label: 'Is house',
      dataField: 'is_house',
      dataType: 'number',
      formatFunction(settings) {
        settings.template = settings.data.is_house == 0 ? 'Building' : 'House'
      }
    }, {
      label: 'Detail',
      dataField: '',
      width: 100,
      allowSort: false,
      formatFunction(settings) {
        settings.template = renderToString(<a className="table_article_edit_btn" data-id={settings.data.id}>Detail</a>);
      }
    }, {
      label: 'Money',
      dataField: '',
      width: 100,
      allowSort: false,
      formatFunction(settings) {
        settings.template = renderToString(<a className="table_article_payment_btn" data-id={settings.data.id}>Input</a>);
      }
    }
  ];
  
  const articleData = new Smart.DataAdapter({
		dataSource: articles,
		dataFields: [
			'id: number',
			'name: string',
			'is_house: number',
      'ended: number',
			'contract_amount: number',
      'budget: array',
      'created_user_id: number',
      'created_user_name: string',
      'created_at: string',
      'updated_user_id: number',
      'updated_user_name: string',
      'updated_at: string',
		]
	});

  const budgetColumns = [
    {
      label: 'Construction',
      dataField: 'construction_name',
      dataType: 'string',
      allowEdit: false
    }, {
      label: 'Budget',
      dataField: 'cost',
      dataType: 'number',
      // formatFunction(settings) {
      //   settings.template = settings.value.toLocaleString("en-US");
      // }
    }, {
      label: 'Contract Amount',
      dataField: 'contract_amount',
      dataType: 'number',
      // formatFunction(settings) {
      //   settings.template = settings.value.toLocaleString("en-US");
      // }
    }, {
      label: 'Change Amount',
      dataField: 'change_amount',
      dataType: 'number',
      // formatFunction(settings) {
      //   settings.template = settings.value.toLocaleString("en-US");
      // }
    }, {
      label: 'Delete',
      dataField: '',
      width: 100,
      allowSort: false,
      allowEdit: false,
      formatFunction(settings) {
        settings.template = renderToString(<a className="table_budget_delete_btn" data-id={settings.data.id}><IoMdRemoveCircle /></a>);
      }
    }
  ];

  const budgetData = new Smart.DataAdapter({
		dataSource: budgets,
		dataFields: [
      'id: number',
			'construction_name: string',
			'cost: number',
			'contract_amount: number',
      'change_amount: number'
		]
	});

  useEffect(() => {
    async function getArticleData() {
      dispatch(startAction())
      try {
        const resArticle = await agent.common.getArticle()
        const resAutoConstruction = await agent.common.getAutoConstruction()
        console.log('resArticle data=', resArticle.data.data)
        if (resArticle.data.success) {
          setArticles([...resArticle.data.data])
        }

        if(resAutoConstruction.data.success) {
          setConstructions([...resAutoConstruction.data.data])
        }
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
    getArticleData()
  }, [])

  useEffect(() => {
    if(!firstLoadTable) {
      renderAddBudget()
    }
  })

  const budgetAddTableInit = () => {
    const footerTemplate = document.createElement('template'),
			headerTemplate = document.createElement('template');
    footerTemplate.id = 'budgetFooter';
		headerTemplate.id = 'budgetHeader';
    footerTemplate.innerHTML = renderToString(
			<tr>
				<td>Total</td>
				<td id="totalBudget"></td>
        <td id="totalContract"></td>
        <td id="totalChange"></td>
        <td></td>
			</tr>
    )

		headerTemplate.innerHTML = renderToString(
      <tr>
				<th id="construction_add_input"></th>
				<th id="cost_add_input"></th>
				<th id="contract_add_input"></th>
				<th id="change_add_input"></th>
				<th id="budget_add_btn"></th>
			</tr>
    )

    document.body.appendChild(footerTemplate);
		document.body.appendChild(headerTemplate);

		budgetAddTable.current.footerRow = footerTemplate.id;
		budgetAddTable.current.headerRow = headerTemplate.id;

    let total_cost = 0
    let total_contract_amount = 0
    let total_change_amount = 0
    budgets.map((budget) => {
      total_cost += budget.cost
      total_contract_amount += budget.contract_amount
      total_change_amount += budget.change_amount
    })

    document.querySelector(`#totalBudget`).innerHTML = total_cost.toLocaleString("en-US")
    document.querySelector(`#totalContract`).innerHTML = total_contract_amount.toLocaleString("en-US")
    document.querySelector(`#totalChange`).innerHTML = total_change_amount.toLocaleString("en-US")

    ReactDOM.render(
      <DropDownList className="budget_add_input" selectedIndexes={[0]} filterable>
        {
          constructions.map((construction, idx) => {
            return <ListItem value={"" + construction.id} key={idx}>{construction.name}</ListItem>
          })
        }
      </DropDownList>,
      document.querySelector(`#construction_add_input`)
    )
    
    ReactDOM.render(
      <NumberInput />,
      document.querySelector(`#cost_add_input`)
    )
    ReactDOM.render(
      <NumberInput />,
      document.querySelector(`#contract_add_input`)
    )
    ReactDOM.render(
      <NumberInput />,
      document.querySelector(`#change_add_input`)
    )
    ReactDOM.render(
      <a className="table_budget_add_btn" ><IoMdAddCircle /></a>,
      document.querySelector(`#budget_add_btn`)
    )
  }

  const renderAddBudget = () => {
    ReactDOM.render(
      <AutoConstruction constructions={constructions} />,
      document.querySelector(`#construction_add_input`)
    )
    ReactDOM.render(
      <NumberInput />,
      document.querySelector(`#cost_add_input`)
    )
    ReactDOM.render(
      <NumberInput />,
      document.querySelector(`#contract_add_input`)
    )
    ReactDOM.render(
      <NumberInput />,
      document.querySelector(`#change_add_input`)
    )
    ReactDOM.render(
      <a className="table_budget_add_btn" ><IoMdAddCircle /></a>,
      document.querySelector(`#budget_add_btn`)
    )
  }

  const budgetEditTableInit = () => {
    const footerTemplate = document.createElement('template'),
			headerTemplate = document.createElement('template');
    footerTemplate.id = 'budgetFooter';
		headerTemplate.id = 'budgetHeader';
    footerTemplate.innerHTML = renderToString(
			<tr>
				<td>Total</td>
				<td id="totalBudget"></td>
        <td id="totalContract"></td>
        <td id="totalChange"></td>
        <td></td>
			</tr>
    )

		headerTemplate.innerHTML = renderToString(
      <tr>
				<th id="construction_add_input"></th>
				<th id="cost_add_input"></th>
				<th id="contract_add_input"></th>
				<th id="change_add_input"></th>
				<th id="budget_add_btn"></th>
			</tr>
    )

    document.body.appendChild(footerTemplate);
		document.body.appendChild(headerTemplate);

		budgetEditTable.current.footerRow = footerTemplate.id;
		budgetEditTable.current.headerRow = headerTemplate.id;
    console.log('budgetEditTable.current=', budgetEditTable.current)

    let total_cost = 0
    let total_contract_amount = 0
    let total_change_amount = 0
    budgets.map((budget) => {
      total_cost += budget.cost
      total_contract_amount += budget.contract_amount
      total_change_amount += budget.change_amount
    })

    document.querySelector(`#totalBudget`).innerHTML = total_cost.toLocaleString("en-US")
    document.querySelector(`#totalContract`).innerHTML = total_contract_amount.toLocaleString("en-US")
    document.querySelector(`#totalChange`).innerHTML = total_change_amount.toLocaleString("en-US")

    setFirstLoadTable(false)
  }

  const handleArticleTableClick = (event) => {
    const edit_btn = event.target.closest('.table_article_edit_btn')
    const input_btn = event.target.closest('.table_article_payment_btn')

    if(edit_btn) {
      goArticleEdit(edit_btn.getAttribute('data-id'))
    } else if(input_btn) {
      goArticlePayment(input_btn.getAttribute('data-id'))
    }
	}

  const handleBudgetTableClick = (event) => {

  }

  const clickSaveBtn = async() => {
    dispatch(startAction())
		const res = await agent.common.editArticle(editArticle.id, editArticle.name, editArticle.contract_amount, editArticle.is_house, editArticle.ended)
		if (res.data.success) dispatch(showToast('success', res.data.message))
		else dispatch(showToast('error', res.data.message))
		dispatch(endAction())
    console.log('click save btn=', editArticle)
  }

  const clickAddSubmitBtn = () => {
    console.log('click add submit btn=', addArticle)
  }

  const clickSearchBtn = () => {
    console.log()
  }

  const goArticleEdit = (article_id) => {
    const result = articles.find(article => {
      return article.id == article_id;
    });
    if (result !== undefined) {
      setEditArticle({...result})
      setBudgets([...result.budget])
      setPage('edit')
    }
  }

  const goArticleAdd = () => {
    setAddArticle({name: '', contract_amount: 0, is_house: 1, ended: 0, budget: []})
    setBudgets([])
    setPage('add')
  }

  const goArticlePayment = (article_id) => {
    setPage('payment')
  }

  const clickCancelBtn = () => {
    setPage('list')
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
                    <h5 className="m-b-10">List of Properties</h5>
                }
                {
                  page == 'edit' &&
                    <h5 className="m-b-10">property change</h5>
                }
                {
                  page == 'add' &&
                    <h5 className="m-b-10">Property registration</h5>
                }
                {
                  page == 'payment' &&
                    <h5 className="m-b-10">Enter amount</h5>
                }
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/"><i className="feather icon-home"></i></a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#!">Object Management</a>
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
                      <a href="/article">property change</a>
                    </li>
                }
                {
                  page == 'add' &&
                    <li className="breadcrumb-item">
                      <a href="/article">Property registration</a>
                    </li>
                }
                {
                  page == 'payment' &&
                    <li className="breadcrumb-item">
                      <a href="/article">Enter amount</a>
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
                            <label className="form-label">Property ID</label>
                            <input className="form-control" type="text" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">object name</label>
                            <input className="form-control" type="text" />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Property type</label>
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input" />
                              <label title="" type="checkbox" className="form-check-label">housing</label>
                            </div>
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input" />
                              <label title="" type="checkbox" className="form-check-label">building</label>
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="formBasicEmail" className="form-label">express</label>
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input" />
                              <label title="" type="checkbox" className="form-check-label">Show hidden properties</label>
                            </div>
                          </div>
                          <hr />
                          <button type="button" className="btn btn-primary" onClick={() => clickSearchBtn()}>Search</button>
                        </div>
                        <div className="col-md-9">
                          <div className="table_container">
                            <Table 
                              dataSource={articleData} 
                              // keyboardNavigation
                              paging
                              filtering
                              // tooltip={tooltip}
                              columns={articleColumns} 
                              columnMenu
                              // editing
                              sortMode='many'
                              onClick={(e) => handleArticleTableClick(e)}
                            />
                            <button type="button" className="btn btn-primary table_btn" onClick={() => goArticleAdd()}>Create</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              }
              {
                (page == 'edit') &&
                  <>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title">basic information</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <UpdateHistory 
                              id={editArticle.id} 
                              created_user_name={editArticle.created_user_name} 
                              created_at={editArticle.created_at} 
                              updated_user_name={editArticle.updated_user_name} 
                              updated_at={editArticle.updated_at} 
                            />
                            <hr />
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">object name</label>
                                </div>
                                <div className="col-md-6">
                                  <input className="form-control" type="text" defaultValue={editArticle.name} onChange={(e) => setEditArticle({...editArticle, name: e.target.value})}/>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Contract</label>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text"><FaYenSign /></span>
                                    </div>
                                    <input className="form-control" type="text" defaultValue={editArticle.contract_amount} onChange={(e) => setEditArticle({...editArticle, contract_amount: e.target.value})}/>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Type</label>
                                </div>
                                <div className="col-md-6">
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input name="supportedRadio" type="radio" id="supportedRadio21" className="custom-control-input" defaultChecked = {editArticle.is_house == 1 ? true : false} onChange={(e) => setEditArticle({...editArticle, is_house: 1})}/>
                                    <label title="" type="checkbox" htmlFor="supportedRadio21" className="custom-control-label">housing</label>
                                  </div>
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input name="supportedRadio" type="radio" id="supportedRadio22" className="custom-control-input"  defaultChecked = {editArticle.is_house == 0 ? true : false} onChange={(e) => setEditArticle({...editArticle, is_house: 0})}/>
                                    <label title="" type="checkbox" htmlFor="supportedRadio22" className="custom-control-label">building</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Non-representation</label>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-check">
                                    <input type="checkbox" className="form-check-input" defaultChecked={editArticle.ended == 0 ? false : true} onChange={(e) => setEditArticle({...editArticle, ended: e.target.checked ? 1 : 0})}/>
                                    <label title="" type="checkbox" className="form-check-label">Show hidden properties</label>
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
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title">budget data</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <Table 
                              id="budget_edit_table"
                              ref={budgetEditTable}
                              dataSource={budgetData} 
                              // keyboardNavigation
                              paging
                              // filtering
                              // tooltip={tooltip}
                              freezeHeader
                              freezeFooter
                              columns={budgetColumns} 
                              columnMenu
                              editing
                              editMode="row"
                              sortMode='many'
                              onClick={(e) => handleBudgetTableClick(e)}
                              onLoad={() => budgetEditTableInit()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
              }
              {
                (page == 'add') &&
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
                                  <label className="form-label">object name</label>
                                </div>
                                <div className="col-md-6">
                                  <input className="form-control" type="text" defaultValue={addArticle.name} onChange={(e) => setAddArticle({...addArticle, name: e.target.value})}/>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Contract</label>
                                </div>
                                <div className="col-md-6">
                                  <div className="input-group">
                                    <div className="input-group-prepend">
                                      <span className="input-group-text"><FaYenSign /></span>
                                    </div>
                                    <input className="form-control" type="text" defaultValue={addArticle.contract_amount} onChange={(e) => setAddArticle({...addArticle, contract_amount: e.target.value})}/>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Type</label>
                                </div>
                                <div className="col-md-6">
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input name="supportedRadio" type="radio" id="supportedRadio21" className="custom-control-input" defaultChecked={addArticle.is_house == 1 ? true : false} onChange={(e) => setAddArticle({...addArticle, is_house: 1})}/>
                                    <label title="" type="checkbox" htmlFor="supportedRadio21" className="custom-control-label">housing</label>
                                  </div>
                                  <div className="custom-control custom-radio custom-control-inline">
                                    <input name="supportedRadio" type="radio" id="supportedRadio22" className="custom-control-input" defaultChecked={addArticle.is_house == 1 ? false : true} onChange={(e) => setAddArticle({...addArticle, is_house: 0})}/>
                                    <label title="" type="checkbox" htmlFor="supportedRadio22" className="custom-control-label">building</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="row">
                                <div className="col-md-3 inline_label">
                                  <label className="form-label">Non-representation</label>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-check">
                                    <input type="checkbox" className="form-check-input" defaultChecked={addArticle.ended == 1 ? true : false} onChange={(e) => setAddArticle({...addArticle, ended: e.target.checked ? 1 : 0})}/>
                                    <label title="" type="checkbox" className="form-check-label">Show hidden properties</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div className="action_btn_group">
                              <button type="button" className="btn btn-secondary" onClick={() => clickCancelBtn()}>Cancel</button>
                              <button type="button" className="btn btn-primary" onClick={() => clickAddSubmitBtn()}>Add</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title">budget data</h5>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12">
                            <Table 
                              id="budget_add_table"
                              ref={budgetAddTable}
                              dataSource={budgetData} 
                              // keyboardNavigation
                              paging
                              // filtering
                              // tooltip={tooltip}
                              freezeHeader
                              freezeFooter
                              columns={budgetColumns} 
                              // columnMenu
                              editing
                              editMode="row"
                              sortMode='many'
                              onClick={(e) => handleBudgetTableClick(e)}
                              onLoad={() => budgetAddTableInit()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
              }
              {
                page == 'payment' &&
                  <CreatePayment clickCancelBtn={clickCancelBtn}/>
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Article