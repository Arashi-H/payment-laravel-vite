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

import CDateInput from "../CDateInput";
import './CreatePayment.scss'

const CreatePayment = (props) => {

  return (
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
                  <DropDownList className="custom_autocomplete_input" selectedIndexes={[0]} filterable>
                    <ListItem value="1">Affogato</ListItem>
                    <ListItem value="2">Americano</ListItem>
                    <ListItem value="3">Bicerin</ListItem>
                    <ListItem value="4">Breve</ListItem>
                    <ListItem value="5">Cappuccino</ListItem>
                    <ListItem value="6">Cafe Crema</ListItem>
                    <ListItem value="7">Cafe Corretto</ListItem>
                    <ListItem value="8">Cafe macchiato</ListItem>
                    <ListItem value="9">Cafe mocha</ListItem>
                  </DropDownList>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-3 inline_label">
                  <label className="form-label">Date</label>
                </div>
                <div className="col-md-6">
                  <CDateInput />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-3 inline_label">
                  <label className="form-label">Company</label>
                </div>
                <div className="col-md-6">
                  <DropDownList className="custom_autocomplete_input" selectedIndexes={[0]} filterable>
                    <ListItem value="1">Affogato</ListItem>
                    <ListItem value="2">Americano</ListItem>
                    <ListItem value="3">Bicerin</ListItem>
                    <ListItem value="4">Breve</ListItem>
                    <ListItem value="5">Cappuccino</ListItem>
                    <ListItem value="6">Cafe Crema</ListItem>
                    <ListItem value="7">Cafe Corretto</ListItem>
                    <ListItem value="8">Cafe macchiato</ListItem>
                    <ListItem value="9">Cafe mocha</ListItem>
                  </DropDownList>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-3 inline_label">
                  <label className="form-label">Construction</label>
                </div>
                <div className="col-md-6">
                  <DropDownList className="custom_autocomplete_input" selectedIndexes={[0]} filterable onChange={(e) => console.log(e)}>
                    <ListItem value="aff">Affogato</ListItem>
                    <ListItem value="ame">Americano</ListItem>
                    <ListItem value="bic">Bicerin</ListItem>
                    <ListItem value="bre">Breve</ListItem>
                    <ListItem value="cap">Cappuccino</ListItem>
                    <ListItem value="cre">Cafe Crema</ListItem>
                    <ListItem value="cor">Cafe Corretto</ListItem>
                    <ListItem value="mac">Cafe macchiato</ListItem>
                    <ListItem value="moc">Cafe mocha</ListItem>
                  </DropDownList>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-3 inline_label">
                  <label className="form-label">Cost</label>
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"><FaYenSign /></span>
                    </div>
                    <input className="form-control" type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-3 inline_label">
                  <label className="form-label">Cash Payment</label>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="action_btn_group">
              <button type="button" className="btn btn-secondary" onClick={() => props.clickCancelBtn()}>Cancel</button>
              <div>
                
                <button type="button" className="btn btn-primary" onClick={() => clickSaveBtn()}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePayment