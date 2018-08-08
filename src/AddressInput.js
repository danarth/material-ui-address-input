import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  wrapper: {
    width: '100%'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

class AddressInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayNewAddressForm: false,
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
    this.props.onAdd(address)
    this.reset()
  }

  handleChangeAddress = event => {
    this.props.onChange(event.value)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.wrapper}>
        <FormControl
          disabled={this.props.allAddresses.length === 0}
          fullWidth
          margin={this.props.margin}
          required={this.props.required}
        >
          <InputLabel>Address</InputLabel>
          <Select
            onChange={this.state.handleChangeAddress}
            value={this.props.value}
          >
            {
              this.props.allAddresses.map((address, key) => (
                <MenuItem key={key} value={address}>{address.addressLine1}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <Button color='default' disabled={this.state.displayNewAddressForm} onClick={this.handleDisplayNewAddressForm}>
          <AddIcon />
          Add new address
        </Button>
        <Collapse in={this.state.displayNewAddressForm}>
          <TextField
            label='Address Line 1'
            value={this.state.addressLine1}
            onChange={this.handleChange('addressLine1')}
            fullWidth={this.props.fullWidth}
            margin={this.props.margin}
          />
          <TextField
            label='Address Line 2'
            value={this.state.addressLine2}
            onChange={this.handleChange('addressLine2')}
            fullWidth={this.props.fullWidth}
            margin={this.props.margin}
          />
          <TextField
            label='City'
            value={this.state.city}
            onChange={this.handleChange('city')}
            fullWidth={this.props.fullWidth}
            margin={this.props.margin}
          />
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <TextField
                label='State/Province/Region'
                value={this.state.region}
                onChange={this.handleChange('region')}
                fullWidth={this.props.fullWidth}
                margin={this.props.margin}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='ZIP/Postal Code'
                value={this.state.zip}
                onChange={this.handleChange('zip')}
                fullWidth={this.props.fullWidth}
                margin={this.props.margin}
              />
            </Grid>
          </Grid>
          <TextField
            label='Country'
            value={this.state.country}
            onChange={this.handleChange('country')}
            fullWidth={this.props.fullWidth}
            margin={this.props.margin}
          />
          <Button
            color='default'
            onClick={this.handleHideNewAddressForm}
          >
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={this.handleAddAddress}
          >
            Add Address
          </Button>
        </Collapse>
      </div>
    )
  }
}

AddressInput.defaultProps = {
  fullWidth: false,
  margin: 'none',
  required: false
}

AddressInput.propTypes = {
  classes: PropTypes.object.isRequired,
  fullWidth: PropTypes.bool,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  allAddresses: PropTypes.arrayOf(PropTypes.shape({
    addressLine1: PropTypes.string.isRequired,
    addressLine2: PropTypes.string,
    city: PropTypes.string,
    region: PropTypes.string,
    zip: PropTypes.string.isRequired,
    country: PropTypes.string
  })).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      addressLine1: PropTypes.string.isRequired,
      addressLine2: PropTypes.string,
      city: PropTypes.string,
      region: PropTypes.string,
      zip: PropTypes.string.isRequired,
      country: PropTypes.string
    }),
    PropTypes.string
  ]),
  required: PropTypes.bool
}

export default withStyles(styles, { withTheme: true })(AddressInput)