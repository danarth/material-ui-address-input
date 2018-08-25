import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from '@material-ui/core/Button'
import ControlledAddressInput from './examples/ControlledAddressInput'
import UKAddressInput from './examples/UKAddressInput'

storiesOf('AddressInput')
  .add('controlled', () => (
    <ControlledAddressInput />
  ))
  .add('controlled error style', () => (
    <ControlledAddressInput
      error
      helperText='Some error message'
    />
  ))
  .add('controlled (without country)', () => (
    <ControlledAddressInput
      displayCountry={false}
    />
  ))
  .add('controlled native', () => (
    <ControlledAddressInput
      native
    />
  ))
  .add('controlled native (required)', () => (
    <form onSubmit={event => {
      event.preventDefault()
      action('form-submit')(event)
    }}>
      <ControlledAddressInput
        margin='dense'
        native
        required
      />
      <Button type='submit' variant='raised' color='primary'>Submit form</Button>
    </form>
  ))
  .add('custom labels', () => (
    <ControlledAddressInput
      label='Your Address'
      addressLabels={{
        houseNameNumber: 'House/Name Number',
        addressLine1: 'Line 1',
        addressLine2: 'Line 2',
        city: 'Town',
        region: 'County',
        zip: 'Post Code',
        country: 'Country'
      }}
    />
  ))
  .add('automatically find address (UK example)', () => (
    <UKAddressInput />
  ))
