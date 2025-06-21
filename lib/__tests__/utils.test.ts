import '@testing-library/jest-dom';

describe('Jest Setup', () => {
  it('should work correctly', () => {
    expect(1 + 1).toBe(2)
  })

  it('should have testing library matchers', () => {
    const element = document.createElement('div')
    element.textContent = 'Hello World'
    document.body.appendChild(element)
    expect(element).toBeInTheDocument()
    document.body.removeChild(element)
  })
}) 