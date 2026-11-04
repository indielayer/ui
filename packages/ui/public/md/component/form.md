# Form
Structured form wrapper for collecting and validating user input. Use x-form to group fields, run validation, and handle submit in one place.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| autoFocus | Boolean | true | Focuses the first registered field when the form mounts. |
| autoValidate | Boolean | true | Runs validation on all registered fields before emitting submit. |
| description | String |  | Optional description shown under the title in the default header. |
| disabled | Boolean |  | Disables all fields inside the form fieldset. |
| errors | [Array, Object] | [] | External field errors (`field` + `msg`) applied to registered inputs. |
| hasFooter | Boolean | true | Renders the footer slot area for form actions. |
| title | String |  | Optional title shown in the default header. |

### Slots
- `default`: Form fields and content inside the fieldset.
- `footer`: Custom footer; wraps primary and secondary actions by default.
- `header`: Custom header; overrides the default title/description block.
- `primary-action`: Primary action control in the default footer.
- `secondary-action`: Secondary action control in the default footer.

### Events
- `submit`: Emitted on form submit with whether validation passed.

### Methods
- `submit`: Programmatically submit the form (runs auto-validate when enabled).
- `validate`: Validate all registered fields; focuses the first invalid field.

### Demos
#### Usage
```vue
<script setup lang="ts">
import { useNotifications, type SelectOption } from '@indielayer/ui'
import { ref } from 'vue'

const notifications = useNotifications()

const email = ref('')
const password = ref('')
const description = ref('')
const checked = ref()
const selected = ref()
const country = ref('')
const countries: SelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'Mexico', value: 'mx' },
]
const countryCode = ref('')
const phoneNumber = ref('')
const countryCodes: SelectOption[] = [
  { label: '+1', value: '+1' },
  { label: '+44', value: '+44' },
  { label: '+351', value: '+351' },
  { label: '+49', value: '+49' },
]
const agree = ref(false)
const rules = {
  isEmail: (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  isRequired: (v: string) => {
    if (Array.isArray(v)) return !!v.length || 'Field is required'

    return !!v  || 'Field is required'
  },
  phoneComplete: (values: unknown) => {
    if (!Array.isArray(values)) return 'Country code and phone number are required'

    if (values.every((v) => !!v)) return true

    return 'Country code and phone number are required'
  },
}
const range = ref([])

function onSubmit(isValid: string) {
  if (isValid) notifications?.success('Valid! Sumitted.')
  else notifications?.error('Invalid! Form has errors')
}
</script>

<template>
  <x-form title="Edit user information" description="Almost all fields are required" @submit="onSubmit">
    <x-input
      v-model="email"
      :rules="[rules.isRequired, rules.isEmail]"
      name="email"
      label="Email"
      required
      placeholder="Enter your email"
      tooltip="We will never share your email with anyone"
    />
    <x-input
      v-model="password"
      type="password"
      :rules="[rules.isRequired]"
      name="password"
      label="Password"
      placeholder="Enter your password"
      helper="Must be between 8 and 10 characters"
    />
    <x-textarea
      v-model="description"
      name="description"
      label="Description"
      placeholder="Description"
    />

    <x-form-group v-model="selected" label="Group of checkboxes" :rules="[rules.isRequired]">
      <x-checkbox value="a" label="Lorem ipsum dolor" />
      <x-checkbox value="b" label="Second option" />
    </x-form-group>

    <x-form-group v-model="checked" label="Group of radio buttons" :rules="[rules.isRequired]">
      <x-radio name="inputName" value="a" label="Option A" />
      <x-radio name="inputName" value="b" label="Option B" />
    </x-form-group>

    <x-select
      v-model="country"
      :rules="[rules.isRequired]"
      :options="countries"
      filterable
      name="country"
      placeholder="Select another country"
      label="Country"
    />

    <x-input-group
      label="Phone number"
      helper="Select a country code and enter your local number"
      :rules="[rules.phoneComplete]"
      required
    >
      <x-select
        v-model="countryCode"
        :options="countryCodes"
        name="countryCode"
        placeholder="Code"
        class="!w-28"
      />
      <x-input
        v-model="phoneNumber"
        type="number"
        name="phoneNumber"
        placeholder="5550000"
      />
    </x-input-group>

    <x-datepicker
      v-model="range"
      :rules="[rules.isRequired]"
      label="Select a date"
      helper="Pick a date"
      tooltip="Use it to pick a date"
      range
      multi-calendars
      disable-year-select
      :enable-time-picker="false"
    />

    <x-checkbox
      v-model="agree"
      :rules="[rules.isRequired]"
      name="agree"
      label="Agree with all the terms"
      helper="Have you read them?"
    />

    <template #secondary-action>
      <x-button ghost outlined>Cancel</x-button>
    </template>
    <template #primary-action>
      <x-button color="primary" type="submit">Submit</x-button>
    </template>
  </x-form>
</template>
```

