export default function GradientText({ children, as: Tag = "span", className = "" }) {
  return (
    <Tag className={`text-gradient ${className}`} style={{ fontFamily: "var(--font-display)" }}>
      {children}
    </Tag>
  );
}
