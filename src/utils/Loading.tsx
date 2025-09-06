export default function Loading({ data }: { data: boolean }) {
  // if (!data) return null;
  return (
    <>
      <section
        // ${!data && "slide-up"}
        className={`
          ${!data && "opacity-0 hidden"}
        fixed top-0 left-0 w-full h-full opacity-100  text-white transition-all duration-5000 bg-black/50 bg-opacity-50 flex justify-center items-center z-[80]`}
      >
        <div className="tracking-[30px]">
          {data && (
            <>
              <span className="loading-letter">L</span>
              <span className="loading-letter">O</span>
              <span className="loading-letter">A</span>
              <span className="loading-letter">D</span>
              <span className="loading-letter">I</span>
              <span className="loading-letter">N</span>
              <span className="loading-letter">G</span>
            </>
          )}
        </div>
      </section>
    </>
  );
}
