const PhoneIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.78.59 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.11a2 2 0 0 1 2.11-.45c.84.27 1.72.47 2.62.59A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default function AuthSocials({ label = "or continue with" }) {
  const socials = [{ id: "phone", label: "Number", Icon: PhoneIcon }];
  return ( 
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-white/[0.07]" />
        <span className="text-[11px] text-[#9CA3AF] uppercase tracking-[0.8px] whitespace-nowrap">
          {label}
        </span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>
      <div className="flex gap-3">
        {socials.map(({ id, label: l, Icon }) => (
          <button
            key={id}
            className="
              flex-1 flex items-center justify-center gap-2
              bg-[#1F2937] border border-white/[0.07] rounded-[13px]
              py-3 text-[13px] font-medium text-[#F9FAFB]
              hover:bg-white/5 hover:border-white/15 hover:-translate-y-px
              active:scale-95 transition-all duration-150
            "
          >
            <Icon />
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
