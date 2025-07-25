export default function Header() {
  return (
    <>
      <header className="flex justify-center items-center text-center w-full h-[100px]">
        <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-purple-400">
          Utility Forge
        </h1>
      </header>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-center text-gray-400 mb-4 xl:mb-0">
        One place for all your useful tools — from calculators to converters. No
        ads, no nonsense.
      </p>
    </>
  );
}
