import React from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

interface CustomProps {
  onChange: (event: { target: { value: string } }) => void
  name: string
}

export const CustomNumericFormat = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          })
        }}
        thousandsGroupStyle="thousand"
        thousandSeparator=" "
        valueIsNumericString
        suffix={' Kč'}
      />
    )
  }
)
