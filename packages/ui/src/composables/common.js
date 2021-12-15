const validator = {
  size: ['auto', 'xs', 'sm', 'md', 'lg', 'xl'],
}

export const withProps = () => ({
  size: {
    type: String,
    default: null,
    validator: (value) => validator.size.includes(value),
  },
  color: {
    type: String,
    default: 'primary',
  },
  flat: {
    type: Boolean,
    default: false,
  },
})

export const withValidator = () => validator
