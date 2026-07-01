export function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Create Your Account",
      desc: "Sign up and set up your store profile in seconds. No technical knowledge required.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "2",
      title: "Add Your Products",
      desc: "Easily manage inventory, upload photos, and set prices from our intuitive dashboard.",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      step: "3",
      title: "Start Selling Everywhere",
      desc: "Launch on the web and integrate seamlessly with Telegram to reach your customers where they are.",
      color: "from-fuchsia-500 to-pink-500",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background grids */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMTUwLCAxNTAsIDE1MCwgMC4wNSkiLz48L3N2Zz4=')] z-0 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]" />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">Works</span></h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Get your store up and running in minutes with our simple three-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Vibrant Gradient Connector Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-full opacity-30 -z-0">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 blur-sm rounded-full opacity-50 animate-pulse"></div>
          </div>

          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10 group">
              <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center mb-8 relative">
                {/* Outer pulsing ring */}
                <div className={`absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r ${s.color} [mask-image:linear-gradient(#fff,transparent)] [mask-composite:destination-out] opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500`} style={{ padding: '4px', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }}></div>
                
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-violet-500/20 relative z-10 group-hover:scale-110 group-hover:rotate-[360deg] transition-all duration-700`}>
                  {s.step}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
