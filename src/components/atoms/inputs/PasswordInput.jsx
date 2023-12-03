import { BaseInput } from "./Base"

export const PasswordInput = ({ id, ...props }: { id: string } ) => {
  return (
    <BaseInput
      id={id}
      {...{
        ...props,
        type: "password",
      }}
    />
  )
}
