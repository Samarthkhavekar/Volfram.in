import { useState } from "react";

const categories = ["All Projects", "Boilers", "Installations", "Controls", "Maintenance"];

const galleryItems = [
  "Auto Blow Down Panel Installation",
  "Condensate Recovery System",
  "Moisture Separator Assembly",
  "Smart Boiler Controller Retrofit",
  "Fuel Fired Boiler Dispatch",
  "Steam Distribution Upgrade",
  "Expo Booth Showcase",
  "Pharma Utility Commissioning",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="page-shell">
      <section className="hero-section py-20 md:py-24">
        <div className="container-custom relative z-10">
          <span className="badge-industrial mb-4">Gallery</span>
          <h1 className="max-w-4xl text-4xl leading-tight text-white md:text-6xl md:leading-tight">Project & Installation Highlights</h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-100">
            A glimpse into our field execution, plant integration and steam system modernization projects.
          </p>
        </div>
      </section>

      <section className="section-white">
        <div className="container-custom">
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "btn-primary px-4 py-2" : "btn-outline-primary px-4 py-2"}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <article key={item} className="card cursor-pointer" onClick={() => setActiveItem(item)}>
                <div className="mb-4 aspect-video rounded-md bg-slate-100" />
                <p className="text-sm font-semibold text-secondary">{activeCategory}</p>
                <h3 className="mt-2 text-lg">{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4" onClick={() => setActiveItem(null)}>
          <div className="w-full max-w-2xl rounded-xl bg-white p-6" onClick={(event) => event.stopPropagation()}>
            <div className="aspect-video rounded-md bg-slate-100" />
            <h2 className="mt-5 text-2xl text-primary">{activeItem}</h2>
            <p className="mt-2">Project documentation view. Contact team for complete case details.</p>
            <button className="btn-primary mt-6" onClick={() => setActiveItem(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
