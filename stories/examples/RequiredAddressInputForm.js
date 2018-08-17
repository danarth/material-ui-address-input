import React, { Component } from 'react'
import {action} from '@storybook/addon-actions'
import ControlledAddressInput from './ControlledAddressInput'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class RequiredAddressInputForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formMessage: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    action('form-submit')(event)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <ControlledAddressInput */}
          {/* required */}
          {/* margin='dense' */}
        {/* /> */}
        <TextField required />
        <Button type='submit' variant='raised' color='primary'>Submit Form</Button>
      </form>
    )
  }
}

export default RequiredAddressInputForm