#### Poc
```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SelectOption, TableHeader } from '@indielayer/ui'

const screen = ref('details')

// —— Event details ——
const eventName = ref('Champions League')
const nameMode = ref('text')
const eventId = ref('champions_league')
const description = ref('Climb the ranks each week. Finish in the top 10 to advance to the next league — and earn bigger rewards.')
const categories = ref<string[]>(['pvp'])
const categoryOptions: SelectOption[] = [
  { label: 'pvp', value: 'pvp' },
  { label: 'daily', value: 'daily' },
  { label: 'seasonal', value: 'seasonal' },
  { label: 'guild', value: 'guild' },
  { label: 'pve', value: 'pve' },
]
const suggestedCategories = ['daily', 'seasonal', 'guild', 'pve']

type PropRow = { key: string; value: string; color?: string; }
const customProps = ref<PropRow[]>([
  { key: 'banner_art', value: 'ui/events/champions_bg.png' },
  { key: 'theme_color', value: '#6B59EE', color: '#6B59EE' },
  { key: 'featured', value: 'true' },
])

function addCategory(cat: string) {
  if (!categories.value.includes(cat)) categories.value = [...categories.value, cat]
}

function addProperty() {
  customProps.value.push({ key: '', value: '' })
}

function removeProperty(index: number) {
  customProps.value.splice(index, 1)
}

// —— Schedule ——
const eventType = ref('recurring')
const frequency = ref('weekly')
const weekday = ref('mon')
const startTime = ref('00:00')
const roundDuration = ref(6)
const durationUnit = ref('days')
const availabilityView = ref('timeline')
const goesLive = ref('Mon, Nov 3 2026 · 00:00 UTC')
const weekdays = [
  { value: 'mon', label: 'Mon' },
  { value: 'tue', label: 'Tue' },
  { value: 'wed', label: 'Wed' },
  { value: 'thu', label: 'Thu' },
  { value: 'fri', label: 'Fri' },
  { value: 'sat', label: 'Sat' },
  { value: 'sun', label: 'Sun' },
]

const claimDays = computed(() => {
  if (durationUnit.value !== 'days') return null
  const period = 7
  const left = period - roundDuration.value

  return left > 0 ? left : null
})

const cronExpression = computed(() => {
  const dayMap: Record<string, string> = {
    mon: '1', tue: '2', wed: '3', thu: '4', fri: '5', sat: '6', sun: '0',
  }
  const [h = '0', m = '0'] = startTime.value.split(':')

  if (frequency.value === 'daily') return `${Number(m)} ${Number(h)} * * *`
  if (frequency.value === 'monthly') return `${Number(m)} ${Number(h)} 1 * *`

  return `${Number(m)} ${Number(h)} * * ${dayMap[weekday.value] ?? '1'}`
})

// —— Tiers ——
const tierCount = ref(5)
const selectedTier = ref('gold')
const inactiveDrop = ref(1)
const displayName = ref('Gold League')
const tierDescription = ref('The big leagues. Top 10 advance to Platinum.')

type TierSetting = {
  id: string;
  label: string;
  icon: string;
  overridden: boolean;
  value: string;
  defaultValue: string;
}

const settings = ref<TierSetting[]>([
  { id: 'group', label: 'Group size', icon: 'users', overridden: true, value: '30 players', defaultValue: '50' },
  { id: 'attempts', label: 'Attempts per player', icon: 'zap', overridden: true, value: '15', defaultValue: '20' },
  { id: 'finish', label: 'Finish line target', icon: 'flag', overridden: true, value: '25,000 points', defaultValue: '10,000' },
  { id: 'finishers', label: 'Players who can finish', icon: 'check', overridden: false, value: '3 players', defaultValue: '3' },
  { id: 'window', label: 'Play window after joining', icon: 'clock', overridden: true, value: '48 h', defaultValue: 'off' },
  { id: 'change', label: 'Tier change between rounds', icon: 'trending-up', overridden: false, value: '1 tier', defaultValue: '1' },
])

const tiers = [
  { id: 'diamond', name: 'Diamond', tier: 4, letter: 'D', color: 'bg-violet-500', overrides: 3 },
  { id: 'platinum', name: 'Platinum', tier: 3, letter: 'P', color: 'bg-teal-500', overrides: 2 },
  { id: 'gold', name: 'Gold', tier: 2, letter: 'G', color: 'bg-amber-500', overrides: 4 },
  { id: 'silver', name: 'Silver', tier: 1, letter: 'S', color: 'bg-slate-400', overrides: 1 },
  { id: 'bronze', name: 'Bronze', tier: 0, letter: 'B', color: 'bg-orange-700', overrides: 0, subtitle: 'new players start here' },
]

const selectedTierMeta = computed(() => tiers.find((t) => t.id === selectedTier.value)!)

const compareHeaders: TableHeader[] = [
  { text: 'Tier', value: 'tier' },
  { text: 'Group size', value: 'group', align: 'right' },
  { text: 'Attempts', value: 'attempts', align: 'right' },
  { text: 'Finish target', value: 'finish', align: 'right' },
  { text: 'Finishers', value: 'finishers', align: 'right' },
  { text: 'Play window', value: 'window', align: 'right' },
  { text: 'Tier change', value: 'change', align: 'right' },
]

const compareItems = [
  { id: 'diamond', tier: 'Diamond', group: { v: '20', o: true }, attempts: { v: '10', o: true }, finish: { v: '50,000', o: true }, finishers: { v: '3', o: false }, window: { v: '—', o: false }, change: { v: '1', o: false } },
  { id: 'platinum', tier: 'Platinum', group: { v: '25', o: true }, attempts: { v: '12', o: true }, finish: { v: '35,000', o: true }, finishers: { v: '3', o: false }, window: { v: '—', o: false }, change: { v: '1', o: false } },
  { id: 'gold', tier: 'Gold', group: { v: '30', o: true }, attempts: { v: '15', o: true }, finish: { v: '25,000', o: true }, finishers: { v: '3', o: false }, window: { v: '48 h', o: true }, change: { v: '1', o: false } },
  { id: 'silver', tier: 'Silver', group: { v: '50', o: false }, attempts: { v: '20', o: false }, finish: { v: '15,000', o: true }, finishers: { v: '3', o: false }, window: { v: '—', o: false }, change: { v: '1', o: false } },
  { id: 'bronze', tier: 'Bronze', group: { v: '50', o: false }, attempts: { v: '20', o: false }, finish: { v: '10,000', o: false }, finishers: { v: '3', o: false }, window: { v: '—', o: false }, change: { v: '1', o: false } },
]

function bump(target: 'tiers' | 'inactive', delta: number) {
  if (target === 'tiers') tierCount.value = Math.max(1, Math.min(10, tierCount.value + delta))
  else inactiveDrop.value = Math.max(0, Math.min(5, inactiveDrop.value + delta))
}

function toggleOverride(id: string) {
  const row = settings.value.find((s) => s.id === id)

  if (row) row.overridden = !row.overridden
}
</script>

<template>
  <div class="space-y-4">
    <x-alert color="amber" light type="warning" class="text-sm">
      Temporary PoC — recreates product screenshots with existing @indielayer/ui primitives. Safe to delete.
    </x-alert>

    <x-tab-group v-model="screen" variant="block" color="primary" :full-width="false">
      <x-tab value="details" label="Event details" />
      <x-tab value="schedule" label="Schedule" />
      <x-tab value="tiers" label="Tiers" />
    </x-tab-group>

    <!-- ========== EVENT DETAILS ========== -->
    <div v-if="screen === 'details'" class="space-y-4 max-w-2xl">
      <x-card flat class="border p-5 space-y-4">
        <x-input v-model="eventName" label="Event name" hide-footer>
          <template #suffix>
            <x-tab-group v-model="nameMode" size="xs" variant="compact">
              <x-tab value="text" label="Text" />
              <x-tab value="i18n" icon="globe" label="i18n key" />
            </x-tab-group>
          </template>
        </x-input>

        <x-input
          v-model="eventId"
          label="Event ID"
          tooltip="Locked — auto-generated from the event name"
          readonly
          helper="Auto-generated · your game code uses this ID"
          class="font-mono"
        >
          <template #suffix>
            <x-icon icon="lock" size="sm" class="text-secondary-400 mr-1" />
            <x-button
              icon="sparkles"
              ghost
              size="sm"
              color="primary"
              aria-label="Regenerate ID"
            />
          </template>
        </x-input>

        <x-textarea
          v-model="description"
          label="Description"
          :maxlength="280"
          show-counter
          helper="Shown under the title on the event screen"
          :rows="3"
        />

        <div>
          <x-select
            v-model="categories"
            label="Category"
            tooltip="Used by your game client to filter and group events"
            placeholder="Type or choose..."
            :options="categoryOptions"
            multiple
            multiple-color="primary"
            filterable
            truncate
            helper="Your client can list events by category — e.g. show only 'pvp' events on the Arena tab."
          />
          <div class="flex flex-wrap items-center gap-2 mt-1 text-sm text-secondary-500">
            <span>Used in your game:</span>
            <x-button
              v-for="cat in suggestedCategories"
              :key="cat"
              size="xs"
              rounded
              outlined
              color="secondary"
              @click="addCategory(cat)"
            >
              {{ cat }}
            </x-button>
          </div>
        </div>
      </x-card>

      <x-card flat class="border p-5">
        <div class="flex items-start gap-3 mb-4">
          <div class="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
            <x-icon icon="tag" />
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <div class="font-semibold">Custom properties</div>
              <x-spacer />
              <x-tag size="xs" rounded outlined color="secondary">Optional</x-tag>
            </div>
            <p class="text-sm text-secondary-500 mt-0.5">
              Extra key/value data sent to your game client — art, colors, feature flags, anything.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-[1fr_1fr_auto] gap-x-3 gap-y-2 items-center text-xs font-medium text-secondary-400 uppercase tracking-wide mb-1 px-1">
          <div>Key</div>
          <div>Value</div>
          <div class="w-8" ></div>
        </div>
        <div
          v-for="(row, i) in customProps"
          :key="i"
          class="grid grid-cols-[1fr_1fr_auto] gap-x-3 gap-y-2 items-center mb-2"
        >
          <x-input
            v-model="row.key"
            hide-footer
            size="sm"
            class="font-mono"
            placeholder="key"
          />
          <x-input v-model="row.value" hide-footer size="sm" placeholder="value">
            <template v-if="row.color" #prefix>
              <span
                class="w-4 h-4 rounded border border-secondary-200 shrink-0"
                :style="{ backgroundColor: row.color }"
              ></span>
            </template>
          </x-input>
          <x-button
            icon="trash"
            ghost
            size="sm"
            color="secondary"
            aria-label="Remove property"
            @click="removeProperty(i)"
          />
        </div>
        <x-button
          icon="plus"
          size="sm"
          color="primary"
          light
          class="mt-2"
          @click="addProperty"
        >
          Add property
        </x-button>
      </x-card>
    </div>

    <!-- ========== SCHEDULE ========== -->
    <div v-else-if="screen === 'schedule'" class="space-y-5 max-w-4xl">
      <div>
        <div class="text-xs font-medium tracking-wide text-secondary-400 uppercase">Step 4 of 9</div>
        <h3 class="text-2xl font-semibold mt-1">When does it run?</h3>
        <p class="text-secondary-500 mt-1 text-sm max-w-2xl">
          Set how often a new round starts, how long players have to compete, and the overall dates the event is available.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-3">
        <x-radio
          v-model="eventType"
          value="recurring"
          color="indigo"
          hide-footer
          class="border p-4 rounded-xl w-full bg-white dark:bg-transparent [&>div]:flex-row-reverse [&>div]:items-start [&>div]:gap-3 [&>div>div:last-child]:min-w-0 [&>div>div:last-child]:flex-1 [&>div>div:last-child]:pl-0"
          :class="eventType === 'recurring'
            ? 'border-indigo-400 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_16px_rgba(99,102,241,0.22)]'
            : 'border-secondary-200 dark:border-secondary-700'"
        >
          <div class="flex items-start gap-3 pr-1">
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-secondary-100 dark:bg-secondary-800"
              :class="eventType === 'recurring' ? 'text-indigo-500' : 'text-secondary-500'"
            >
              <x-icon icon="refresh-cw" />
            </div>
            <div class="min-w-0">
              <div class="font-semibold text-secondary-900 dark:text-secondary-100">Recurring rounds</div>
              <div class="text-secondary-500 dark:text-secondary-400 text-sm mt-0.5">
                A new round starts on a schedule — daily, weekly, monthly or custom.
              </div>
            </div>
          </div>
        </x-radio>
        <x-radio
          v-model="eventType"
          value="onetime"
          color="indigo"
          hide-footer
          class="border p-4 rounded-xl w-full bg-white dark:bg-transparent [&>div]:flex-row-reverse [&>div]:items-start [&>div]:gap-3 [&>div>div:last-child]:min-w-0 [&>div>div:last-child]:flex-1 [&>div>div:last-child]:pl-0"
          :class="eventType === 'onetime'
            ? 'border-indigo-400 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_16px_rgba(99,102,241,0.22)]'
            : 'border-secondary-200 dark:border-secondary-700'"
        >
          <div class="flex items-start gap-3 pr-1">
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-secondary-100 dark:bg-secondary-800"
              :class="eventType === 'onetime' ? 'text-indigo-500' : 'text-secondary-500'"
            >
              <x-icon icon="calendar" />
            </div>
            <div class="min-w-0">
              <div class="font-semibold text-secondary-900 dark:text-secondary-100">One-time event</div>
              <div class="text-secondary-500 dark:text-secondary-400 text-sm mt-0.5">
                Runs once between a start and end date, then it's over.
              </div>
            </div>
          </div>
        </x-radio>
      </div>

      <div v-if="eventType === 'recurring'" class="grid md:grid-cols-2 gap-4">
        <x-card flat class="border p-5 space-y-4">
          <div class="font-semibold">A new round starts</div>

          <x-tab-group v-model="frequency" size="sm" variant="compact">
            <x-tab value="daily" label="Daily" />
            <x-tab value="weekly" label="Weekly" />
            <x-tab value="monthly" label="Monthly" />
            <x-tab value="cron" label="<> Cron" />
          </x-tab-group>

          <div v-if="frequency === 'weekly'" class="flex flex-wrap gap-1.5">
            <x-button
              v-for="d in weekdays"
              :key="d.value"
              size="sm"
              rounded
              :color="weekday === d.value ? 'primary' : 'secondary'"
              :outlined="weekday !== d.value"
              :light="weekday === d.value"
              @click="weekday = d.value"
            >
              {{ d.label }}
            </x-button>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-sm text-secondary-500">at</span>
            <x-input
              v-model="startTime"
              icon-left="clock"
              hide-footer
              size="sm"
              class="!w-36"
            >
              <template #suffix>
                <x-tag size="xs" rounded outlined>UTC</x-tag>
              </template>
            </x-input>
          </div>

          <div class="flex flex-wrap items-center gap-2 text-xs text-secondary-500">
            <x-icon icon="code" size="xs" />
            <code class="font-mono bg-secondary-100 dark:bg-secondary-800 px-1.5 py-0.5 rounded">{{ cronExpression }}</code>
            <x-link href="#" class="text-primary-600 text-xs" @click.prevent>Edit as cron expression</x-link>
          </div>
        </x-card>

        <x-card flat class="border p-5 space-y-4">
          <div class="font-semibold">Each round lasts</div>

          <div class="flex items-center gap-2">
            <x-input
              v-model.number="roundDuration"
              type="number"
              hide-footer
              size="sm"
              class="!w-20"
              :min="1"
              :max="durationUnit === 'days' ? 7 : 999"
            />
            <x-tab-group v-model="durationUnit" size="sm" variant="compact" color="primary">
              <x-tab value="min" label="min" />
              <x-tab value="hours" label="hours" />
              <x-tab value="days" label="days" />
            </x-tab-group>
          </div>

          <div v-if="durationUnit === 'days'">
            <x-slider
              v-model="roundDuration"
              :min="1"
              :max="7"
              :step="1"
              hide-footer
            />
            <div class="flex justify-between text-xs text-secondary-400 mt-1 px-0.5">
              <span>1h</span>
              <span>1d</span>
              <span>3d</span>
              <span>7d (whole week)</span>
            </div>
          </div>

          <x-alert
            v-if="claimDays"
            color="emerald"
            light
            type="success"
            class="text-sm"
          >
            <span class="inline-flex items-start gap-2">
              <x-icon icon="gift" class="mt-0.5 shrink-0" />
              <span>
                Leaves a {{ claimDays }}-day claim window before the next round — players see results and collect rewards.
              </span>
            </span>
          </x-alert>
        </x-card>
      </div>

      <x-card flat class="border p-5 space-y-4">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="flex items-start gap-2">
            <x-icon icon="calendar" class="text-primary-600 mt-0.5" />
            <div>
              <div class="font-semibold">Availability window</div>
              <p class="text-sm text-secondary-500">
                Optional dates when the event is live at all. Leave empty to run indefinitely.
              </p>
            </div>
          </div>
          <x-tab-group v-model="availabilityView" size="sm" variant="compact">
            <x-tab value="timeline" label="Timeline" />
            <x-tab value="calendar" label="Calendar" />
          </x-tab-group>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <x-input
            v-model="goesLive"
            label="Goes live"
            clearable
            hide-footer
            icon-left="calendar"
          />
          <x-input
            model-value="∞ Never — runs until disabled"
            label="Ends"
            readonly
            hide-footer
          />
        </div>

        <div
          v-if="availabilityView === 'timeline'"
          class="rounded-lg border border-secondary-200 bg-secondary-50/50 dark:bg-secondary-900/30 p-4 overflow-x-auto"
        >
          <div class="min-w-[520px]">
            <div class="flex items-end gap-1 h-16 mb-2">
              <div class="flex-1 flex flex-col justify-end">
                <div class="text-[10px] text-primary-600 mb-1 flex items-center gap-1">
                  <x-icon icon="flag" size="xs" class="text-emerald-500" />
                  Goes live
                </div>
                <div class="h-10 rounded-md bg-primary-500 text-white text-xs font-medium flex items-center justify-center">
                  Round 1
                </div>
              </div>
              <div class="w-10 h-10 rounded-md bg-primary-200/80 border border-dashed border-primary-400 flex items-center justify-center text-[10px] text-primary-700">
                claim
              </div>
              <div class="flex-1 h-10 rounded-md bg-primary-500 text-white text-xs font-medium flex items-center justify-center">
                Round 2
              </div>
              <div class="w-10 h-10 rounded-md bg-primary-200/80 border border-dashed border-primary-400 flex items-center justify-center text-[10px] text-primary-700">
                claim
              </div>
              <div class="flex-1 h-10 rounded-md bg-primary-500 text-white text-xs font-medium flex items-center justify-center">
                Round 3
              </div>
            </div>
            <div class="flex justify-between text-xs text-secondary-400 px-1">
              <span>Nov 3</span>
              <span>Nov 10</span>
              <span>Nov 17</span>
            </div>
          </div>
        </div>
        <div v-else class="rounded-lg border border-dashed border-secondary-300 p-8 text-center text-sm text-secondary-500">
          Calendar view placeholder
        </div>
      </x-card>
    </div>

    <!-- ========== TIERS ========== -->
    <div v-else class="space-y-4 max-w-5xl">
      <div class="grid lg:grid-cols-[260px_1fr] gap-4">
        <x-card flat class="border p-4 space-y-4">
          <x-input-group label="Number of tiers" hide-footer>
            <x-button icon="minus" size="sm" @click="bump('tiers', -1)" />
            <x-input
              v-model.number="tierCount"
              type="number"
              size="sm"
              :block="false"
              class="!w-16 [&_input]:text-center"
            />
            <x-button icon="plus" size="sm" @click="bump('tiers', 1)" />
          </x-input-group>

          <div class="space-y-2">
            <button
              v-for="t in tiers"
              :key="t.id"
              type="button"
              class="w-full flex items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-left transition-colors"
              :class="selectedTier === t.id
                ? 'border-primary-500 bg-primary-50/50'
                : 'border-transparent hover:bg-secondary-50 dark:hover:bg-secondary-800/50'"
              @click="selectedTier = t.id"
            >
              <div
                class="w-8 h-8 rounded-lg text-white text-sm font-bold flex items-center justify-center shrink-0"
                :class="t.color"
              >
                {{ t.letter }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="font-medium text-sm">{{ t.name }}</div>
                <div class="text-xs text-secondary-400">
                  {{ t.subtitle || `Tier ${t.tier}` }}
                </div>
              </div>
              <x-tag
                v-if="t.overrides"
                size="xs"
                color="primary"
                rounded
                filled
              >
                {{ t.overrides }}
              </x-tag>
            </button>
          </div>

          <p class="text-xs text-secondary-500 flex items-center gap-1.5">
            <x-tag size="xs" color="primary" rounded filled>4</x-tag>
            = settings overridden in that tier
          </p>

          <x-divider />

          <div>
            <div class="text-sm font-medium mb-2 inline-flex items-center gap-1">
              Inactive players
              <x-icon icon="help-circle" size="xs" class="text-secondary-400" />
            </div>
            <div class="flex items-center gap-2">
              <x-button icon="minus" size="sm" outlined @click="bump('inactive', -1)" />
              <x-input
                v-model.number="inactiveDrop"
                type="number"
                hide-footer
                size="sm"
                class="!w-16 text-center"
              />
              <span class="text-sm text-secondary-500">tier</span>
              <x-button icon="plus" size="sm" outlined @click="bump('inactive', 1)" />
            </div>
            <p class="text-xs text-secondary-500 mt-2">
              Players who skip rounds drop at most {{ inactiveDrop }} tier.
              0 = never drop for inactivity.
            </p>
          </div>
        </x-card>

        <x-card flat class="border p-5 space-y-4">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg text-white font-bold flex items-center justify-center"
                :class="selectedTierMeta.color"
              >
                {{ selectedTierMeta.letter }}
              </div>
              <div>
                <div class="font-semibold text-lg">{{ selectedTierMeta.name }} league</div>
                <div class="text-sm text-secondary-500">
                  Tier {{ selectedTierMeta.tier }} · {{ selectedTierMeta.overrides }} overrides · everything else follows your defaults.
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <x-button size="sm" outlined icon="copy">Copy to...</x-button>
              <x-button size="sm" ghost icon="refresh-cw">Reset tier</x-button>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-3">
            <x-input v-model="displayName" label="Display name" hide-footer />
            <x-input v-model="tierDescription" label="Description" hide-footer />
          </div>

          <div class="grid sm:grid-cols-2 gap-3">
            <button
              v-for="s in settings"
              :key="s.id"
              type="button"
              class="rounded-xl border p-3 text-left transition-colors"
              :class="s.overridden
                ? 'border-primary-300 bg-primary-50/60 dark:bg-primary-950/20'
                : 'border-secondary-200'"
              @click="toggleOverride(s.id)"
            >
              <div class="flex items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2 text-sm font-medium">
                  <x-icon :icon="s.icon" size="sm" class="text-secondary-500" />
                  {{ s.label }}
                </div>
                <span
                  class="text-xs font-medium"
                  :class="s.overridden ? 'text-primary-600' : 'text-secondary-400'"
                >
                  {{ s.overridden ? 'Override' : 'Default' }}
                </span>
              </div>
              <div
                class="text-lg font-semibold"
                :class="s.overridden ? 'text-primary-700 dark:text-primary-300' : 'text-secondary-500'"
              >
                {{ s.value }}
              </div>
              <div class="text-xs text-secondary-400 mt-0.5">
                default {{ s.defaultValue }}
              </div>
            </button>
          </div>

          <x-alert color="primary" light class="text-sm">
            <span class="inline-flex items-start gap-2">
              <x-icon icon="zap" class="mt-0.5 shrink-0" />
              <span>
                Common pattern: higher leagues get smaller groups, fewer attempts…
                <x-link href="#" class="text-primary-700 font-medium" @click.prevent>
                  Apply difficulty curve to all tiers →
                </x-link>
              </span>
            </span>
          </x-alert>
        </x-card>
      </div>

      <x-card flat class="border p-4">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div class="font-semibold inline-flex items-center gap-2">
            <x-icon icon="bar-chart-2" class="text-primary-600" />
            Compare all tiers
          </div>
          <div class="text-xs text-secondary-500">
            Purple = overridden · grey = default
          </div>
        </div>
        <x-table :headers="compareHeaders" :items="compareItems">
          <template #item-tier="{ item }">
            <span
              class="font-medium"
              :class="item.id === selectedTier ? 'text-primary-700' : ''"
            >
              {{ item.tier }}
            </span>
          </template>
          <template #item-group="{ item }">
            <span class="tabular-nums" :class="item.group.o ? 'text-primary-600 font-semibold' : 'text-secondary-400'">{{ item.group.v }}</span>
          </template>
          <template #item-attempts="{ item }">
            <span class="tabular-nums" :class="item.attempts.o ? 'text-primary-600 font-semibold' : 'text-secondary-400'">{{ item.attempts.v }}</span>
          </template>
          <template #item-finish="{ item }">
            <span class="tabular-nums" :class="item.finish.o ? 'text-primary-600 font-semibold' : 'text-secondary-400'">{{ item.finish.v }}</span>
          </template>
          <template #item-finishers="{ item }">
            <span class="tabular-nums" :class="item.finishers.o ? 'text-primary-600 font-semibold' : 'text-secondary-400'">{{ item.finishers.v }}</span>
          </template>
          <template #item-window="{ item }">
            <span class="tabular-nums" :class="item.window.o ? 'text-primary-600 font-semibold' : 'text-secondary-400'">{{ item.window.v }}</span>
          </template>
          <template #item-change="{ item }">
            <span class="tabular-nums" :class="item.change.o ? 'text-primary-600 font-semibold' : 'text-secondary-400'">{{ item.change.v }}</span>
          </template>
        </x-table>
      </x-card>
    </div>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/form
