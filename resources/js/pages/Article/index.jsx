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

import './Article.scss';

let t_budgets = [{
      id: 1,
      construction: 'asgserhserhserse',
      cost: 120000,
      contract_amount: 300000,
      change_amount: 0
    }, {
      id: 2,
      construction: 'ftyjftyj',
      cost: 68000,
      contract_amount: 500,
      change_amount: 0
    }, {
      id: 3,
      construction: 'ftyjftyjdrt',
      cost: 500,
      contract_amount: 520000,
      change_amount: 0
    }, {
      id: 4,
      construction: 'djftyjf',
      cost: 980000,
      contract_amount: 52000,
      change_amount: 0
    }, {
      id: 5,
      construction: 'drtjdrthdrthd',
      cost: 5000,
      contract_amount: 6300,
      change_amount: 0
    }, {
      id: 6,
      construction: 'drthjdrthdth',
      cost: 0,
      contract_amount: 5000,
      change_amount: 0
    }, {
      id: 7,
      construction: 'drtjdrth',
      cost: 5300,
      contract_amount: 52000,
      change_amount: 0
    }, {
      id: 8,
      construction: 'drtd',
      cost: 12500000,
      contract_amount: 9000,
      change_amount: 0
    }, {
      id: 9,
      construction: 'ftyjf',
      cost: 570000,
      contract_amount: 80000,
      change_amount: 0
    }, {
      id: 10,
      construction: 'rthdrt',
      cost: 82000,
      contract_amount: 8000,
      change_amount: 0
    }, {
      id: 11,
      construction: 'dytjfty',
      cost: 1000000,
      contract_amount: 53000,
      change_amount: 0
    }, {
      id: 12,
      construction: 'drthdrth',
      cost: 52100,
      contract_amount: 300000,
      change_amount: 0
    }, {
      id: 13,
      construction: 'ftyjftyj',
      cost: 2000,
      contract_amount: 300000,
      change_amount: 0
    }]

let t_articles = [
  {
    id: 1,
    name: 'awegsaewrg',
    is_house: 0,
    ended: 0,
    contract_amount: 150000,
    budget: [
      {
        id: 1,
        construction: 'trhse',
        cost: 120000,
        contract_amount: 300000,
        change_amount: 0
      }, {
        id: 2,
        construction: 'ftyjftyj',
        cost: 68000,
        contract_amount: 500,
        change_amount: 0
      }, {
        id: 3,
        construction: 'ftyjftyjdrt',
        cost: 500,
        contract_amount: 520000,
        change_amount: 0
      }
    ]
  }, {
    id: 2,
    name: 'drthsth',
    is_house: 1,
    ended: 0,
    contract_amount: 750000,
    budget: [
      {
        id: 4,
        construction: 'djftyjf',
        cost: 980000,
        contract_amount: 52000,
        change_amount: 0
      }, {
        id: 5,
        construction: 'drtjdrthdrthd',
        cost: 5000,
        contract_amount: 6300,
        change_amount: 0
      }
    ]
  }, {
    id: 3,
    name: 'sertyt',
    is_house: 0,
    ended: 0,
    contract_amount: 25000,
    budget: [
      {
        id: 6,
        construction: 'drthjdrthdth',
        cost: 0,
        contract_amount: 5000,
        change_amount: 0
      }, {
        id: 7,
        construction: 'drtjdrth',
        cost: 5300,
        contract_amount: 52000,
        change_amount: 0
      }, {
        id: 8,
        construction: 'drtd',
        cost: 12500000,
        contract_amount: 9000,
        change_amount: 0
      }, {
        id: 9,
        construction: 'ftyjf',
        cost: 570000,
        contract_amount: 80000,
        change_amount: 0
      }, {
        id: 10,
        construction: 'rthdrt',
        cost: 82000,
        contract_amount: 8000,
        change_amount: 0
      }, {
        id: 11,
        construction: 'dytjfty',
        cost: 1000000,
        contract_amount: 53000,
        change_amount: 0
      }, {
        id: 12,
        construction: 'drthdrth',
        cost: 52100,
        contract_amount: 300000,
        change_amount: 0
      }
    ]
  }, {
    id: 4,
    name: 'erhs',
    is_house: 0,
    ended: 0,
    contract_amount: 3200,
    budget: [
      {
        id: 12,
        construction: 'drthdrth',
        cost: 52100,
        contract_amount: 300000,
        change_amount: 0
      }, {
        id: 13,
        construction: 'ftyjftyj',
        cost: 2000,
        contract_amount: 300000,
        change_amount: 0
      }
    ]
  }
]

let t_constructions = [
  {
    id: 1,
    name: 'sthdrt'
  }, {
    id: 2,
    name: 'fghnfh'
  }, {
    id: 3,
    name: 'drtntn'
  }, {
    id: 4,
    name: 'fthny'
  }, {
    id: 5,
    name: 'rtynfhn'
  }, {
    id: 6,
    name: 'drgbdr'
  }, {
    id: 7,
    name: 'juyyu'
  }, {
    id: 8,
    name: 'serw'
  }, {
    id: 9,
    name: 'e56het'
  }, {
    id: 10,
    name: 'rtbtrb'
  }, {
    id: 11,
    name: 'thynty'
  }, {
    id: 12,
    name: 'tyuj'
  }, {
    id: 13,
    name: 'e5h'
  }, {
    id: 14,
    name: 'uju'
  }
]

const Article = () => {

  const budgetEditTable = useRef()
  const budgetAddTable = useRef()

  const [page, setPage] = useState('list')
  const [articles, setArticles] = useState([])
  const [constructions, setConstructions] = useState([])
  const [editArticle, setEditArticle] = useState({})
  const [addArticle, setAddArticle] = useState({name: '', contract_amount: 0, is_house: 1, ended: 0, budget: []})
  const [budgets, setBudgets] = useState([])

  

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
      'budget: array'
		]
	});

  const budgetColumns = [
    {
      label: 'Construction',
      dataField: 'construction',
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
			'construction: string',
			'cost: number',
			'contract_amount: number',
      'change_amount: number'
		]
	});

  useEffect(() => {
    setArticles([...t_articles])
    setConstructions([...t_constructions])
  }, [])

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
            console.log('construction', construction)
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
            console.log('construction', construction)
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

  const clickSearchBtn = () => {
    console.log()
  }

  const clickCancelBtn = () => {
    setPage('list')
  }

  const goArticleEdit = (article_id) => {
    console.log('clcik article edit btn=', article_id)
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

  const clickSaveBtn = () => {
    console.log('click save btn=', editArticle)
  }

  const clickAddSubmitBtn = () => {
    console.log('click add submit btn=', addArticle)
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
                              filtering
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
                              filtering
                              // tooltip={tooltip}
                              freezeHeader
                              freezeFooter
                              columns={budgetColumns} 
                              columnMenu
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