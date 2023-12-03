import { BaseInput } from "./Base"


export const EmailInput = ({ id, ...props }: { id } ) => {
  return (
    <BaseInput
      id={id}
      {...{
        ...props,
        type: "email",
      }}
    />
  )
}
