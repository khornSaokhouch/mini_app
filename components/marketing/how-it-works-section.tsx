export function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Create Your Account",
      desc: "Sign up and set up your store profile in seconds. No technical knowledge required.",
    },
    {
      step: "2",
      title: "Add Your Products",
      desc: "Easily manage inventory, upload photos, and set prices from our intuitive dashboard.",
    },
    {
      step: "3",
      title: "Start Selling Everywhere",
      desc: "Launch on the web and integrate seamlessly with Telegram to reach your customers where they are.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">How it Works</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Get your store up and running in minutes with our simple three-step process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-muted -z-0"></div>

          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              <div className="w-24 h-24 rounded-full bg-background flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-background"></div>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg relative z-10">
                  {s.step}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
