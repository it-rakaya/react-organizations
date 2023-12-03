import { Link } from "react-router-dom"
import { tv } from "tailwind-variants"

const linkButton = tv({
  base: "border-transparent bg-transparent underline py-2",
  variants: {
    color: {
      primary: "text-blue-600",
      danger: "text-mainRed",
    },
    disabled: {
      true: "text-gray-200 active:top-0 cursor-not-allowed",
    },
  },
})


export const LinkButton = (
  children,
  className,
  disabled,
  color = "primary",
  to,
  ...props
 ) => {
  return (
    <Link
      to={to}
      className={linkButton({
        color,
        disabled,
      })}
      {...props}
    >
      {children}
    </Link>
  )
}
