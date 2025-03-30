export default function Page() {
  return (
    <>
      <div className="flex justify-start w-full z-10 relative pt-2 pl-40">
        <img 
          src="Zelda_flat.svg" 
          alt="Zelda Logo" 
          className="max-w-full h-auto fade-in-logo"
        />
      </div>
      
      <div className="w-full h-full absolute top-0 left-0 right-0 bottom-0 overflow-hidden -z-10">
        <img
          src="/zeldaIntro.gif"
          className="w-full h-full object-cover"
          alt="Intro Zelda"
        />
      </div>
    </>
  )
}