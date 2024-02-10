<script lang="ts">
const qrCodeProps = {
  value: String,
  color: {
    type: String,
    default: '#000',
  },
  backgroundColor: {
    type: String,
    default: '#fff',
  },
  size: {
    type: [String, Number],
    default: 100,
  },
  errorCorrectionLevel: {
    type: String,
    default: 'M',
  },
}

export type QrCodeProps = ExtractPublicPropTypes<typeof qrCodeProps>

type InternalClasses = 'wrapper'
export interface QrCodeTheme extends ThemeComponent<QrCodeProps, InternalClasses> {}

export default {
  name: 'XQrCode',
  validators: {
    errorCorrectionLevel: ['L', 'M', 'Q', 'H'],
  },
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import qrcodegen from './qrcodegen'

const props = defineProps(qrCodeProps)

const ERROR_CORRECTION_LEVEL: Record<string, qrcodegen.QrCode.Ecc> = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH,
}

const canvasRef = ref<HTMLCanvasElement>()

const qr = computed(() => qrcodegen.QrCode.encodeText(
  props.value ?? '-',
  ERROR_CORRECTION_LEVEL[props.errorCorrectionLevel] || qrcodegen.QrCode.Ecc.MEDIUM,
))

onMounted(() => {
  watchEffect(() => {
    drawQR(
      qr.value,
      Number(props.size),
      props.color,
      props.backgroundColor,
    )
  })
})

function drawQR(qr: qrcodegen.QrCode, size: number, foregroundColor: string, backgroundColor: string) {
  const canvas = canvasRef.value

  if (!canvas) return

  const canvasWidth = size * 2
  const width = qr.size
  const scale = canvasWidth / width

  canvas.width = canvasWidth
  canvas.height = canvasWidth
  const ctx = canvas.getContext('2d')

  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let y = 0; y < qr.size; y++) {
    for (let x = 0; x < qr.size; x++) {
      ctx.fillStyle = qr.getModule(x, y) ? foregroundColor : backgroundColor
      const startX = Math.floor(x * scale)
      const endX = Math.ceil((x + 1) * scale)
      const startY = Math.floor(y * scale)
      const endY = Math.ceil((y + 1) * scale)

      ctx.fillRect(startX, startY, endX - startX, endY - startY)
    }
  }
}

const { styles, classes, className } = useTheme('QrCode', {}, props)
</script>

<template>
  <div
    :style="[styles, {
      width: `calc(1rem + ${size}px)`,
      height: `calc(1rem + ${size}px)`,
      backgroundColor,
      padding: '0.5rem',
    }]"
    :class="[
      className,
      classes.wrapper,
    ]"
  >
    <canvas
      ref="canvasRef"
      :style="{
        width: `${size}px`,
        height: `${size}px`
      }"
    ></canvas>
  </div>
</template>
