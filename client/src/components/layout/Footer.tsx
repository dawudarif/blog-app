export default function Footer() {
  return (
    <div className="bg-stone-100 w-full">
      <div className="flex justify-start items-center text-brand-text-black py-16 max-w-screen-xl lg:px-14 px-6 mx-auto gap-4 font-bold text-2xl">
        <span> Blogger</span> <span>&copy; {new Date().getFullYear()}</span>
      </div>
    </div>
  );
}
