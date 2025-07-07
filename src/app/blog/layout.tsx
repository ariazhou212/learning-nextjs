import Footer from "../components/Footer";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <hr></hr>
      {children}
      <Footer greet={"hello from footer"} />
    </>
  );
}
