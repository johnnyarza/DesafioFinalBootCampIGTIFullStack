const formatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  signDisplay: 'exceptZero',
});

function formatCurrency(value) {
  return formatter.format(value);
}

function formatPercentage(value) {
  const formatter = Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
  });
  return formatter.format(value / 100);
}

export default { formatCurrency, formatPercentage };
