type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PageContainer({
  children,
  className = "",
}: Props) {
  return (
    <section
      className={`
        mx-auto
        w-full
        max-w-[1600px]

        px-4
        sm:px-6
        md:px-8
        lg:px-10
        xl:px-12

        py-6
        sm:py-8
        md:py-10

        ${className}
      `}
    >
      {children}
    </section>
  );
}