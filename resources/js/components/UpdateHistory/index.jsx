import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'

import './UpdateHistory.scss'

import { useResize, checkMobileDevice } from "./../../utils/Helper"

const UpdateHistory = (props) => {

  const historyRef = useRef()

  const [mobile, setMobile] = useState(false)
  // const [historyWidth, setHistoryWidth] = useState(0)

  // const { isMobile } = useResize()

  useEffect(() => {
    console.log('historyRef.current.offsetWidth=', historyRef.current.offsetWidth)
    // setHistoryWidth(historyRef.current.offsetWidth)
    if(historyRef.current.offsetWidth > 820) {
      setMobile(false)
    } else {
      setMobile(true)
    }
  }, [])

  return (
    <div className="update_history" ref={historyRef}>
      <div className="history_container">
        {
          mobile ? 
            <ul>
              <li>
                <p className="label">ID</p>
                <p className="item">{props.id}</p>
              </li>
              <li>
                <p className="label">Create User</p>
                <p className="item user">{props.created_user_name}</p>
              </li>
              <li>
                <p className="label">Update User</p>
                <p className="item user">{props.updated_user_name}</p>
              </li>
              <li>
                <p className="label">Create Date</p>
                <p className="item">{props.created_at}</p>
              </li>
              <li>
                <p className="label">Update Date</p>
                <p className="item">{props.updated_at}</p>
              </li>
            </ul>
            :
            <ul>
              <li>
                <p className="label">ID</p>
                <p className="item">{props.id}</p>
              </li>
              <li>
                <p className="label">Create User</p>
                <p className="item user">{props.created_user_name}</p>
              </li>
              <li>
                <p className="label">Update User</p>
                <p className="item user">{props.updated_user_name}</p>
              </li>
              <li>
                <p className="label">Create Date</p>
                <p className="item">{props.created_at}</p>
              </li>
              <li>
                <p className="label">Update Date</p>
                <p className="item">{props.updated_at}</p>
              </li>
            </ul>
        }
        
      </div>
    </div>
  )
}

export default UpdateHistory