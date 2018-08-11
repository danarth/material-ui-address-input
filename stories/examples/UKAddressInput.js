/* global fetch */

import React, { Component } from 'react'
import AddressInput from '../../src/AddressInput'
import { Typography, TextField } from '@material-ui/core'

class UKAddressInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      address: '',
      addresses: [],
      apiKey: ''
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

  handleResolveAddress = (houseNameNumber, postCode) => {
    this.setState({
      isLoading: true
    })
    let API_KEY = this.state.apiKey.length > 0 ? this.state.apiKey : 'ccdWQ4lDlEKHYMvy4XGt2w14878'
    fetch(`https://api.getaddress.io/find/${postCode}/${houseNameNumber}?api-key=${API_KEY}&format=true`)
      .then(response => response.json())
      .then(data => {
        const respAddress = data.addresses[0]
        const address = {
          addressLine1: respAddress[0],
          addressLine2: respAddress[1],
          city: respAddress[3],
          region: respAddress[4],
          zip: postCode
        }
        console.log(address)
        this.handleAddAddress(address)
        this.setState({
          address: this.state.addresses.length - 1,
          isLoading: false
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })
        console.log(err)
      })
  }

  render () {
    return (
      <div>
        <Typography variant='subheading'>This example uses <a href='https://getaddress.io/'>getaddress.io</a> API. Unfortunately their free tier API only allows 20 hits a day. If the example does not work, go to their website and sign up for an API key and put it here:</Typography>
        <TextField
          fullWidth
          label='GetAddress.io API Key'
          value={this.state.apiKey}
          onChange={this.handleKeyChange}
        />
        <AddressInput
          displayCountry={false}
          addressResolver={this.handleResolveAddress}
          onAdd={this.handleAddAddress}
          onChange={this.handleChangeAddress}
          value={this.state.address}
          allAddresses={this.state.addresses}
        />
      </div>
    )
  }
}

export default UKAddressInput
