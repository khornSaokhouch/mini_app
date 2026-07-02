"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const BrandIcon = ({ d, name, color }: { d: string; name: string; color: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={`h-6 w-6 ${color} transition-colors`}>
    <path d={d} />
  </svg>
)

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-background border-t">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-500">Touch</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card/50 backdrop-blur-sm border border-border/50 p-8 md:p-12 rounded-3xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message here..." className="min-h-[150px]" />
            </div>
            <Button size="lg" className="w-full rounded-full px-8 shadow-lg transition-all hover:scale-105 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white">
              Send Message
            </Button>
          </form>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Connect with us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "Facebook", href: "#", d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", color: "text-[#1877F2]" },
                { name: "TikTok", href: "#", d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77 0 2.89 2.89 0 0 1 2.89-2.89 2.77 2.77 0 0 1 1.33.34V9.36a6.04 6.04 0 0 0-1.33-.14 6.34 6.34 0 1 0 6.34 6.34V6.69z", color: "text-black dark:text-white" },
                { name: "Telegram", href: "#", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.24-1.51-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.05-.2s-.14-.09-.23-.06c-.1.02-1.66 1.05-4.68 3.08-.44.3-.84.45-1.2.44-.39-.01-1.14-.22-1.7-.4-.73-.24-1.31-.37-1.26-.78.03-.23.36-.47 1.01-.72 3.96-1.73 6.6-2.87 7.91-3.43 3.76-1.59 4.54-1.87 5.05-1.88.11 0 .37.02.54.16.14.12.18.28.2.45-.01.07-.01.17-.03.25z", color: "text-[#0088CC]" },
                { name: "Instagram", href: "#", d: "M12 2.163c3.204 0 3.584.012 4.85.07 1.176.055 1.95.249 2.641.52.716.277 1.23.61 1.768 1.148.538.538.87 1.052 1.148 1.768.27.69.465 1.465.52 2.641.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.055 1.176-.249 1.95-.52 2.641-.277.716-.61 1.23 1.148 1.768.538-.538 1.052-.87 1.768-1.148.69-.27 1.465-.465 2.641-.52 1.266.058 1.646.07 4.85.07zm0 2.163c-3.132 0-3.504.012-4.746.068-1.137.05-1.756.236-2.167.396-.543.21-.931.462-1.342.873-.411.411-.663.8-.873 1.342-.16.411-.346 1.03-.396 2.167-.056 1.242-.068 1.614-.068 4.746s.012 3.504.068 4.746c.05 1.137.236 1.756.396 2.167.21.543.462.931.873 1.342.411.411.8.663 1.342.873.411.16 1.03.346 2.167.396 1.242.056 1.614.068 4.746.068s3.504-.012 4.746-.068c1.137-.05 1.756-.236 2.167-.396.543-.21.931-.462 1.342-.873.411-.411.663-.8.873-1.342.16-.411.346-1.03.396-2.167.056-1.242.068-1.614.068-4.746s-.012-3.504-.068-4.746c-.05-1.137-.236-1.756-.396-2.167-.21-.543-.462-.931-.873-1.342-.411-.411-.8-.663-1.342-.873-.411-.16-1.03-.346-2.167-.396-1.242-.056 1.614-.068 4.746-.068zM12 7.037a4.963 4.963 0 1 0 0 9.926 4.963 4.963 0 0 0 0-9.926zm0 7.763a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6zM17.393 8.35a1.163 1.163 0 1 0 0-2.326 1.163 1.163 0 0 0 0 2.326z", color: "text-[#E4405F]" },
                { name: "Website", href: "#", d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z", color: "text-foreground" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all group"
                >
                  <BrandIcon d={social.d} name={social.name} color={social.color} />
                  <div className="font-semibold group-hover:text-violet-500 transition-colors">{social.name}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
