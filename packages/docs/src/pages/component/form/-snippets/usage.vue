<template>
  <x-form @submit="onSubmit">
    <div class="grid grid-cols-2 gap-4">
      <x-input
        v-model="email"
        :rules="[rules.isRequired, rules.isEmail]"
        name="email"
        label="Email"
        class="w-full"
      />
      <x-input
        v-model="password"
        type="password"
        :rules="[rules.isRequired]"
        name="password"
        label="Password"
        class="w-full"
      />
    </div>
    <x-textarea v-model="description" name="description" label="Description" class="w-full"/>
    <x-checkbox v-model="agree" :rules="[rules.isRequired]" name="agree" label="Agree with all the terms"/>
    <x-button class="w-full" size="lg" type="submit">Submit</x-button>
  </x-form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      description: '',
      agree: false,
      rules: {
        isEmail: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
        isRequired: (v) => !!v  || 'Field is required',
      },
    }
  },
  methods: {
    onSubmit(isValid) {
      if (isValid) this.$toast.success('Valid! Submitted')
      else this.$toast.error({ message: 'Invalid! Form has errors' })
    },
  },
}
</script>
