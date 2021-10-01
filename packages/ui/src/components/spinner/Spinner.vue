<template>
  <svg
    :class="[
      {
        'h-3 w-3': $props.size === 'xs',
        'h-4 w-4': $props.size === 'sm',
        'h-5 w-5': !['xs', 'sm', 'xl'].includes($props.size),
        'h-6 w-6': $props.size === 'xl',
      },

    ]"
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    style="stroke: currentColor"
  >
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'XSpinner',

  props: {
    size: {
      type: String,
      default: null,
    },
  },
}
</script>
