import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AreaCalculator from '@/components/AreaCalculator.vue'

describe('AreaCalculator', () => {
  it('debe mostrar un input cuando se selecciona Cuadrado', () => {
    const wrapper = mount(AreaCalculator)

    expect(wrapper.find('[data-test="input-side"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="input-base"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="input-height"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="input-radius"]').exists()).toBe(false)
  })

  it('debe calcular correctamente el área del Cuadrado', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="input-side"]').setValue(4)

    expect(wrapper.get('[data-test="area"]').text()).toBe('16.00')
  })

  it('debe mostrar la fórmula correcta del Cuadrado', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="input-side"]').setValue(4)

    expect(wrapper.get('[data-test="formula"]').text()).toBe('Área = lado² = 4²')
  })

  it('debe mostrar dos inputs cuando se selecciona Rectángulo', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="btn-fig-Rectángulo"]').trigger('click')

    expect(wrapper.find('[data-test="input-base"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="input-height"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="input-side"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="input-radius"]').exists()).toBe(false)
  })

  it('debe calcular correctamente el área del Rectángulo', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="btn-fig-Rectángulo"]').trigger('click')
    await wrapper.get('[data-test="input-base"]').setValue(5)
    await wrapper.get('[data-test="input-height"]').setValue(2)

    expect(wrapper.get('[data-test="area"]').text()).toBe('10.00')
  })

  it('debe mostrar la fórmula correcta del Rectángulo', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="btn-fig-Rectángulo"]').trigger('click')
    await wrapper.get('[data-test="input-base"]').setValue(5)
    await wrapper.get('[data-test="input-height"]').setValue(2)

    expect(wrapper.get('[data-test="formula"]').text()).toBe('Área = b × h = 5 × 2')
  })

  it('debe mostrar un input cuando se selecciona Círculo', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="btn-fig-Círculo"]').trigger('click')

    expect(wrapper.find('[data-test="input-radius"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="input-side"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="input-base"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="input-height"]').exists()).toBe(false)
  })

  it('debe calcular correctamente el área del Círculo', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="btn-fig-Círculo"]').trigger('click')
    await wrapper.get('[data-test="input-radius"]').setValue(3)

    expect(wrapper.get('[data-test="area"]').text()).toBe('28.27')
  })

  it('debe mostrar la fórmula correcta del Círculo', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="btn-fig-Círculo"]').trigger('click')
    await wrapper.get('[data-test="input-radius"]').setValue(3)

    expect(wrapper.get('[data-test="formula"]').text()).toBe('Área = π × r² = π × 3²')
  })

  it('debe mostrar dos inputs cuando se selecciona Triángulo', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="btn-fig-Triángulo"]').trigger('click')

    expect(wrapper.find('[data-test="input-base"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="input-height"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="input-side"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="input-radius"]').exists()).toBe(false)
  })

  it('debe calcular correctamente el área del Triángulo', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="btn-fig-Triángulo"]').trigger('click')
    await wrapper.get('[data-test="input-base"]').setValue(6)
    await wrapper.get('[data-test="input-height"]').setValue(4)

    expect(wrapper.get('[data-test="area"]').text()).toBe('12.00')
  })

  it('debe mostrar la fórmula correcta del Triángulo', async () => {
    const wrapper = mount(AreaCalculator)
    await wrapper.get('[data-test="btn-fig-Triángulo"]').trigger('click')
    await wrapper.get('[data-test="input-base"]').setValue(6)
    await wrapper.get('[data-test="input-height"]').setValue(4)

    expect(wrapper.get('[data-test="formula"]').text()).toBe('Área = (b × h) / 2 = (6 × 4) / 2')
  })
})
