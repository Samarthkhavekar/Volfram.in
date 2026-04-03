const sectors = [
  { name: "Pharmaceutical & Chemical", count: "170+" },
  { name: "Food & Beverage", count: "140+" },
  { name: "Textile & Paper", count: "155+" },
  { name: "Oil & Gas", count: "135+" },
];

const testimonials = [
  {
    company: "Process Plant, Pune",
    quote: "Volfram improved our steam reliability and helped reduce unplanned stoppages significantly.",
  },
  {
    company: "Food Manufacturing Unit",
    quote: "Strong technical depth and practical recommendations. Execution quality was excellent.",
  },
  {
    company: "Pharma Utilities Team",
    quote: "Their instrumentation and control approach gave us better visibility and stable operation.",
  },
];

export default function Clients() {
  return (
    <div className="page-shell">
      <section className="hero-section py-20 md:py-24">
        <div className="container-custom relative z-10">
          <span className="badge-industrial mb-4">Our Clients</span>
          <h1 className="max-w-4xl text-4xl leading-tight text-white md:text-6xl md:leading-tight">Trusted By 600+ Customers</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100">
            We support production-critical industries with dependable steam systems and responsive service.
          </p>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-custom grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["600+", "Happy Customers"],
            ["422+", "Condensate Systems"],
            ["12+", "Years Of Service"],
            ["99%", "Customer Retention"],
          ].map(([value, label]) => (
            <div key={label} className="metric-card text-center">
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="subtext mt-1 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl">Industries We Serve</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector) => (
              <article key={sector.name} className="card text-center">
                <p className="text-3xl font-bold text-primary">{sector.count}</p>
                <h3 className="mt-2 text-lg">{sector.name}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl">What Clients Say</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.company} className="card">
                <p className="italic text-text-primary">"{item.quote}"</p>
                <p className="mt-4 text-sm font-semibold text-secondary">{item.company}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
