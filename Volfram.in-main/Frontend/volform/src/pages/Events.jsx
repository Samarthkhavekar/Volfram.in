const events = [
  {
    title: "Boiler India 2022",
    meta: "Mumbai, India",
    text: "Global conclave connecting Indian and international boiler industries for sustainable steam progress.",
  },
  {
    title: "Boiler World Expo Africa 2023",
    meta: "Africa",
    text: "Expert networking, technical discussions and collaboration around practical steam innovation.",
  },
  {
    title: "Boiler India Expo 2024",
    meta: "Mumbai, India",
    text: "Successful launch of Volfram Smart Boiler Controller with strong industry response.",
  },
];

const videos = [
  ["00:17", "Volfram Solid Fuel Fired Boiler"],
  ["00:25", "Volfram Casted Moisture Separator"],
  ["00:45", "Volfram Condensate Recovery System"],
  ["01:53", "V-wise Smart Boiler Controller"],
];

export default function Events() {
  return (
    <div className="page-shell">
      <section className="hero-section py-20 md:py-24">
        <div className="container-custom relative z-10">
          <span className="badge-industrial mb-4">Events & Highlights</span>
          <h1 className="max-w-4xl text-4xl leading-tight text-white md:text-6xl md:leading-tight">Where Industry Meets Steam Innovation</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100">
            Stay connected with Volfram showcases, expos and product demonstration highlights.
          </p>
        </div>
      </section>

      <section className="section-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl">Major Expos</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {events.map((event) => (
              <article key={event.title} className="card">
                <p className="badge-industrial">{event.meta}</p>
                <h3 className="mt-3 text-xl text-primary">{event.title}</h3>
                <p className="mt-3">{event.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl">Video Library</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {videos.map(([duration, title]) => (
              <div key={title} className="card flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-secondary">{duration}</p>
                  <p className="mt-1 font-medium text-text-primary">{title}</p>
                </div>
                <button className="btn-outline-primary px-4 py-2">Watch</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
