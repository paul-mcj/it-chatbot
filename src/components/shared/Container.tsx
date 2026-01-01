// export const Container = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
//       {children}
//     </div>
//   );
// };

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
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
};
