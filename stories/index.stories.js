import React from 'react'

import { storiesOf } from '@storybook/react'
import Button from '@material-ui/core/Button'
import ControlledAddressInput from './examples/ControlledAddressInput'
import UKAddressInput from './examples/UKAddressInput'
import RequiredAddressInputForm from './examples/RequiredAddressInputForm'

storiesOf('AddressInput')
  .add('basic controlled', () => (
    <ControlledAddressInput />
  ))
  .add('basic controlled (without country)', () => (
    <ControlledAddressInput
      displayCountry={false}
    />
  ))
  .add('basic controlled (required)', () => (
    <RequiredAddressInputForm />
  ))
  .add('automatically find address (UK example)', () => (
    <UKAddressInput />
  ))
