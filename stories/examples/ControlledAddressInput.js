import React, { Component } from 'react'
import AddressInput from '../../src/AddressInput'

class ControlledAddressInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: '',
      addresses: []
    }
  }

    handleAddAddress = address => {
      this.setState({
        addresses: [...this.state.addresses, address]
      })
    }

    handleChangeAddress = addressIndex => {
      this.setState({
        address: addressIndex
      })
    }

    render () {
      return (
        <AddressInput
          onAdd={this.handleAddAddress}
          onChange={this.handleChangeAddress}
          value={this.state.address}
          allAddresses={this.state.addresses}
          {...this.props}
        />
      )
    }
}

export default ControlledAddressInput
