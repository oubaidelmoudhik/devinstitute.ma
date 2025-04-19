import { useState, useEffect, FC, lazy, Suspense } from "react";

const Marquee = lazy(() => import("react-fast-marquee"));

const CategoryArea: FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="catagory-slide" id="catagorySlide">
      <div className="marquee3k" data-speed="1">
        <Suspense fallback={null}>
          <Marquee gradient={false} speed={50}>
            <h2 className="d-flex align-items-center mb-0">
              <span>#</span>
              <span>Web Design</span>
              <span>#</span>
              <span>Web Development</span>
              <span>#</span>
              <span>UI/UX Design</span>
            </h2>
          </Marquee>
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryArea;
