import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import MenuItem from '@material-ui/core/MenuItem'
import countries from 'world-countries'

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
  constructor(props) {
    super(props)
    this.state = {
      displayNewAddressForm: false,
      newAddressManual: this.props.addressResolver ? false : true,
      houseNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      zip: '',
      country: ''
    }
  }

  reset = () => {
    this.setState({
      displayNewAddressForm: false,
      newAddressManual: this.props.addressResolver ? false : true,
      houseNumber: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      zip: '',
      country: ''
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleAddAddress = () => {
    const address = {
      addressLine1: this.state.addressLine1,
      addressLine2: this.state.addressLine2,
      city: this.state.city,
      region: this.state.region,
      zip: this.state.zip,
      country: this.state.country
    }
    if(this.props.onAdd(address)) {
      this.props.onChange(this.props.value.length)
      this.reset()
    }
  }

  handleChangeAddress = event => {
    if (event.target.value === '') {
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
    if(this.props.addressResolver) {
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

  render() {
    const { classes } = this.props
    return (
      <div className={classes.wrapper}>
        <Collapse in={!this.state.displayNewAddressForm}>
          <FormControl
            fullWidth
            disabled={this.props.disabled}
            margin={this.props.margin}
            required={this.props.required}
          >
            <InputLabel>Address</InputLabel>
            <Select
              onChange={this.handleChangeAddress}
              value={this.props.value}
            >
              {
                this.props.allAddresses.map((address, index) => (
                  <MenuItem key={index} value={index}>{this.stringifyAddress(address)}</MenuItem>
                ))
              }
              <MenuItem value=''><strong>Add new address...</strong></MenuItem>
            </Select>
          </FormControl>
        </Collapse>
        <Collapse in={this.state.displayNewAddressForm}>
          <Collapse in={this.state.newAddressManual}>
            <TextField
              label='Address Line 1'
              required
              value={this.state.addressLine1}
              onChange={this.handleChange('addressLine1')}
              fullWidth
              margin={this.props.margin}
            />
            <TextField
              label='Address Line 2'
              value={this.state.addressLine2}
              onChange={this.handleChange('addressLine2')}
              fullWidth
              margin={this.props.margin}
            />
            <TextField
              label='City'
              value={this.state.city}
              onChange={this.handleChange('city')}
              fullWidth
              margin={this.props.margin}
            />
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <TextField
                  label='State/Province/Region'
                  value={this.state.region}
                  onChange={this.handleChange('region')}
                  fullWidth
                  margin={this.props.margin}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='ZIP/Postal Code'
                  required
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
                  label='House Name/Number'
                  required
                  value={this.state.houseNumber}
                  onChange={this.handleChange('houseNumber')}
                  fullWidth
                  margin={this.props.margin}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label='ZIP/Postal Code'
                  required
                  value={this.state.zip}
                  onChange={this.handleChange('zip')}
                  fullWidth
                  margin={this.props.margin}
                />
              </Grid>
            </Grid>
          </Collapse>
          {
            this.props.displayCountry ?
              <FormControl
                fullWidth
                margin={this.props.margin}
              >
                <InputLabel>Country</InputLabel>
                <Select
                  value={this.state.country}
                  onChange={this.handleChange('country')}
                >
                  {countries.map((country, index) =>
                    <MenuItem key={index} value={country.name.common}>{country.name.common}</MenuItem>
                  )}
                </Select>
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
  disabled: false,
  displayCountry: true,
  margin: 'none',
  required: false
}

AddressInput.propTypes = {
  classes: PropTypes.object.isRequired,
  displayCountry: PropTypes.bool,
  disabled: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  addressResolver: PropTypes.func,
  allAddresses: PropTypes.arrayOf(PropTypes.shape({
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    region: PropTypes.string,
    zip: PropTypes.string.isRequired,
    country: PropTypes.string
  })).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool
}

export default withStyles(styles, { withTheme: true })(AddressInput)