
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Target, Lightbulb, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function About() {
  const team = [
    { name: "Alexander Prime", role: "CEO & Founder", img: "https://picsum.photos/seed/ceo/400/400" },
    { name: "Elena Chen", role: "Chief Technology Officer", img: "https://picsum.photos/seed/cto/400/400" },
    { name: "Marcus Johnson", role: "Director of Global Operations", img: "https://picsum.photos/seed/dir/400/400" },
    { name: "Sarah Williams", role: "Lead Product Designer", img: "https://picsum.photos/seed/des/400/400" },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Page Header */}
      <section className="bg-primary py-24 text-primary-foreground text-center">
        <div className="container px-4">
          <h1 className="text-5xl font-bold font-headline mb-4">Our Story</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto font-light">
            Defining excellence in corporate solutions and premium electronics since 2010.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://picsum.photos/seed/history/800/800" alt="Corporate History" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold font-headline text-primary">A Decade of Innovation</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                PrimeMarket Pro began in a small tech incubator with a single mission: to provide businesses with the robust technological backbone they need to compete in a digital-first economy.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we serve over 5,000 corporate clients globally, ranging from agile startups to Fortune 500 giants. Our commitment to quality and service has never wavered.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-4xl font-bold text-secondary">2010</p>
                <p className="text-sm font-bold uppercase tracking-widest mt-1">Founded</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary">50+</p>
                <p className="text-sm font-bold uppercase tracking-widest mt-1">Countries</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary">150k</p>
                <p className="text-sm font-bold uppercase tracking-widest mt-1">Orders</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-secondary">99.9%</p>
                <p className="text-sm font-bold uppercase tracking-widest mt-1">Reliability</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Target className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Our Mission</h3>
              <p className="text-muted-foreground">To empower enterprises with world-class products and seamless procurement experiences that drive productivity.</p>
            </div>
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Lightbulb className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Our Vision</h3>
              <p className="text-muted-foreground">To be the primary global destination for high-performance corporate infrastructure and elite business gear.</p>
            </div>
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <TrendingUp className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Growth strategy</h3>
              <p className="text-muted-foreground">Continuous R&D and strategic global partnerships to bring the latest technological breakthroughs to our clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold font-headline">Meet Our Leadership</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">The visionaries and innovators behind PrimeMarket Pro's global success.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-md group-hover:shadow-xl transition-shadow">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="text-center">
                <h4 className="font-bold text-xl">{member.name}</h4>
                <p className="text-secondary font-medium text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
