interface ProjectCardProps {
  title: string;
  technology: string;
  link?: string;
  imgLink?: string;
}
export default function ProjectCard({
  title,
  technology,
  link = "#",
  imgLink = "/assets/img/bg-img/20.webp",
}: ProjectCardProps) {
  return (
    <>
      <div className="portfolio-card-two">
        <img src={imgLink} alt="" />

        <div className="portfolio-overlay-content d-flex align-items-center justify-content-between">
          <a href={link} target="_blank">
            <span className="material-symbols-outlined">arrow_outward</span>
          </a>
        </div>
      </div>

      <div className="portfolio-content-two">
        <h3>{title}</h3>
        <p className="mb-0">{technology}</p>
      </div>
    </>
  );
}
