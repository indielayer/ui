import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, type CSSProperties } from 'vue'
import VirtualList from './VirtualList.vue'

interface RowSlotProps {
  index: number;
  style: CSSProperties;
}

describe('VirtualList', () => {
  it('renders correctly', () => {
    const wrapper = mount(VirtualList, {
      props: {
        rowCount: 100,
        rowHeight: 50,
        style: { height: '400px' },
      },
      slots: {
        row: ({ index, style }: RowSlotProps) =>
          h('div', { style }, `Row ${index}`),
      },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.attributes('role')).toBe('list')
  })

  it('renders visible rows', () => {
    const wrapper = mount(VirtualList, {
      props: {
        rowCount: 100,
        rowHeight: 50,
        style: { height: '400px' },
      },
      slots: {
        row: ({ index, style }: RowSlotProps) =>
          h('div', { style, class: 'test-row' }, `Row ${index}`),
      },
    })

    // Should render some rows (visible + overscan)
    const rows = wrapper.findAll('.test-row')

    expect(rows.length).toBeGreaterThan(0)
  })
})
