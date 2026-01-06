import { cn } from "@/lib/utils"; // If using shadcn/ui utils, otherwise use standard strings

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
};
