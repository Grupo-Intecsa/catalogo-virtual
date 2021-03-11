import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CButton, CImg } from '@coreui/react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'


import cosa from '../assets/icons/path2.webp'

const TheHeader = ({ busqueda }) => {

  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const [ queryText, setQueryText ] = useState(undefined)

  const history = useHistory()

  const handleSubmit = () => {

    history.push(`/product/text/${queryText}`)
    busqueda({ query: queryText })
    setQueryText("")

  }

  return (
            <Fragment>
            
            <nav id="Navigation" className="c-header fixed-top px-3 bg-facebook">
                <section>
                  <Link to="/">
                    <CImg src={cosa} className="iconSVG" height="45px"/>
                  </Link>
                </section>
                <section>

                <div className="input-form-header">
                <form className="form--header" onSubmit={handleSubmit} >
                    <input name="query" type="text" placeholder="Buscar productos, marcas y más"  value={queryText} onChange={(e) => setQueryText(e.target.value)} />
                    <CButton type="submit" className="btn btn-search"><FontAwesomeIcon icon={faSearch}/></CButton>
                  </form>
                </div>
                </section>
                <section>
                  <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleSidebarMobile} className="d-lg-none m-1 div--button" />
                  <FontAwesomeIcon icon={faBars} size="2x" className="d-md-down-none m-1 div--button" onClick={toggleSidebar} />
                </section>

            </nav>
        </Fragment>
  )
}

export default TheHeader
