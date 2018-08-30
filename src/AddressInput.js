import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import countries from 'world-countries'
import { withStyles } from '@material-ui/core/styles'
import { FormHelperText } from '@material-ui/core'

const styles = theme => ({
  wrapper: {
    width: '100%'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  buttonsBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

class AddressInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displayNewAddressForm: false,
      newAddressManual: !this.props.addressResolver,
      houseNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      zip: '',
      country: '',
      houseNameNumberError: false,
      addressLine1Error: false,
      cityError: false,
      regionError: false,
      zipError: false,
      countryError: false,
      houseNameNumberHelperText: false,
      addressLine1HelperText: '',
      cityHelperText: '',
      regionHelperText: '',
      zipHelperText: '',
      countryHelperText: ''
    }
  }

  reset = () => {
    this.setState({
      displayNewAddressForm: false,
      newAddressManual: !this.props.addressResolver,
      houseNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      zip: '',
      country: '',
      houseNameNumberError: false,
      addressLine1Error: false,
      cityError: false,
      regionError: false,
      zipError: false,
      countryError: false,
      houseNameNumberHelperText: '',
      addressLine1HelperText: '',
      cityHelperText: '',
      regionHelperText: '',
      zipHelperText: '',
      countryHelperText: ''
    })
  }

  handleDisplayNewAddressForm = () => {
    this.setState({
      displayNewAddressForm: true
    })
  }

  handleHideNewAddressForm = () => {
    this.reset()
    this.setState({
      displayNewAddressForm: false
    })
  }

  handleRequiredError = (name, error) => {
    this.setState({
      [`${name}Error`]: error,
      [`${name}HelperText`]: error ? 'This field is required.' : ''
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleAddAddress = () => {
    this.handleRequiredError('addressLine1', this.state.addressLine1 === '')
    this.handleRequiredError('city', this.state.city === '')
    this.handleRequiredError('region', this.state.region === '')
    this.handleRequiredError('zip', this.state.zip === '')
    if (this.props.displayCountry) {
      this.handleRequiredError('country', this.state.country === '')
    }
    if (this.state.addressLine1 !== '' &&
      this.state.city !== '' &&
      this.state.region !== '' &&
      this.state.zip !== '' &&
      ((this.props.displayCountry && this.state.country !== '') || !this.props.displayCountry)) {
      this.setState({
        addressLine1Error: false,
        addressLine1HelperText: ''
      })
      const address = {
        addressLine1: this.state.addressLine1,
        addressLine2: this.state.addressLine2,
        city: this.state.city,
        region: this.state.region,
        zip: this.state.zip,
        country: this.state.country
      }
      this.props.onAdd(address)
      this.props.onChange(this.props.value.length)
      this.reset()
    }
  }

  handleChangeAddress = event => {
    if (parseInt(event.target.value) === -1) {
      this.handleDisplayNewAddressForm()
    } else {
      this.props.onChange(event.target.value)
    }
  }

  handleEnterAddressManually = () => {
    this.setState({
      newAddressManual: true
    })
  }

  handleFindAddress = () => {
    if (this.props.addressResolver) {
      this.props.addressResolver(this.state.houseNumber, this.state.zip, this.state.country)
      this.reset()
    }
  }

  stringifyAddress = address => {
    let stringAddress = address.addressLine1
    if (address.addressLine2) {
      stringAddress += `, ${address.addressLine2}`
    }
    if (address.city) {
      stringAddress += `, ${address.city}`
    }
    if (address.region) {
      stringAddress += `, ${address.region}`
    }
    stringAddress += `, ${address.zip}`
    if (address.country) {
      stringAddress += `, ${address.country}`
    }
    return stringAddress
  }

  render () {
    const { classes } = this.props
    return (
      <div className={classes.wrapper}>
        <Collapse in={!this.state.displayNewAddressForm}>
          <FormControl
            disabled={this.props.disabled}
            error={this.props.error}
            fullWidth
            margin={this.props.margin}
            required={this.props.required}
          >
            <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
            <Select
              inputProps={{
                id: this.props.id,
                name: this.props.name
              }}
              native={this.props.native}
              onBlur={this.props.onBlur}
              onChange={this.handleChangeAddress}
              value={this.props.value}
            >
              {this.props.native
                ? <option value='' />
                : <MenuItem value=''>Choose an address...</MenuItem>
              }
              {
                this.props.allAddresses.map((address, index) => (
                  this.props.native
                    ? <option key={index} value={address.id || index}>{this.stringifyAddress(address)}</option>
                    : <MenuItem key={index} value={address.id || index}>{this.stringifyAddress(address)}</MenuItem>
                ))
              }
              {this.props.native
                ? <option value={-1}>Add new address...</option>
                : <MenuItem value={-1}><strong>Add new address...</strong></MenuItem>
              }
            </Select>
            { this.props.helperText
              ? <FormHelperText>{ this.props.helperText }</FormHelperText> : null }
          </FormControl>
        </Collapse>
        <Collapse in={this.state.displayNewAddressForm}>
          <Collapse in={this.state.newAddressManual}>
            <TextField
              helperText={this.state.addressLine1HelperText}
              error={this.state.addressLine1Error}
              label={`${this.props.addressLabels.addressLine1} *`}
              value={this.state.addressLine1}
              onChange={this.handleChange('addressLine1')}
              fullWidth
              margin={this.props.margin}
            />
            <TextField
              label={this.props.addressLabels.addressLine2}
              value={this.state.addressLine2}
              onChange={this.handleChange('addressLine2')}
              fullWidth
              margin={this.props.margin}
            />
            <TextField
              helperText={this.state.cityHelperText}
              error={this.state.cityError}
              label={`${this.props.addressLabels.city} *`}
              value={this.state.city}
              onChange={this.handleChange('city')}
              fullWidth
              margin={this.props.margin}
            />
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <TextField
                  helperText={this.state.regionHelperText}
                  error={this.state.regionError}
                  label={`${this.props.addressLabels.region} *`}
                  value={this.state.region}
                  onChange={this.handleChange('region')}
                  fullWidth
                  margin={this.props.margin}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  helperText={this.state.zipHelperText}
                  error={this.state.zipError}
                  label={`${this.props.addressLabels.zip} *`}
                  value={this.state.zip}
                  onChange={this.handleChange('zip')}
                  fullWidth
                  margin={this.props.margin}
                />
              </Grid>
            </Grid>
          </Collapse>
          <Collapse in={!this.state.newAddressManual}>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <TextField
                  helperText={this.state.houseNameNumberHelperText}
                  error={this.state.houseNameNumberError}
                  label={`${this.props.addressLabels.houseNameNumber} *`}
                  value={this.state.houseNumber}
                  onChange={this.handleChange('houseNumber')}
                  fullWidth
                  margin={this.props.margin}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  helperText={this.state.zipHelperText}
                  error={this.state.zipError}
                  label={`${this.props.addressLabels.zip} *`}
                  value={this.state.zip}
                  onChange={this.handleChange('zip')}
                  fullWidth
                  margin={this.props.margin}
                />
              </Grid>
            </Grid>
          </Collapse>
          {
            this.props.displayCountry
              ? <FormControl
                fullWidth
                margin={this.props.margin}
                error={this.state.countryError}
              >
                <InputLabel>{`${this.props.addressLabels.country} *`}</InputLabel>
                <Select
                  native={this.props.native}
                  value={this.state.country}
                  onChange={this.handleChange('country')}
                >
                  {this.props.native
                    ? <option value='' /> : null
                  }
                  {countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map((country, index) =>
                    this.props.native
                      ? <option key={index} value={country.name.common}>{country.name.common}</option>
                      : <MenuItem key={index} value={country.name.common}>{country.name.common}</MenuItem>
                  )}
                </Select>
                <FormHelperText>{ this.state.countryHelperText }</FormHelperText>
              </FormControl> : null
          }
          <div className={classes.buttonsBar}>
            <Button
              color='default'
              onClick={this.handleHideNewAddressForm}
            >
              Cancel
            </Button>
            <Hidden xsUp={!this.state.newAddressManual}>
              <Button
                color='primary'
                onClick={this.handleAddAddress}
              >
                Add Address
              </Button>
            </Hidden>
            <Hidden xsUp={this.state.newAddressManual}>
              <Button
                color='default'
                onClick={this.handleEnterAddressManually}
              >
                Enter Address Manually
              </Button>
              <Button
                color='primary'
                onClick={this.handleFindAddress}
              >
                Find Address
              </Button>
            </Hidden>
          </div>
        </Collapse>
      </div>
    )
  }
}

AddressInput.defaultProps = {
  addressLabels: {
    houseNameNumber: 'House Name/Number',
    addressLine1: 'Address Line 1',
    addressLine2: 'Address Line 2',
    city: 'City',
    region: 'State/Province/Region',
    zip: 'ZIP/Postal Code',
    country: 'Country'
  },
  disabled: false,
  displayCountry: true,
  id: 'address',
  label: 'Address',
  margin: 'none',
  name: 'address',
  native: false,
  required: false
}

AddressInput.propTypes = {
  addressLabels: PropTypes.shape({
    houseNameNumber: PropTypes.string.isRequired,
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired
  }),
  addressResolver: PropTypes.func,
  allAddresses: PropTypes.arrayOf(PropTypes.shape({
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    region: PropTypes.string,
    zip: PropTypes.string.isRequired,
    country: PropTypes.string
  })).isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  displayCountry: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  id: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  name: PropTypes.string,
  native: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default withStyles(styles, { withTheme: true })(AddressInput)
