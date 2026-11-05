import type { DatepickerTheme } from '../Datepicker.vue'
import { secondaryCssPalette } from '../../../common/secondaryTokens'

const theme: DatepickerTheme = {
  classes: {
    // Raise above adjacent InputGroup siblings so the open outline isn't covered
    wrapper: ({ data }) => (data.isMenuOpen ? 'z-10' : ''),
  },

  styles({ colors, css }) {
    const primary = colors.getPalette('primary')
    // One step darker than form fields (secondary-700) so the menu sits recessed on the canvas
    const vars: Array<Record<string, string> | string> = [`
    /*General*/
    --dp-font-family: var(--font-family-sans);
    --dp-common-transition: all 0.1s ease-in; /*Generic transition applied on buttons and calendar cells*/

    /*Sizing*/
    --dp-button-height: 35px; /*Size for buttons in overlays*/
    --dp-month-year-row-height: 35px; /*Height of the month-year select row*/
    --dp-month-year-row-button-size: 35px; /*Specific height for the next/previous buttons*/
    --dp-button-icon-height: 20px; /*Icon sizing in buttons*/
    --dp-cell-size: 35px; /*Width and height of calendar cell*/
    --dp-cell-padding: 5px; /*Padding in the cell*/
    --dp-common-padding: 10px; /*Common padding used*/
    --dp-input-icon-padding: 35px; /*Padding on the left side of the input if icon is present*/
    --dp-input-padding: 6px 30px 6px 12px; /*Padding in the input*/
    --dp-menu-min-width: 260px; /*Adjust the min width of the menu*/
    --dp-action-buttons-padding: 12px; /*Adjust padding for the action buttons in action row*/
    --dp-row-margin:  5px 0; /*Adjust the spacing between rows in the calendar*/
    --dp-calendar-header-cell-padding:  0.5rem; /*Adjust padding in calendar header cells*/
    --dp-two-calendars-spacing:  10px; /*Space between multiple calendars*/
    --dp-overlay-col-padding:  3px; /*Padding in the overlay column*/
    --dp-time-inc-dec-button-size:  32px; /*Sizing for arrow buttons in the time picker*/
    --dp-menu-padding: 6px 8px; /*Menu padding*/
    --dp-border-radius: 0.75rem; /*Match popover rounded-xl*/
    --dp-cell-border-radius: 0.5rem;

    /*Font sizes*/
    --dp-font-size: 0.875rem; /*Default font-size*/
    --dp-preview-font-size: 0.875rem; /*Font size of the date preview in the action row*/
    --dp-time-font-size: 0.8rem; /*Font size in the time picker*/

    /*Transitions*/
    --dp-animation-duration: 0.1s; /*Transition duration*/
    --dp-menu-appear-transition-timing: cubic-bezier(.4, 0, 1, 1); /*Timing on menu appear animation*/
    --dp-transition-timing: ease-out; /*Timing on slide animations*/
  `]

    vars.push(css.variables({
      bg: '#fff',
      text: secondaryCssPalette[800],
      disabled: secondaryCssPalette[300],
      range: primary[100],
      icon: secondaryCssPalette[500],
      primary: primary[500],
      border: secondaryCssPalette[200],
      dark: {
        bg: secondaryCssPalette[800],
        text: secondaryCssPalette[50],
        disabled: secondaryCssPalette[500],
        // Soft primary wash — mirrors light primary[100], readable on secondary-800
        range: colors.getColorOpacity(primary[500], 0.28),
        icon: secondaryCssPalette[400],
        primary: primary[500],
        border: secondaryCssPalette[700],
      },
    }))

    return vars
  },
}

export default theme
