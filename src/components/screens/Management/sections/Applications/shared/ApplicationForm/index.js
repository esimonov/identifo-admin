import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import validationRules from './validationRules';
import * as Validation from '~/utils/validation';
import TypeDropdown from './TypeDropdown';
import './ApplicationForm.css';

class ApplicationForm extends Component {
  constructor() {
    super();

    this.validate = Validation.applyRules(validationRules);

    this.state = {
      fields: {
        type: '',
        name: '',
      },
      validation: {
        type: '',
        name: '',
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { application } = this.props;

    if (application && application !== prevProps.application) {
      this.setState({ fields: application });
    }
  }

  handleInput({ target }) {
    const { name, value } = target;
    let { validation } = this.state;

    if (validation[target.name]) {
      validation = update(validation, { [target.name]: '' });
    }

    this.setState(state => ({
      fields: update(state.fields, {
        [name]: value,
      }),
      validation,
    }));
  }

  handleBlur({ target }) {
    const { name, value } = target;
    const validationMessage = this.validate(name, {
      ...this.state.fields,
      [name]: value,
    });

    this.setState(state => ({
      validation: update(state.validation, {
        [name]: validationMessage,
      }),
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const validation = this.validate('all', this.state.fields);

    if (Validation.hasError(validation)) {
      this.setState({ validation });
      return;
    }

    this.props.onSubmit(this.state.fields);
  }

  render() {
    const { fields, validation } = this.state;
    const { loading } = this.props;

    return (
      <form className="iap-apps-form" onSubmit={this.handleSubmit}>
        <Field label="Name">
          <Input
            name="name"
            value={fields.name}
            autoComplete="off"
            placeholder="Enter name"
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            errorMessage={validation.name}
            disabled={loading}
          />
        </Field>

        <Field label="Type">
          <TypeDropdown
            selectedValue={fields.type}
            onChange={value => this.handleInput({ target: { name: 'type', value } })}
            disabled={loading}
          />
        </Field>

        <footer className="iap-apps-form__footer">
          <Button
            type="submit"
            Icon={loading ? LoadingIcon : SaveIcon}
            disabled={loading}
          >
            Save changes
          </Button>
          <Button
            transparent
            disabled={loading}
            onClick={this.props.onCancel}
          >
            Cancel
          </Button>
        </footer>
      </form>
    );
  }
}

ApplicationForm.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  application: PropTypes.shape({
    name: PropTypes.string,
  }),
};

ApplicationForm.defaultProps = {
  loading: false,
  application: null,
};

export default ApplicationForm;
