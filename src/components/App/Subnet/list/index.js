/**
 * Created by mhdevita on 12/15/16.
 */
import React, { PropTypes, Component } from 'react'
const { object, array } = PropTypes
import moment from 'moment'
import { connect } from 'react-redux'
import ReactTable from 'react-table'
import { Link } from 'react-router'

import _ from 'lodash'
import './styles.scss'

import { actions as Data } from '../../../../reducers/data'
class ListComponent extends Component {
  static contextTypes = {
    store: object.isRequired
  }
  static propTypes = {
    data: object.isRequired
  }
  componentDidMount () {
    const { dispatch } = this.context.store
    dispatch(Data.load('subnet'))
  }

  render () {
    const { data } = this.props
    console.log(this)
    return (<div className="ListComponent">
      <h1>Subnets</h1>
      <ReactTable
        data={_.values(data.subnet)}
        tableClassName="table table-striped"
        manual
        loading={false}
        pageSize={_.values(data.subnet).length}
        columns={[
          {
            header: 'ID',
            accessor: 'id'
          },
          {
            header: 'Name',
            accessor: 'name'
          },
          {
            header: 'Location',
            id: 'location',
            accessor: (r) => {
              return (<Link to={'/app/locations/' + r.location}>{data.location[r.location].name}</Link>)
            }
          },
          {
            header: 'Start',
            accessor: 'start'
          },
          {
            header: 'End',
            accessor: 'end'
          },
          {
            header: 'Mask',
            accessor: 'mask'
          },
          {
            header: 'Created At',
            id: 'createdAt',
            accessor: (r) => {
              return moment(r.createdAt).format('MM/DD/YYYY hh:mm:ss A')
            }
          },
          {
            header: 'Updated At',
            id: 'updatedAt',
            accessor: (r) => {
              return moment(r.updatedAt).format('MM/DD/YYYY hh:mm:ss A')
            }
          }
        ]}
        />
    </div>)
  }
}

const mapStateToProps = (state) => ({
  data: state.data.entities
})
export default connect(mapStateToProps)(ListComponent);
