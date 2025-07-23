import React from 'react';
import { useField } from 'formik';

import { Input, FormFeedback } from 'reactstrap';

const TextField = (props) => {
  const { id, maxLength, name, type, label, placeholder } = props;

  const [field, meta] = useField(props);

  return (
    <>
      {label && <div className="input-label">{label}</div>}
      <Input
        {...field}
        {...props}
        name={name}
        type={type}
        id={id || name}
        placeholder={placeholder}
        maxLength={maxLength || undefined}
        invalid={meta.error && meta.touched}
      />
      {meta.touched && (
        <FormFeedback tooltip valid={!meta.error}>
          {meta.error}
        </FormFeedback>
      )}
    </>
  );
};

export default TextField;
