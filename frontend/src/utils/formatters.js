const currency_format = (value) => {
    return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export { currency_format }