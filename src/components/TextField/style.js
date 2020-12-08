function style() {
  const styleSheet = {
    input: {
      width: '100%',
      boxSizing: 'border-box',
    },
    border: {
      padding: '9px',
      border: '1px solid blue',
      width: '100%',
      boxSizing: 'border-box',
      borderRadius: '5px',
    },
    errorText: {
      color: 'red',
      fontSize: '12px',
    },
    invalidInput: {
      width: '100%',
      boxSizing: 'border-box',
    },
  };
  return styleSheet;
}

export default style;
