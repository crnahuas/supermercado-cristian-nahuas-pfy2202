const paths = {
  cart: (
    <>
      <path d="M3 3h2l2.5 12h11L21 7H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12 4 4L19 6" />,
  box: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="M3 8v9l9 5 9-5V8M12 13v9M7.5 5.5l9 5" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export default function Icon({ name = "arrow", size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? paths.arrow}
    </svg>
  );
}
