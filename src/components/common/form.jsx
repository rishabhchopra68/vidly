import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  //
  state = { data: {}, errors: {} };

  validate() {
    const options = { abortEarly: false }; // to get all the errors without abortion
    const { error } = Joi.validate(this.state.data, this.schema, options);
    // console.log(error);
    if (!error) return null;
    const errors = {};
    // map array to errors object
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }
  validateProperty = ({ name, value }) => {
    const schema = { [name]: this.schema[name] };
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    // const username = this.username.current.value;
    e.preventDefault(); // to prevent full page reload when form is submitted
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        options={options}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
      />
    );
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
      />
    );
  };
}

export default Form;
