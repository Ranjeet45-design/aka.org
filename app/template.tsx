/** Pass-through template: pages render immediately with no entrance animation. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
