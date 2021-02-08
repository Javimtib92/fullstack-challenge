import { forwardRef } from 'react'

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  labelText?: string
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ labelText, ...props }: InputProps, ref) => {
    return (
      <>
        <label>
          {labelText}
          <input className="form-field" ref={ref} {...props} />
        </label>
      </>
    )
  }
)

Input.displayName = 'Input'

export default Input
