import React, { useState, useEffect, ChangeEvent } from 'react';

const formatValue = (value: number): string => {
  const stringValue = value.toString();
  const integerPart = stringValue.split('.')[0];
  const formattedValue = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${formattedValue}`;
};

interface CurrencyInputProps {
  defaultValue: number;
  onChange: (value: number) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ defaultValue, onChange }) => {
  const [value, setValue] = useState<string>(formatValue(defaultValue));

  useEffect(() => {
    setValue(formatValue(defaultValue));
  }, [defaultValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const valueWithoutFormatting = value
      .replace(/[^\d]/g, '') // Remove caracteres não numéricos
      .replace(/^0+/g, ''); // Remove zeros à esquerda

    const numericValue = parseInt(valueWithoutFormatting, 10) || 0;
    setValue(formatValue(numericValue));
    onChange(numericValue);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      placeholder="R$ 0"
      className="form-control"
      value={value}
      onChange={handleChange}
    />
  );
};

export default CurrencyInput;