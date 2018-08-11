import React from 'react'

import { storiesOf } from '@storybook/react'
import ControlledAddressInput from './examples/ControlledAddressInput'
import UKAddressInput from './examples/UKAddressInput'

storiesOf('AddressInput')
  .add('basic controlled', () => (
    <ControlledAddressInput />
  ))
  .add('basic controlled (without country)', () => (
    <ControlledAddressInput
      displayCountry={false}
    />
  ))
  .add('automatically find address (UK example)', () => (
    <UKAddressInput />
  ))
